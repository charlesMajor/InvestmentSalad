"use client";

import { addAsset, clearAssets } from "@/redux/assetArray";
import { addPortfolio, clearPortfolios } from "@/redux/portfolioArray";
import { addTag, clearTags } from "@/redux/tagArray";
import { Dispatch } from "@reduxjs/toolkit";
import { AssetGet, PortfolioGet, TagGet, WidgetGet } from "../services/returnTypes";
import { getAllPortfolios } from "../services/portfolioService";
import { t } from "i18next";
import { toast } from "sonner";
import { getAllAssets } from "../services/assetsService";
import { getAllTags } from "../services/tagService";
import { storeIsInitialised, storeIsNotInitialised } from "@/redux/storeSetup";
import { getOneDashboard } from "../services/dashboardService";
import { addDashboard, clearDashboards } from "@/redux/dashboardArray";
import { getAllWidgets } from "../services/widgetService";
import { addWidget, clearWidgets } from "@/redux/widgetArray";

export function clearStore(dispatch: Dispatch) {
  dispatch(clearPortfolios());
  dispatch(clearAssets());
  dispatch(clearTags());
  dispatch(clearDashboards());
  dispatch(clearWidgets());
  dispatch(storeIsNotInitialised());
}

export async function initializeStore(dispatch: Dispatch) {
  await fetchPortfolios(dispatch);
  await fetchAssets(dispatch);
  await fetchTags(dispatch);
  await fetchOneDashboard(dispatch);
  await fetchWidgets(dispatch);

  dispatch(storeIsInitialised());
}

async function fetchPortfolios(dispatch: Dispatch) {
  await getAllPortfolios().then((result) => {
    if (!result.success && result.message)
      toast(t("GET_API_GENERIC_ERROR", { statusCode: result.message?.options?.statusCode }));

    if (result.success && result.data) {
      result.data.forEach((portfolio: PortfolioGet) => {
        dispatch(addPortfolio(portfolio));
      });
    }
  });
}

async function fetchOneDashboard(dispatch: Dispatch) {
  await getOneDashboard().then((result) => {
    if (!result.success && result.message)
      toast(t("GET_API_GENERIC_ERROR", { statusCode: result.message?.options?.statusCode }));

    if (result.success && result.data) {
      dispatch(addDashboard(result.data));
    }
  });
}

async function fetchAssets(dispatch: Dispatch) {
  await getAllAssets().then((result) => {
    if (!result.success && result.message)
      toast(t("GET_API_GENERIC_ERROR", { statusCode: result.message?.options?.statusCode }));

    if (result.success && result.data) {
      result.data.forEach((asset: AssetGet) => {
        dispatch(addAsset(asset));
      });
    }
  });
}

async function fetchTags(dispatch: Dispatch) {
  await getAllTags().then((result) => {
    if (!result.success && result.message)
      toast(t("GET_API_GENERIC_ERROR", { statusCode: result.message?.options?.statusCode }));

    if (result.success && result.data) {
      result.data.forEach((tag: TagGet) => {
        dispatch(addTag(tag));
      });
    }
  });
}

async function fetchWidgets(dispatch: Dispatch) {
  await getAllWidgets().then((result) => {
    if (!result.success && result.message)
      toast(t("GET_API_GENERIC_ERROR", { statusCode: result.message?.options?.statusCode }));

    if (result.success && result.data) {
      result.data.forEach((widget: WidgetGet) => {
        dispatch(addWidget(widget));
      });
    }
  });
}
