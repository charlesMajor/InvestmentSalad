import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import {
  createPortfolio,
  getAllPortfolios,
  getOnePortfolio,
  deletePortfolio,
  updatePortfolio,
} from "@/lib/services/portfolioService";
import axios, { HttpStatusCode } from "axios";
import { cleanup } from "@testing-library/react";

jest.mock("axios");
jest.mock("@/lib/managers/tokenManager");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const PORTFOLIO_ID = "5c0f3798-cdcb-45d0-a6bd-c3cc12090bca";
const PORTFOLIO_NAME = "portfolioName";
const PORTFOLIO_CASH_INTEREST_RATE = 0.0;
const PORTFOLIO_INTEREST_FREQUENCY = 1;
const PORTFOLIO_INTEREST_RATE = "2021-02-01";
const PORTFOLIO_CASH_BALANCE = 1000.0;
const PORTFOLIO_DESCRIPTION = "This is a description.";
const PORTFOLIO_CURRENCY = "USD";
const PORTFOLIO_TAGS = [
  "2388842e-9a6d-486e-b7a7-6c144adb83c1",
  "e729d44b-bd8e-481b-a38b-bd1eca027d35",
];

const LOG_OUT_API_ERROR = "LOG_OUT_API_ERROR";
const CREATE_API_GENERIC_ERROR = "CREATE_API_GENERIC_ERROR";
const ADD_PORTFOLIO_ALREADY_EXIST_ERROR = "ADD_PORTFOLIO_ALREADY_EXIST";
const GET_ALL_API_GENERIC_ERROR = "GET_ALL_API_GENERIC_ERROR";
const GET_ONE_API_GENERIC_ERROR = "GET_ONE_API_GENERIC_ERROR";
const GET_PORTFOLIO_NOT_FOUND_ERROR = "GET_PORTFOLIO_NOT_FOUND";
const DELETE_PORTFOLIO_API_GENERIC_ERROR = "DELETE_PORTFOLIO_API_GENERIC_ERROR";
const UPDATE_PORTFOLIO_API_GENERIC_ERROR = "UPDATE_PORTFOLIO_API_GENERIC_ERROR";

describe("PortfolioService", () => {
  describe("CreatePortfolio", () => {
    it("Given a valid CreatePortfolio request, when the API call succeeds (201), then the user should be given portfolio data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: {
          id: PORTFOLIO_ID,
          name: PORTFOLIO_NAME,
          cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
          interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
          initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
          cashBalance: PORTFOLIO_CASH_BALANCE,
          description: PORTFOLIO_DESCRIPTION,
          currency: PORTFOLIO_CURRENCY,
          tags: PORTFOLIO_TAGS,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await createPortfolio(mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a CreatePortfolio request with an already existing portfolio, when the API returns a 422 Unprocessable Entity error, then the add portfolio already exist error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.UnprocessableEntity,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await createPortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: ADD_PORTFOLIO_ALREADY_EXIST_ERROR },
      });
    });

    it("Given a CreatePortfolio request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await createPortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a CreatePortfolio request encountering an unexpected error, when the API returns a status code (other than 201), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await createPortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: CREATE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a CreatePortfolio request with valid data, when the API throws an error, then generic API error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await createPortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: CREATE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetAllPortfolio", () => {
    it("Given a valid GetAllPortfolios request, when the API call succeeds (200), then the user should be given portfolio data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: {
          id: PORTFOLIO_ID,
          name: PORTFOLIO_NAME,
          cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
          interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
          initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
          cashBalance: PORTFOLIO_CASH_BALANCE,
          description: PORTFOLIO_DESCRIPTION,
          currency: PORTFOLIO_CURRENCY,
          tags: PORTFOLIO_TAGS,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllPortfolios();

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a GetAllPortfolios request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getAllPortfolios();

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a GetAllPortfolios request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllPortfolios();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a GetAllPortfolios request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getAllPortfolios();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetOnePortfolio", () => {
    it("Given a valid GetOnePortfolio request, when the API call succeeds (200), then the user should be given portfolio data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: {
          id: PORTFOLIO_ID,
          name: PORTFOLIO_NAME,
          cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
          interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
          initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
          cashBalance: PORTFOLIO_CASH_BALANCE,
          description: PORTFOLIO_DESCRIPTION,
          currency: PORTFOLIO_CURRENCY,
          tags: PORTFOLIO_TAGS,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getOnePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a GetOnePortfolio request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getOnePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a GetOnePortfolio request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getOnePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ONE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a GetOnePortfolio request encountering a not found, when the API returns a status code 404, then a portfolio not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getOnePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: { message: GET_PORTFOLIO_NOT_FOUND_ERROR },
      });
    });

    it("Given a GetOnePortfolio request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getOnePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ONE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("DeletePortfolio", () => {
    it("Given a valid DeletePortfolio request, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const result = await deletePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({ success: true });
    });

    it("Given a DeletePortfolio request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.delete.mockRejectedValueOnce(mockResponse);
      const result = await deletePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a DeletePortfolio request encountering an unexpected error, when the API returns a status code (other than 204), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const result = await deletePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: {
          message: DELETE_PORTFOLIO_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a DeletePortfolio request encountering a not found, when the API returns a status code 404, then a portfolio not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.delete.mockRejectedValueOnce(mockResponse);
      const result = await deletePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: { message: GET_PORTFOLIO_NOT_FOUND_ERROR },
      });
    });

    it("Given a DeletePortfolio request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.delete.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await deletePortfolio(PORTFOLIO_ID);

      expect(result).toEqual({
        success: false,
        message: {
          message: DELETE_PORTFOLIO_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("UpdatePortfolio", () => {
    it("Given a valid UpdatePortfolio request, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await updatePortfolio(mockValues);

      expect(result).toEqual({ success: true, data: mockValues });
    });

    it("Given a UpdatePortfolio request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.put.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await updatePortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a UpdatePortfolio request encountering an unexpected error, when the API returns a status code (other than 204), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await updatePortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: UPDATE_PORTFOLIO_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a UpdatePortfolio request encountering a not found, when the API returns a status code 404, then a portfolio not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.put.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await updatePortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: GET_PORTFOLIO_NOT_FOUND_ERROR },
      });
    });

    it("Given a UpdatePortfolio request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.delete.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        name: PORTFOLIO_NAME,
        cashInterestRate: PORTFOLIO_CASH_INTEREST_RATE,
        interestPaymentFrequencyPerYear: PORTFOLIO_INTEREST_FREQUENCY,
        initialInterestPaymentDate: PORTFOLIO_INTEREST_RATE,
        cashBalance: PORTFOLIO_CASH_BALANCE,
        description: PORTFOLIO_DESCRIPTION,
        currency: PORTFOLIO_CURRENCY,
        tags: PORTFOLIO_TAGS,
      };
      const result = await updatePortfolio(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: UPDATE_PORTFOLIO_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });
});
