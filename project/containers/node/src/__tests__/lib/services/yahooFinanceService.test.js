import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import {
  getYahooFinanceData,
  getSearchYahooFinance,
  getCrumb,
  getYahooFinanceFromCrumb,
  setYahooFinanceCookie,
} from "@/lib/services/yahooFinanceService";
import axios, { HttpStatusCode } from "axios";
import { cleanup } from "@testing-library/react";

jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const VALID_SYMBOL = "AAPL";
const VALID_SEARCH = "AAP";
const MOCK_RESPONSE_DATA = "data";

const YAHOO_FINANCE_API_GENERIC_ERROR = "YAHOO_FINANCE_API_GENERIC_ERROR";

describe("YahooFinanceService", () => {
  describe("GetYahooFinanceData", () => {
    it("Given a valid GetYahooFinanceData request, when the API call succeeds (200), then the user should be given Yahoo Finance data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getYahooFinanceData(VALID_SYMBOL);

      expect(result).toEqual({ success: true, data: { key: mockResponse.data } });
    });

    it("Given a GetYahooFinanceData request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getYahooFinanceData(VALID_SYMBOL);

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.response.status },
        },
      });
    });

    it("Given a GetYahooFinanceData request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.get.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getYahooFinanceData(VALID_SYMBOL);

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetSearchYahooFinance", () => {
    it("Given a valid GetSearchYahooFinance request, when the API call succeeds (200), then the user should be given Yahoo Finance Search data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getSearchYahooFinance(VALID_SEARCH);

      expect(result).toEqual({ success: true, data: { key: mockResponse.data } });
    });

    it("Given a GetSearchYahooFinance request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getSearchYahooFinance(VALID_SEARCH);

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.response.status },
        },
      });
    });

    it("Given a GetSearchYahooFinance request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.get.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getSearchYahooFinance(VALID_SEARCH);

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetCrumb", () => {
    it("Given a valid GetCrumb request, when the API call succeeds (200), then the user should be given Yahoo Finance Crumb data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getCrumb();

      expect(result).toEqual({ success: true, data: { key: mockResponse.data } });
    });

    it("Given a GetCrumb request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getCrumb();

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.response.status },
        },
      });
    });

    it("Given a GetCrumb request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.get.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getCrumb();

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetYahooFinanceFromCrumb", () => {
    it("Given a valid GetYahooFinanceFromCrumb request, when the API call succeeds (200), then the user should be given Yahoo Finance from Crumb data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getYahooFinanceFromCrumb();

      expect(result).toEqual({ success: true, data: { key: mockResponse.data } });
    });

    it("Given a GetYahooFinanceFromCrumb request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.get.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getYahooFinanceFromCrumb();

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("SetYahooFinanceCookie", () => {
    it("Given a valid SetYahooFinanceCookie request, when the API call succeeds (404), then the user should be given Yahoo Finance Cookie data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NotFound,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await setYahooFinanceCookie();

      expect(result).toEqual({ success: true, data: { key: mockResponse.data } });
    });

    it("Given a SetYahooFinanceCookie request encountering a resolved unexpected error, when the API returns a status code (other than 404), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Forbidden,
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await setYahooFinanceCookie();

      expect(result).toEqual({
        success: false,
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.response.status },
        },
      });
    });

    it("Given a SetYahooFinanceCookie request encountering a rejected unexpected error, when the API returns a status code (other than 404), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          headers: { "set-cookie": MOCK_RESPONSE_DATA },
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await setYahooFinanceCookie();

      expect(result).toEqual({
        success: false,
        data: { key: mockResponse.response.headers["set-cookie"] },
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.response.status },
        },
      });
    });

    it("Given a SetYahooFinanceCookie request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      const mockResponse = {
        response: {
          headers: { "set-cookie": MOCK_RESPONSE_DATA },
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await setYahooFinanceCookie();

      expect(result).toEqual({
        success: false,
        data: { key: mockResponse.response.headers["set-cookie"] },
        message: {
          message: YAHOO_FINANCE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });
});
