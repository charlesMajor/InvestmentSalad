import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import { createAsset, getAllAssets, deleteAsset, updateAsset } from "@/lib/services/assetsService";
import axios, { HttpStatusCode } from "axios";
import { cleanup } from "@testing-library/react";
import { AssetType } from "../../../lib/services/returnTypes";

jest.mock("axios");
jest.mock("@/lib/managers/tokenManager");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const ASSET_NAME = "assetName";
const ASSET_DESCRIPTION = "description";
const ASSET_QUANTITY = 2;
const ASSET_UNIT_PRICE = 10;
const ASSET_TAGS = [];
const ASSET_TYPE = AssetType.STOCK;
const ASSET_BUY_DATE = "2021-02-01";
const ASSET_ID = "cd13dcdb-7993-4a64-80ad-2ed4a9436bed";
const ASSET_PORTFOLIO_ID = "5c0f3798-cdcb-45d0-a6bd-c3cc12090bca";
const ASSET_BUY_FROM_ACCOUNT = false;
const ASSET_COMMISSION_FEE = 0;

const LOG_OUT_API_ERROR = "LOG_OUT_API_ERROR";
const CREATE_API_GENERIC_ERROR = "CREATE_API_GENERIC_ERROR";
const GET_ALL_ASSETS_API_GENERIC_ERROR = "GET_ALL_ASSETS_API_GENERIC_ERROR";
const ADD_ASSET_ALREADY_EXIST_ERROR = "ADD_ASSET_ALREADY_EXIST";
const GET_ASSET_NOT_FOUND_ERROR = "GET_ASSET_NOT_FOUND";
const DELETE_ASSET_API_GENERIC_ERROR = "DELETE_ASSET_API_GENERIC_ERROR";
const DELETE_ASSET_API_NOT_FOUND = "DELETE_ASSET_API_NOT_FOUND";
const UPDATE_ASSET_API_GENERIC_ERROR = "UPDATE_ASSET_API_GENERIC_ERROR";

describe("AssetsService", () => {
  describe("CreateAsset", () => {
    it("Given a valid CreateAsset for stock request, when the API call succeeds (201), then the user should be given asset data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: {
          name: ASSET_NAME,
          description: ASSET_DESCRIPTION,
          quantity: ASSET_QUANTITY,
          unitPrice: ASSET_UNIT_PRICE,
          tags: ASSET_TAGS,
          assetType: ASSET_TYPE,
          buyDate: ASSET_BUY_DATE,
          id: ASSET_ID,
          portfolioId: ASSET_PORTFOLIO_ID,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, mockValues.assetType, mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a valid CreateAsset for crypto request, when the API call succeeds (201), then the user should be given asset data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: {
          name: ASSET_NAME,
          description: ASSET_DESCRIPTION,
          quantity: ASSET_QUANTITY,
          unitPrice: ASSET_UNIT_PRICE,
          tags: ASSET_TAGS,
          assetType: ASSET_TYPE,
          buyDate: ASSET_BUY_DATE,
          id: ASSET_ID,
          portfolioId: ASSET_PORTFOLIO_ID,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, AssetType.CRYPTO, mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a valid CreateAsset for ressource request, when the API call succeeds (201), then the user should be given asset data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: {
          name: ASSET_NAME,
          description: ASSET_DESCRIPTION,
          quantity: ASSET_QUANTITY,
          unitPrice: ASSET_UNIT_PRICE,
          tags: ASSET_TAGS,
          assetType: ASSET_TYPE,
          buyDate: ASSET_BUY_DATE,
          id: ASSET_ID,
          portfolioId: ASSET_PORTFOLIO_ID,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, AssetType.RESSOURCE, mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a valid CreateAsset for fixed revenue request, when the API call succeeds (201), then the user should be given asset data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: {
          name: ASSET_NAME,
          description: ASSET_DESCRIPTION,
          quantity: ASSET_QUANTITY,
          unitPrice: ASSET_UNIT_PRICE,
          tags: ASSET_TAGS,
          assetType: ASSET_TYPE,
          buyDate: ASSET_BUY_DATE,
          id: ASSET_ID,
          portfolioId: ASSET_PORTFOLIO_ID,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, AssetType.FIXED_REVENUE, mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a CreateAsset request with an already existing portfolio, when the API returns a 422 Unprocessable Entity error, then the add asset already exist error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.UnprocessableEntity,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, mockValues.assetType, mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: ADD_ASSET_ALREADY_EXIST_ERROR },
      });
    });

    it("Given a CreateAsset request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, mockValues.assetType, mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a CreateAsset request encountering an unexpected error, when the API returns a status code (other than 201), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, mockValues.assetType, mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: CREATE_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a CreateAsset request with valid data, when the API throws an error, then generic API error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        buyFromAccount: ASSET_BUY_FROM_ACCOUNT,
        commissionFee: ASSET_COMMISSION_FEE,
      };
      const result = await createAsset(ASSET_PORTFOLIO_ID, mockValues.assetType, mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: CREATE_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetAllAssets", () => {
    it("Given a valid GetAllAssets request, when the API call succeeds (200), then the user should be given asset data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: {
          name: ASSET_NAME,
          description: ASSET_DESCRIPTION,
          quantity: ASSET_QUANTITY,
          unitPrice: ASSET_UNIT_PRICE,
          tags: ASSET_TAGS,
          assetType: ASSET_TYPE,
          buyDate: ASSET_BUY_DATE,
          id: ASSET_ID,
          portfolioId: ASSET_PORTFOLIO_ID,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllAssets();

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a GetAllAssets request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getAllAssets();

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a GetAllAssets request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllAssets();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_ASSETS_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a GetAllAssets request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getAllAssets();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_ASSETS_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("DeleteAsset", () => {
    it("Given a valid DeleteAsset request for crypto, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const result = await deleteAsset(ASSET_ID, AssetType.CRYPTO);

      expect(result).toEqual({ success: true });
    });

    it("Given a valid DeleteAsset request for fixed revenue, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const result = await deleteAsset(ASSET_ID, AssetType.FIXED_REVENUE);

      expect(result).toEqual({ success: true });
    });

    it("Given a valid DeleteAsset request for ressource, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const result = await deleteAsset(ASSET_ID, AssetType.RESSOURCE);

      expect(result).toEqual({ success: true });
    });

    it("Given a valid DeleteAsset request for stock, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const result = await deleteAsset(ASSET_ID, AssetType.STOCK);

      expect(result).toEqual({ success: true });
    });

    it("Given a DeleteAsset request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.delete.mockRejectedValueOnce(mockResponse);
      const result = await deleteAsset(ASSET_ID, AssetType.STOCK);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a DeleteAsset request encountering an unexpected error, when the API returns a status code (other than 204), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.delete.mockResolvedValueOnce(mockResponse);
      const result = await deleteAsset(ASSET_ID, AssetType.STOCK);

      expect(result).toEqual({
        success: false,
        message: {
          message: DELETE_ASSET_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a DeleteAsset request encountering a not found, when the API returns a status code 404, then a asset not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.delete.mockRejectedValueOnce(mockResponse);
      const result = await deleteAsset(ASSET_ID, AssetType.STOCK);

      expect(result).toEqual({
        success: false,
        message: { message: DELETE_ASSET_API_NOT_FOUND },
      });
    });

    it("Given a DeleteAsset request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.delete.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await deleteAsset(ASSET_ID, AssetType.STOCK);

      expect(result).toEqual({
        success: false,
        message: {
          message: DELETE_ASSET_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("UpdateAsset", () => {
    it("Given a valid UpdateAsset request for stock, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, mockValues.assetType);

      expect(result).toEqual({ success: true, data: mockValues });
    });

    it("Given a valid UpdateAsset request for crypto, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, AssetType.CRYPTO);

      expect(result).toEqual({ success: true, data: mockValues });
    });

    it("Given a valid UpdateAsset request for ressource, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, AssetType.RESSOURCE);

      expect(result).toEqual({ success: true, data: mockValues });
    });

    it("Given a valid UpdateAsset request for fixed revenue, when the API call succeeds (204), then the user should be given no content data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.NoContent,
        data: {},
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, AssetType.FIXED_REVENUE);

      expect(result).toEqual({ success: true, data: mockValues });
    });

    it("Given a UpdateAsset request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.put.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, mockValues.assetType);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a UpdateAsset request encountering an unexpected error, when the API returns a status code (other than 204), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Forbidden,
        },
      };

      axios.put.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, mockValues.assetType);

      expect(result).toEqual({
        success: false,
        message: {
          message: UPDATE_ASSET_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a UpdateAsset request encountering a not found, when the API returns a status code 404, then an asset not found error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.put.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, mockValues.assetType);

      expect(result).toEqual({
        success: false,
        message: { message: GET_ASSET_NOT_FOUND_ERROR },
      });
    });

    it("Given a UpdateAsset request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.delete.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        name: ASSET_NAME,
        description: ASSET_DESCRIPTION,
        quantity: ASSET_QUANTITY,
        unitPrice: ASSET_UNIT_PRICE,
        tags: ASSET_TAGS,
        assetType: ASSET_TYPE,
        buyDate: ASSET_BUY_DATE,
        id: ASSET_ID,
        portfolioId: ASSET_PORTFOLIO_ID,
      };
      const result = await updateAsset(mockValues, mockValues.assetType);

      expect(result).toEqual({
        success: false,
        message: {
          message: UPDATE_ASSET_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });
});
