import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import axios, { HttpStatusCode } from "axios";
import { cleanup } from "@testing-library/react";
import { getOneDashboard } from "@/lib/services/dashboardService";

jest.mock("axios");
jest.mock("@/lib/managers/tokenManager");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const MOCK_RESPONSE_DATA = "222c96b4-f4da-4687-831b-2935cc01da36";

const LOG_OUT_API_ERROR = "LOG_OUT_API_ERROR";
const GET_API_GENERIC_ERROR = "GET_API_GENERIC_ERROR";

describe("DashboardService", () => {
  describe("GetOneDashboard", () => {
    it("Given a valid GetOneDashboard request, when the API call succeeds (200), then the user should be given Dashboard data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getOneDashboard();

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });
  });

  it("Given a GetOneDashboard request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
    const mockResponse = {
      status: HttpStatusCode.NotFound,
    };

    axios.get.mockResolvedValueOnce(mockResponse);
    const result = await getOneDashboard();

    expect(result).toEqual({
      success: false,
      message: {
        message: GET_API_GENERIC_ERROR,
        options: { statusCode: mockResponse.status },
      },
    });
  });

  it("Given a GetOneDashboard request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
    const mockResponse = {
      response: {
        status: HttpStatusCode.Unauthorized,
      },
    };

    axios.get.mockRejectedValueOnce(mockResponse);
    const result = await getOneDashboard();

    expect(result).toEqual({
      success: false,
      message: { message: LOG_OUT_API_ERROR },
    });
  });

  it("Given a GetOneDashboard request with valid data, when the API returns an unhandle status code, then generic api error message should be returned.", async () => {
    const mockResponse = {
      response: {
        status: HttpStatusCode.InternalServerError,
      },
    };

    axios.get.mockRejectedValueOnce(mockResponse);
    const result = await getOneDashboard();

    expect(result).toEqual({
      success: false,
      message: {
        message: GET_API_GENERIC_ERROR,
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    });
  });

  it("Given a GetOneDashboard request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
    axios.get.mockImplementationOnce(() => {
      throw new Error("Network error");
    });

    const result = await getOneDashboard();

    expect(result).toEqual({
      success: false,
      message: {
        message: GET_API_GENERIC_ERROR,
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    });
  });
});
