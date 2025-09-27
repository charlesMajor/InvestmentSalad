"use server";

import { HttpStatusCode } from "axios";
import axios, { AxiosResponse } from "axios";
import {
  API_CREATE_STOCK_PATH,
  API_GET_ALL_ASSETS_PATH,
  API_PORTFOLIO_UPDATE_PATH,
  API_UPDATE_CRYPTO_PATH,
  API_UPDATE_FIXED_REVENUE_PATH,
  API_UPDATE_RESSOURCE_PATH,
  API_UPDATE_STOCK_PATH,
} from "../utils/constants/apiPaths";
import { getToken } from "../managers/tokenManager";
import { APIResult, AssetCreate, AssetGet, AssetType } from "./returnTypes";

const API_URL = process.env.BACKEND_API_ADDRESS;

export async function getAllAssets(): Promise<APIResult<AssetGet[]>> {
  try {
    const route: string = API_URL + API_GET_ALL_ASSETS_PATH;
    const response: AxiosResponse = await axios.get(route, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.Ok)
      return {
        success: false,
        message: {
          message: "GET_ALL_ASSETS_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "GET_ALL_ASSETS_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function createAsset(
  portfolioId: string,
  type: AssetType,
  value: AssetCreate,
): Promise<APIResult<AssetGet>> {
  try {
    let route: string = "";
    switch (type) {
      case AssetType.STOCK:
        route = API_URL + "/portfolios/" + portfolioId + "/stock";
        break;
      case AssetType.CRYPTO:
        route = API_URL + "/portfolios/" + portfolioId + "/crypto";
        break;
      case AssetType.RESSOURCE:
        route = API_URL + "/portfolios/" + portfolioId + "/ressource";
        break;
      case AssetType.FIXED_REVENUE:
        route = API_URL + "/portfolios/" + portfolioId + "/fixedRevenue";
        break;
    }

    const response: AxiosResponse = await axios.post(route, value, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    //console.log("response");
    //console.log(response);
    if (response.status !== HttpStatusCode.Created)
      return {
        success: false,
        message: {
          message: "CREATE_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    //console.log(response.data);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.UnprocessableEntity)
        return { success: false, message: { message: "ADD_ASSET_ALREADY_EXIST" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "CREATE_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function deleteAsset(assetId: string, type: AssetType): Promise<APIResult<void>> {
  try {
    let route: string = "";
    switch (type) {
      case AssetType.STOCK:
        route = API_URL + API_GET_ALL_ASSETS_PATH + "/STOCK/" + assetId;
        break;
      case AssetType.CRYPTO:
        route = API_URL + API_GET_ALL_ASSETS_PATH + "/CRYPTO/" + assetId;
        break;
      case AssetType.RESSOURCE:
        route = API_URL + API_GET_ALL_ASSETS_PATH + "/RESSOURCE/" + assetId;
        break;
      case AssetType.FIXED_REVENUE:
        route = API_URL + API_GET_ALL_ASSETS_PATH + "/FIXEDREVENUE/" + assetId;
        break;
    }

    const response: AxiosResponse = await axios.delete(route, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.NoContent)
      return {
        success: false,
        message: {
          message: "DELETE_ASSET_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true };
  } catch (error: any) {
    //console.log(error);
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "DELETE_ASSET_API_NOT_FOUND" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "DELETE_ASSET_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function updateAsset(values: AssetGet, type: AssetType): Promise<APIResult<AssetGet>> {
  try {
    let route: string = "";
    switch (type) {
      case AssetType.STOCK:
        route = API_URL + API_UPDATE_STOCK_PATH(values.portfolioId, values.id);
        break;
      case AssetType.CRYPTO:
        route = API_URL + API_UPDATE_CRYPTO_PATH(values.portfolioId, values.id);
        break;
      case AssetType.RESSOURCE:
        route = API_URL + API_UPDATE_RESSOURCE_PATH(values.portfolioId, values.id);
        break;
      case AssetType.FIXED_REVENUE:
        route = API_URL + API_UPDATE_FIXED_REVENUE_PATH(values.portfolioId, values.id);
        break;
    }
    const response: AxiosResponse = await axios.put(route, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.NoContent)
      return {
        success: false,
        message: {
          message: "UPDATE_ASSET_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: values };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "GET_ASSET_NOT_FOUND" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "UPDATE_ASSET_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}
