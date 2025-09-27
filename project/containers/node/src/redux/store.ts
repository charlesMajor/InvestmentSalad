"use client";

import { configureStore } from "@reduxjs/toolkit";
import portfolioArraySlice from "./portfolioArray";
import assetArraySlice from "./assetArray";
import widgetArraySlice from "./widgetArray";
import tagArraySlice from "./tagArray";
import storeSetupSlice from "./storeSetup";
import dashboardArraySlice from "./dashboardArray";

export default configureStore({
  reducer: {
    portfolioArray: portfolioArraySlice,
    assetArray: assetArraySlice,
    dashboardArray: dashboardArraySlice,
    widgetArray: widgetArraySlice,
    tagArray: tagArraySlice,
    isInitialised: storeSetupSlice,
  },
});
