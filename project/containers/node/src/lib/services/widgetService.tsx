"use server";

import {
  API_WIDGET_CREATE_PATH,
  API_WIDGET_CREATE_PATH_DISTRIBUTION,
  API_WIDGET_CREATE_PATH_NETWORTH,
  API_WIDGET_CREATE_PATH_WATCHLIST,
  API_WIDGET_GET_ALL_PATH,
  API_WIDGET_UPDATE_PATH_DISTRIBUTION,
  API_WIDGET_UPDATE_PATH_NETWORTH,
  API_WIDGET_UPDATE_PATH_WATCHLIST,
} from "@/lib/utils/constants/apiPaths";
import { getToken } from "@/lib/managers/tokenManager";
import axios, { AxiosResponse, HttpStatusCode } from "axios";
import { APIResult, WidgetCreate, WidgetGet, WidgetType } from "@/lib/services/returnTypes";

const API_URL = process.env.BACKEND_API_ADDRESS;

export async function createWidget(
  dashboardId: string,
  type: WidgetType,
  values: WidgetCreate,
): Promise<APIResult<WidgetGet>> {
  try {
    let route: string = "";
    switch (type) {
      case WidgetType.DISTRIBUTION:
        route = API_URL + API_WIDGET_CREATE_PATH(dashboardId) + API_WIDGET_CREATE_PATH_DISTRIBUTION;
        break;
      case WidgetType.NETWORTH:
        route = API_URL + API_WIDGET_CREATE_PATH(dashboardId) + API_WIDGET_CREATE_PATH_NETWORTH;
        break;
      case WidgetType.WATCHLIST:
        route = API_URL + API_WIDGET_CREATE_PATH(dashboardId) + API_WIDGET_CREATE_PATH_WATCHLIST;
        break;
    }

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

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "GET_WIDGETS_DASHBOARD_NOT_FOUND" } };
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

export async function getAllWidgets(): Promise<APIResult<WidgetGet[]>> {
  try {
    const route: string = API_URL + API_WIDGET_GET_ALL_PATH;
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
          message: "GET_ALL_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "GET_WIDGETS_DASHBOARD_NOT_FOUND" } };
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

export async function updateWidget(values: WidgetGet): Promise<APIResult<WidgetGet>> {
  try {
    let route: string = "";
    switch (values.widgetType) {
      case WidgetType.DISTRIBUTION:
        route = API_URL + API_WIDGET_UPDATE_PATH_DISTRIBUTION(values.dashboardId, values.id);
        break;
      case WidgetType.NETWORTH:
        route = API_URL + API_WIDGET_UPDATE_PATH_NETWORTH(values.dashboardId, values.id);
        break;
      case WidgetType.WATCHLIST:
        route = API_URL + API_WIDGET_UPDATE_PATH_WATCHLIST(values.dashboardId, values.id);
        break;
    }

    const response: AxiosResponse = await axios.put(route, values, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.NoContent)
      return {
        success: false,
        message: {
          message: "UPDATE_WIDGET_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true, data: values };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "UPDATE_WIDGET_NOT_FOUND" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "UPDATE_WIDGET_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function deleteWidget(widget: WidgetGet): Promise<APIResult<void>> {
  try {
    let route: string = API_URL + "/widgets/" + widget.id;
    
    const response: AxiosResponse = await axios.delete(route, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (response.status !== HttpStatusCode.NoContent)
      return {
        success: false,
        message: {
          message: "DELETE_WIDGET_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    return { success: true };
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound)
        return { success: false, message: { message: "UPDATE_WIDGET_NOT_FOUND" } };
      if (error.response.status === HttpStatusCode.Unauthorized)
        return { success: false, message: { message: "LOG_OUT_API_ERROR" } };
    }

    return {
      success: false,
      message: {
        message: "DELETE_WIDGET_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}
