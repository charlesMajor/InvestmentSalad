"use server";

import {
  API_PORTFOLIO_CREATE_PATH,
  API_PORTFOLIO_DELETE_PATH,
  API_PORTFOLIO_UPDATE_PATH,
} from "../utils/constants/apiPaths";
import { HttpStatusCode } from "axios";
import axios, { AxiosResponse } from "axios";
import { getToken } from "../managers/tokenManager";
import { APIResult, Portfolio, PortfolioGet } from "./returnTypes";

const API_URL = process.env.BACKEND_API_ADDRESS;

export async function createPortfolio(values: Portfolio): Promise<APIResult<PortfolioGet>> {
  try {
    const route: string = API_URL + API_PORTFOLIO_CREATE_PATH;
    const response: AxiosResponse = await axios.post(route, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.Created)
      return {
        success: false,
        message: {
          message: "CREATE_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.UnprocessableEntity)
        return { success: false, message: { message: "ADD_PORTFOLIO_ALREADY_EXIST" } };
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

export async function getAllPortfolios(): Promise<APIResult<PortfolioGet[]>> {
  try {
    const route: string = API_URL + API_PORTFOLIO_CREATE_PATH;
    const response: AxiosResponse = await axios.get(route, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.Ok)
      return {
        success: false,
        message: {
          message: "GET_ALL_API_GENERIC_ERROR",
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
        message: "GET_ALL_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function getOnePortfolio(id: string): Promise<APIResult<PortfolioGet>> {
  try {
    const route: string = API_URL + API_PORTFOLIO_CREATE_PATH + "/" + id;
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
          message: "GET_ONE_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "GET_PORTFOLIO_NOT_FOUND" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "GET_ONE_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function deletePortfolio(id: string): Promise<APIResult<void>> {
  try {
    const route: string = API_URL + API_PORTFOLIO_DELETE_PATH(id);
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
          message: "DELETE_PORTFOLIO_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "GET_PORTFOLIO_NOT_FOUND" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "DELETE_PORTFOLIO_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function updatePortfolio(values: PortfolioGet): Promise<APIResult<PortfolioGet>> {
  try {
    const route: string = API_URL + API_PORTFOLIO_UPDATE_PATH(values.id);
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
          message: "UPDATE_PORTFOLIO_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: values };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "GET_PORTFOLIO_NOT_FOUND" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "UPDATE_PORTFOLIO_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}
