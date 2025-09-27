"use server";

import { getToken } from "../managers/tokenManager";
import { APIResult, Dashboard } from "./returnTypes";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { API_DASHBOARD_GET_PATH } from "../utils/constants/apiPaths";

const API_URL = process.env.BACKEND_API_ADDRESS;

export async function getOneDashboard(): Promise<APIResult<Dashboard>> {
  try {
    const route: string = API_URL + API_DASHBOARD_GET_PATH;
    const response: AxiosResponse = await axios.get(route, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.Ok) {
      return {
        success: false,
        message: {
          message: "GET_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    }
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "GET_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}
