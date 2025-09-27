"use server";

import { getToken } from "../managers/tokenManager";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { API_TAG_CREATE_PATH, API_TAG_GET_ALL_PATH } from "@/lib/utils/constants/apiPaths";
import { APIResult, TagCreate, TagGet } from "./returnTypes";

const API_URL = process.env.BACKEND_API_ADDRESS;

export async function createTag(values: TagCreate): Promise<APIResult<TagGet>> {
  try {
    const route: string = API_URL + API_TAG_CREATE_PATH;
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
          message: "ADD_TAG_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.UnprocessableEntity)
        return { success: false, message: { message: "ADD_TAG_ALREADY_EXIST" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "ADD_TAG_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function getAllTags(): Promise<APIResult<TagGet[]>> {
  try {
    const route: string = API_URL + API_TAG_GET_ALL_PATH;
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
          message: "GET_ALL_TAGS_API_GENERIC_ERROR",
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
        message: "GET_ALL_TAGS_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}
