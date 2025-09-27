import "@testing-library/jest-dom";
import {
  createWidget,
  getAllWidgets,
  updateWidget,
  deleteWidget,
} from "@/lib/services/widgetService";
import { afterEach } from "node:test";
import axios, { HttpStatusCode } from "axios";
import { cleanup } from "@testing-library/react";
import { WidgetType } from "@/lib/services/returnTypes";

jest.mock("axios");
jest.mock("@/lib/managers/tokenManager");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const MOCK_RESPONSE_DATA = "data";
const WIDGET_ID = "b6e22510-f727-4f5b-957d-165e4990ca2c";

const DASHBOARD_ID = "b6e22510-f727-4f5b-957d-165e4990ca2c";

const LOG_OUT_API_ERROR = "LOG_OUT_API_ERROR";
const CREATE_API_GENERIC_ERROR = "CREATE_API_GENERIC_ERROR";
const GET_ALL_API_GENERIC_ERROR = "GET_ALL_API_GENERIC_ERROR";
const GET_WIDGETS_DASHBOARD_NOT_FOUND = "GET_WIDGETS_DASHBOARD_NOT_FOUND";
const UPDATE_WIDGET_API_GENERIC_ERROR = "UPDATE_WIDGET_API_GENERIC_ERROR";
const UPDATE_WIDGET_NOT_FOUND_ERROR = "UPDATE_WIDGET_NOT_FOUND";
const DELETE_WIDGET_API_GENERIC_ERROR = "DELETE_WIDGET_API_GENERIC_ERROR";

describe("WidgetService", () => {
  describe("CreateWidget", () => {
    it("Given a valid CreateWidget request with Widget Distribution, when the API call succeeds (201), then the user should be given widget data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.DISTRIBUTION, mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a valid CreateWidget request with Widget Networth, when the API call succeeds (201), then the user should be given widget data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.NETWORTH, mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a valid CreateWidget request with Widget Watchlist, when the API call succeeds (201), then the user should be given widget data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.WATCHLIST, mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a CreateWidget request encountering an resolved unexpected error, when the API returns a status code (other than 201), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.DISTRIBUTION, mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: CREATE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a CreateWidget request encountering an rejected unexpected error, when the API returns a status code (other than 201), then a generic error message along with 500 status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.DISTRIBUTION, mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: CREATE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });

    it("Given a CreateWidget request encountering an not found, when the API returns a not found (404), then a not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.DISTRIBUTION, mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: GET_WIDGETS_DASHBOARD_NOT_FOUND },
      });
    });

    it("Given a CreateWidget request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.DISTRIBUTION, mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a CreateWidget request with valid data, when the API throws an error, then generic API error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await createWidget(DASHBOARD_ID, WidgetType.DISTRIBUTION, mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: CREATE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetAllWidgets", () => {
    it("Given a valid GetAllWidgets request, when the API call succeeds (200), then the user should be given widgets data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: { MOCK_RESPONSE_DATA },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllWidgets();

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a GetAllWidgets request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getAllWidgets();

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a GetAllWidgets request encountering an resolved unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllWidgets();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a GetAllWidgets request encountering an rejected unexpected error, when the API returns a status code (other than 200), then a generic error message along with 500 status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getAllWidgets();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });

    it("Given a GetAllWidgets request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.get.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getAllWidgets();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });

    it("Given a GetAllWidgets request encountering an not found, when the API returns a not found (404), then a not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getAllWidgets();

      expect(result).toEqual({
        success: false,
        message: { message: GET_WIDGETS_DASHBOARD_NOT_FOUND },
      });
    });
  });

  describe("UpdateWidget", () => {
    it("Given a valid UpdateWidget request, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = { widgetType: WidgetType.DISTRIBUTION };
      const result = await updateWidget(mockValues);

      expect(result).toEqual({ success: true, data: mockValues });
    });

    it("Given a UpdateWidget request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.put.mockRejectedValueOnce(mockResponse);

      const mockValues = { widgetType: WidgetType.NETWORTH };
      const result = await updateWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a UpdateWidget request encountering an resolved unexpected error, when the API returns a status code (other than 204), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = { widgetType: WidgetType.WATCHLIST };
      const result = await updateWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: UPDATE_WIDGET_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a UpdateWidget request encountering an rejected unexpected error, when the API returns a status code (other than 204), then a generic error message along with 500 status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.put.mockRejectedValueOnce(mockResponse);

      const mockValues = { widgetType: WidgetType.WATCHLIST };
      const result = await updateWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: UPDATE_WIDGET_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });

    it("Given a UpdateWidget request encountering a not found, when the API returns a status code 404, then a widget not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.put.mockRejectedValueOnce(mockResponse);

      const mockValues = { MOCK_RESPONSE_DATA };
      const result = await updateWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: UPDATE_WIDGET_NOT_FOUND_ERROR },
      });
    });

    it("Given a UpdateWidget request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.get.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await updateWidget();

      expect(result).toEqual({
        success: false,
        message: {
          message: UPDATE_WIDGET_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("DeleteWidget", () => {
    it("Given a valid DeleteWidget request, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const mockValues = {
        id: WIDGET_ID,
        widgetType: WidgetType.DISTRIBUTION,
      };
      const result = await deleteWidget(mockValues);

      expect(result).toEqual({ success: true });
    });

    it("Given a DeleteWidget request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.delete.mockRejectedValueOnce(mockResponse);
      const mockValues = {
        id: WIDGET_ID,
        widgetType: WidgetType.NETWORTH,
      };
      const result = await deleteWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a DeleteWidget request encountering an resolved unexpected error, when the API returns a status code (other than 204), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const mockValues = {
        id: WIDGET_ID,
        widgetType: WidgetType.WATCHLIST,
      };
      const result = await deleteWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: DELETE_WIDGET_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a DeleteWidget request encountering an rejected unexpected error, when the API returns a status code (other than 204), then a generic error message along with 500 status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.delete.mockRejectedValueOnce(mockResponse);
      const mockValues = {
        id: WIDGET_ID,
        widgetType: WidgetType.WATCHLIST,
      };
      const result = await deleteWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: DELETE_WIDGET_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });

    it("Given a DeleteWidget request encountering a not found, when the API returns a status code 404, then a asset not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.delete.mockRejectedValueOnce(mockResponse);
      const mockValues = {
        id: WIDGET_ID,
        widgetType: WidgetType.DISTRIBUTION,
      };
      const result = await deleteWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: UPDATE_WIDGET_NOT_FOUND_ERROR },
      });
    });

    it("Given a DeleteWidget request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.delete.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        id: WIDGET_ID,
        widgetType: WidgetType.DISTRIBUTION,
      };
      const result = await deleteWidget(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: DELETE_WIDGET_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });
});
