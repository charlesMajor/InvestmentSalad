import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import {
  EMAIL_ALREADY_TAKEN,
  VALIDATION_ERROR,
  INVALID_CREDENTIALS,
  EMAIL_NOT_FOUND,
} from "@/lib/utils/constants/apiErrorKey";
import axios, { HttpStatusCode } from "axios";
import { cleanup } from "@testing-library/react";
import { signUp, login, validateToken } from "@/lib/services/authService";

jest.mock("axios");
jest.mock("@/lib/managers/tokenManager");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const SIGN_UP_API_GENERIC_ERROR = "SIGN_UP_API_GENERIC_ERROR";
const SIGN_UP_API_EMAIL_USED_ERROR = "SIGN_UP_API_EMAIL_USED_ERROR";
const SIGN_UP_API_PASSWORD_NOT_STRONG_ERROR = "SIGN_UP_API_PASSWORD_NOT_STRONG";

const LOGIN_API_GENERIC_ERROR = "LOGIN_API_GENERIC_ERROR";
const LOGIN_API_WRONG_CREDENTIALS = "LOGIN_API_WRONG_CREDENTIALS";

describe("AuthService", () => {
  describe("SignUp", () => {
    it("Given a valid SignUp request, when the API call succeeds (200), then the user should be signed up successfully with a token.", async () => {
      const token = "mockToken";
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: {
          token: token,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        username: "testUser",
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await signUp(mockValues);

      expect(result).toEqual({ success: true });
    });

    it("Given a SignUp request with an email address already used, when the API returns a 422 Unprocessable Entity error, then the email used error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.UnprocessableEntity,
          data: {
            errorCode: EMAIL_ALREADY_TAKEN,
          },
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        username: "testUser",
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await signUp(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: SIGN_UP_API_EMAIL_USED_ERROR },
      });
    });

    it("Given a SignUp request encounters 422 UnprocessableEntity, when the API responds with a validation error indicating that the password is not strong enough, then a specific error message password strength should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.UnprocessableEntity,
          data: {
            errorCode: VALIDATION_ERROR,
          },
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        username: "testUser",
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await signUp(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: SIGN_UP_API_PASSWORD_NOT_STRONG_ERROR },
      });
    });

    it("Given a SignUp request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        username: "testUser",
        emailAddress: "test@example.com",
        password: "pass",
      };
      const result = await signUp(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: SIGN_UP_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a SignUp request encountering a server or network error, when the API call fails with a network error, then a generic error message with a 500 status code should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        username: "testUser",
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await signUp(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: SIGN_UP_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("Login", () => {
    it("Given a valid login request, when the API call succeeds, then the user should be logged in successfully with a token.", async () => {
      const token = "mockToken";
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: {
          token: token,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await login(mockValues);

      expect(result).toEqual({ success: true });
    });

    it("Given a login request with incorrect credentials, when the API returns a 401 Unauthorized error, then the wrong credentials error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
          data: {
            errorCode: INVALID_CREDENTIALS,
          },
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await login(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOGIN_API_WRONG_CREDENTIALS },
      });
    });

    it("Given a login request encounters 401 Unauthorized, when the API responds with email not found error, then a wrong credentials error should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
          data: {
            errorCode: EMAIL_NOT_FOUND,
          },
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await login(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOGIN_API_WRONG_CREDENTIALS },
      });
    });

    it("Given a login request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NotFound,
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        emailAddress: "test@example.com",
        password: "pass",
      };
      const result = await login(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOGIN_API_GENERIC_ERROR, options: { statusCode: mockResponse.status } },
      });
    });

    it("Given a login request encountering a server or network error, when the API call fails with a network error, then a generic error message with a 500 status code should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        emailAddress: "test@example.com",
        password: "password123",
      };
      const result = await login(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: LOGIN_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("IsLoggedIn", () => {
    it("Given a valid token, when token validation succeeds, then it should return true", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: HttpStatusCode.Ok,
        }),
      );

      const result = await validateToken();

      expect(result).toBe(true);
    });

    it("Given an invalid token, when token validation fails, then it should return false", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          status: HttpStatusCode.Unauthorized,
        }),
      );

      const result = await validateToken();

      expect(result).toBe(false);
    });

    it("Given a network error during token validation, then it should return false", async () => {
      global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

      const result = await validateToken();

      expect(result).toBe(false);
    });
  });
});
