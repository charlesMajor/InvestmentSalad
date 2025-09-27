"use server";

import { APIResult } from "./returnTypes";
import axios, { AxiosResponse, HttpStatusCode } from "axios";

let yahooFinanceCookie: string | undefined;
let crumb: string | undefined;
const user_agent_key = "User-Agent";
const user_agent_value =
  "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36";

export async function getYahooFinanceData(
  symbol: string,
  range?: string,
  interval?: string,
): Promise<APIResult<any>> {
  try {
    const response: AxiosResponse = await axios.get(
      "https://query1.finance.yahoo.com/v8/finance/chart/" +
        symbol +
        "?region=CA&lang=en-US&includePrePost=false" +
        (range ? "&range=" + range : "") +
        (interval ? "&interval=" + interval : "") +
        "&useYfid=true&corsDomain=finance.yahoo.com&.tsrc=financeh",
    );
    return {
      success: true,
      data: {
        key: response.data,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: {
        message: "YAHOO_FINANCE_API_GENERIC_ERROR",
        options: { statusCode: error.response?.status || 500 },
      },
    };
  }
}

export async function getSearchYahooFinance(search: string): Promise<APIResult<any>> {
  try {
    const response: AxiosResponse = await axios.get(
      "https://query2.finance.yahoo.com/v1/finance/search?q=" + search,
    );
    return {
      success: true,
      data: {
        key: response.data,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: {
        message: "YAHOO_FINANCE_API_GENERIC_ERROR",
        options: { statusCode: error.response?.status || 500 },
      },
    };
  }
}

export async function getCrumb(): Promise<APIResult<any>> {
  try {
    const headers = { [user_agent_key]: user_agent_value, Cookie: yahooFinanceCookie };
    const response: AxiosResponse = await axios.get(
      "https://query2.finance.yahoo.com/v1/test/getcrumb",
      {
        headers: headers,
      },
    );
    if (yahooFinanceCookie) {
      crumb = response.data;
    }

    return {
      success: true,
      data: {
        key: response.data,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: {
        message: "YAHOO_FINANCE_API_GENERIC_ERROR",
        options: { statusCode: error.response?.status || 500 },
      },
    };
  }
}

export async function getYahooFinanceFromCrumb(
  symbol: string,
  slug: string,
  crumbParam: string,
  yahooFinanceCookieParam: string,
): Promise<APIResult<any>> {
  try {
    const headers = { [user_agent_key]: user_agent_value, Cookie: yahooFinanceCookieParam };
    const response: AxiosResponse = await axios.get(
      "https://query2.finance.yahoo.com/v10/finance/quoteSummary/" +
        symbol +
        "?crumb=" +
        crumbParam +
        "&" +
        slug,
      {
        headers: headers,
      },
    );

    return {
      success: true,
      data: {
        key: response.data,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: {
        message: "YAHOO_FINANCE_API_GENERIC_ERROR",
        options: { statusCode: HttpStatusCode.InternalServerError },
      },
    };
  }
}

export async function setYahooFinanceCookie(): Promise<APIResult<any>> {
  try {
    const response: AxiosResponse = await axios.get("https://fc.yahoo.com", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      return {
        success: true,
        data: {
          key: response.data,
        },
      };
    } else {
      return {
        success: false,
        message: {
          message: "YAHOO_FINANCE_API_GENERIC_ERROR",
          options: { statusCode: response.status },
        },
      };
    }
  } catch (error: any) {
    yahooFinanceCookie = error.response.headers["set-cookie"][0];
    return {
      success: false,
      data: { key: error.response.headers["set-cookie"] },
      message: {
        message: "YAHOO_FINANCE_API_GENERIC_ERROR",
        options: { statusCode: error.response?.status || 500 },
      },
    };
  }
}
