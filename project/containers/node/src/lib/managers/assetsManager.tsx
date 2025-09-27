"use server";

import { HttpStatusCode } from "axios";
import {
  getCrumb,
  getYahooFinanceFromCrumb,
  setYahooFinanceCookie,
} from "../services/yahooFinanceService";
import { APIResult, StockGet } from "../services/returnTypes";
import { toast } from "sonner";
import { t } from "i18next";

export type AssetInformation = {
  price: number;
  currency: string;
  percentage: number;
  longName: string;
};

export async function getAssetInformationFromYahooFinance(
  symbol: string,
  crumb: string,
  yahooFinanceCookie: string,
): Promise<APIResult<AssetInformation>> {
  try {
    /* const crumb = localStorage.getItem("crumb");
    const yahooFinanceCookie = localStorage.getItem("yahooFinanceCookie");*/

    if (crumb && yahooFinanceCookie) {
      return await getYahooFinanceFromCrumb(
        symbol,
        "modules=price",
        crumb,
        yahooFinanceCookie,
      ).then((result) => {
        if (!result.success && result.message) {
          if (result.message.options?.statusCode == HttpStatusCode.InternalServerError) {
            return {
              success: false,
              message: {
                message: "GET_ASSET_INFORMATION_ERROR",
              },
            };
          }
        }
        if (result.success && result.data) {
          const priceObj = result.data.key.quoteSummary.result[0].price;
          const obj: AssetInformation = {
            price: priceObj.regularMarketPrice.raw,
            currency: priceObj.currency,
            percentage: priceObj.regularMarketChangePercent.raw,
            longName: priceObj.longName,
          };
          return {
            success: true,
            data: obj,
          };
        }
        throw new Error();
      });
    } else {
      return {
        success: false,
        message: {
          message: "GET_ASSET_INFORMATION_ERROR",
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      message: {
        message: "GET_ASSET_INFORMATION_ERROR",
      },
    };
  }
}

export async function getAssetsInformationFromAssetList(
  assetList: StockGet[],
  crumb: string,
  cookie: string,
): Promise<APIResult<(AssetInformation | null)[]>> {
  let assetsSelection: (AssetInformation | null)[] = [];

  await Promise.all(
    assetList.map(async (asset: StockGet) => {
      const assetPromises = await getAssetInformationFromYahooFinance(
        asset.symbol,
        crumb,
        cookie,
      ).then((result) => {
        if (result.success && result.data) {
          assetsSelection.push(result.data);
        } else if (!result.success && result.message) {
          assetsSelection.push(null);
        }
      });
    }),
  );

  return {
    success: true,
    data: assetsSelection,
  };
}
