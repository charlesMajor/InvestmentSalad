"use client";

import { TagGet } from "@/lib/services/returnTypes";
import { getYahooFinanceData } from "@/lib/services/yahooFinanceService";
import { t } from "i18next";
import { TypeDisp } from "./selectArray";

export const NB_OF_DAYS_IN_WEEK = 7;
export const NB_OF_DAYS_IN_MONTH = 30;
export const NB_OF_DAYS_IN_YEAR = 365;
export const NB_OF_WEEKS_IN_YEAR = 52;
export const NB_OF_MONTHS_IN_YEAR = 12;

export const MAX_DESCRIPTION_LENGTH = 256;

export const MIN_NAME_LENGTH = 1;
export const MAX_NAME_LENGTH = 30;

export const MIN_SYMBOL_LENGTH = 1;
export const MAX_SYMBOL_LENGTH = 20;

export const MIN_TAG_NAME_LENGTH = 1;
export const MAX_TAG_NAME_LENGTH = 16;
export const TAG_COLOR_LENGTH = 6;

export const MIN_PAYOUT_FREQUENCY_VALUE_LENGTH = 0;
export const MAX_PAYOUT_FREQUENCY_VALUE_LENGTH = 365;

export const MIN_PAYOUT_INTEREST_RATE_LENGTH = 0;
export const MAX_PAYOUT_INTEREST_RATE_LENGTH = 100;

export const WIDGET_DISTRIBUTION_MIN_TAG = 2;
export const WIDGET_NETWORTH_MIN_TAG = 1;

export const MIN_NUMBER_OF_SHARE_ASSET = 0;
export const MIN_BUY_PRICE_ASSET = 0;
export const MIN_COMMISSION_FEE_ASSET = 0;

export const WIDGET_MIN_TAG = 2;

export const WIDGET_MIN_SELECT_SYMBOLS = 1;

export const isTagUnique = (name: string, color: string, tags: TagGet[]) => {
  return !tags.some((tag) => tag.name === name && tag.hexColor === color);
};

export const removeTagDuplicates = (tags: TagGet[]) => {
  let updatedArray: TagGet[] = [];

  tags.forEach((tag) => {
    let isNew = true;
    for (let i = 0; i < updatedArray.length; i++) {
      if (updatedArray[i].tagId == tag.tagId) {
        isNew = false;
        break;
      }
    }
    if (isNew) {
      updatedArray.push(tag);
    }
  });
  return updatedArray;
};

export const isInEnum = (array: Array<string> | undefined, value: string) => {
  return Array.isArray(array) && array.includes(value);
};

export const isNumber = (value: string) => {
  const numberRegex = /^[0-9.]+$/;
  return numberRegex.test(value);
};

export const hasDigits = (value: number) => {
  return value % 1 > 0;
};

export const payoutFrequencyVerify = (value: number, time: string, array: Array<string>) => {
  if (time == array[2] && value <= NB_OF_DAYS_IN_WEEK) {
    return true;
  } else if (time == array[1] && value <= NB_OF_DAYS_IN_MONTH) {
    return true;
  } else if (time == array[0] && value <= NB_OF_DAYS_IN_YEAR) {
    return true;
  } else if (time == "") {
    return true;
  }
  return false;
};

export const isOneZero = (value1: number, value2: number) => {
  return (value1 == 0 && value2 == 0) || (value1 != 0 && value2 != 0);
};

export const isSymbolInYahooFinance = async (symbol: string) => {
  const result = await getYahooFinanceData(symbol);

  return result.success === true;
};

export const isSymbolCryptoInYahooFinance = async (symbol: string) => {
  const result = await getYahooFinanceData(symbol);
  if (result.success !== true) {
    return false;
  } else {
    return result.data.key.chart.result[0].meta.instrumentType === TypeDisp.CRYPTO.toUpperCase();
  }
};

export const isSymbolStockInYahooFinance = async (symbol: string) => {
  const result = await getYahooFinanceData(symbol);
  if (result.success !== true) {
    return false;
  } else {
    return result.data.key.chart.result[0].meta.instrumentType !== TypeDisp.CRYPTO.toUpperCase();
  }
};

export const timeMap: Record<string, string> = {
  "1d": "PERIOD_1DAY",
  "5d": "PERIOD_5DAY",
  "1mo": "PERIOD_1MONTH",
  "3mo": "PERIOD_3MONTHS",
  "6mo": "PERIOD_6MONTHS",
  "1y": "PERIOD_1Y",
  "2y": "PERIOD_2Y",
  "5y": "PERIOD_5Y",
  "10y": "PERIOD_10Y",
  ytd: "PERIOD_YTD",
  max: "PERIOD_MAX",
};
