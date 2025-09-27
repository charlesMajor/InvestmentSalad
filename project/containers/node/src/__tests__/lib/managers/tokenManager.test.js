import "@testing-library/jest-dom";
import {
  addTokenToCookies,
  getToken,
  deleteToken,
  isTokenInCookiesValid,
} from "@/lib/managers/tokenManager";
import { afterEach } from "node:test";
import { cleanup } from "@testing-library/react";
import { validateToken } from "@/lib/services/authService";

jest.mock("next/headers", () => {
  const mockCookies = {
    set: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
  };
  return {
    cookies: jest.fn(() => mockCookies),
  };
});
jest.mock("@/lib/services/authService");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const MOCK_TOKEN = "mockToken";
const COOKIE_TOKEN_KEY = "access_token";

describe("TokenManager", () => {
  describe("addTokenToCookies", () => {
    it("Given a function addTokenToCookies and a mock token, when addTokenToCookies is called with the mock token, then the token should be added to cookies with the correct attributes.", async () => {
      await addTokenToCookies(MOCK_TOKEN);

      expect(require("next/headers").cookies().set).toHaveBeenCalledWith({
        name: COOKIE_TOKEN_KEY,
        value: MOCK_TOKEN,
        httpOnly: true,
        secure: false,
        path: "/",
      });
    });

    it("Given a function addTokenToCookies and a mock token, when an attempt is made to set the token to cookies and the operation fails, then an error should be thrown.", async () => {
      require("next/headers")
        .cookies()
        .set.mockImplementationOnce(() => {
          throw new Error("Failed to set token");
        });

      await expect(addTokenToCookies(MOCK_TOKEN)).rejects.toThrowError();
    });
  });

  describe("getToken", () => {
    it("Given a function getToken, when getToken is called, and a token is present in the cookies, then the token should be retrieved successfully.", async () => {
      require("next/headers").cookies().get.mockReturnValueOnce({ value: MOCK_TOKEN });

      const result = await getToken();

      expect(result).toBe(MOCK_TOKEN);
    });

    it("Given a function getToken, when getToken is called, and no token is present in the cookies, then an empty string should be returned.", async () => {
      require("next/headers").cookies().get.mockReturnValueOnce(undefined);

      const result = await getToken();

      expect(result).toBe("");
    });
  });

  describe("deleteToken", () => {
    it("Given a function deleteToken, when deleteToken is called, then the token should be deleted from cookies.", async () => {
      await deleteToken();
      expect(require("next/headers").cookies().delete).toHaveBeenCalledWith(COOKIE_TOKEN_KEY);
    });

    it("Given a function deleteToken, when an attempt is made to delete the token from cookies and the operation fails, then an error should be thrown.", async () => {
      require("next/headers")
        .cookies()
        .delete.mockImplementationOnce(() => {
          throw new Error("Failed to delete token");
        });

      await expect(deleteToken()).rejects.toThrowError();
    });
  });

  describe("isTokenInCookiesValid", () => {
    it("Given a function isTokenInCookiesValid, when isTokenInCookiesValid is called, and a token is present in the cookies and is valid, then it should return true.", async () => {
      require("next/headers").cookies().get.mockReturnValueOnce({ value: MOCK_TOKEN });
      validateToken.mockResolvedValue(true);

      const result = await isTokenInCookiesValid();

      expect(result).toBe(true);
    });

    it("Given a function isTokenInCookiesValid, when isTokenInCookiesValid is called, and a token is present in the cookies but is invalid, then it should return false.", async () => {
      require("next/headers").cookies().get.mockReturnValueOnce({ value: MOCK_TOKEN });
      validateToken.mockReturnValueOnce(false);

      const result = await isTokenInCookiesValid();

      expect(result).toBe(false);
    });

    it("Given a function isTokenInCookiesValid, when isTokenInCookiesValid is called, and no token is found in the cookies, then it should return false.", async () => {
      require("next/headers").cookies().get.mockReturnValueOnce(undefined);

      const result = await isTokenInCookiesValid();

      expect(result).toBe(false);
    });

    it("Given a function isTokenInCookiesValid, when an attempt is made to validate the token from cookies and the operation fails, then an error should be thrown.", async () => {
      require("next/headers").cookies().get.mockReturnValueOnce({ value: MOCK_TOKEN });
      validateToken.mockImplementationOnce(() => {
        throw new Error("Failed to validate token");
      });

      const result = await isTokenInCookiesValid();

      expect(result).toBe(false);
    });
  });
});
