"use server";

import {
  API_AUTH_LOGIN_PATH,
  API_AUTH_SIGN_UP_PATH,
  API_AUTH_VALIDATE_TOKEN,
} from "../utils/constants/apiPaths";
import { HttpStatusCode } from "axios";
import {
  EMAIL_ALREADY_TAKEN,
  EMAIL_NOT_FOUND,
  INVALID_CREDENTIALS,
  VALIDATION_ERROR,
} from "../utils/constants/apiErrorKey";
import { APIResult } from "./returnTypes";
import { RedirectType, redirect } from "next/navigation";
import axios, { AxiosResponse } from "axios";
import { addTokenToCookies, deleteToken, getToken } from "../managers/tokenManager";
import { clearStore } from "../managers/storeManager";
import { Dispatch } from "@reduxjs/toolkit";

interface SignUpData {
  username: string;
  emailAddress: string;
  password: string;
}

interface LoginData {
  emailAddress: string;
  password: string;
}

const API_URL = process.env.BACKEND_API_ADDRESS;

export async function signUp(values: SignUpData): Promise<APIResult<void>> {
  try {
    const route: string = API_URL + API_AUTH_SIGN_UP_PATH;
    const response: AxiosResponse = await axios.post(route, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== HttpStatusCode.Ok)
      return {
        success: false,
        message: { message: "SIGN_UP_API_GENERIC_ERROR", options: { statusCode: response.status } },
      };

    addTokenToCookies(response.data.token);

    return { success: true };
  } catch (error: any) {
    if (error.response) {
      if (error.response.data.errorCode === VALIDATION_ERROR)
        return { success: false, message: { message: "SIGN_UP_API_PASSWORD_NOT_STRONG" } };

      if (error.response.data.errorCode === EMAIL_ALREADY_TAKEN)
        return { success: false, message: { message: "SIGN_UP_API_EMAIL_USED_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "SIGN_UP_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function login(values: LoginData): Promise<APIResult<void>> {
  try {
    const route: string = API_URL + API_AUTH_LOGIN_PATH;
    const response: AxiosResponse = await axios.post(route, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== HttpStatusCode.Ok)
      return {
        success: false,
        message: { message: "LOGIN_API_GENERIC_ERROR", options: { statusCode: response.status } },
      };

    addTokenToCookies(response.data.token);

    return { success: true };
  } catch (error: any) {
    if (error.response) {
      if (
        error.response.data.errorCode === INVALID_CREDENTIALS ||
        error.response.data.errorCode === EMAIL_NOT_FOUND ||
        error.response.status === HttpStatusCode.Unauthorized
      )
        return { success: false, message: { message: "LOGIN_API_WRONG_CREDENTIALS" } };
    }

    return {
      success: false,
      message: {
        message: "LOGIN_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function logout(): Promise<APIResult<void>> {
  try {
    await deleteToken();

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      message: {
        message: "LOG_OUT_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  } finally {
    redirect("/login");
  }
}

export async function validateToken(): Promise<boolean> {
  try {
    const route: string = API_URL + API_AUTH_VALIDATE_TOKEN;
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    };

    const response = await fetch(route, options);
    return response.status == HttpStatusCode.Ok;
  } catch (error) {
    return false;
  }
}
