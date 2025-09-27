"use client";

import { AssetGet } from "@/lib/services/returnTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AssetArrayState {
  assetArray: AssetGet[];
}

const initialState: AssetArrayState = {
  assetArray: [],
};

export const assetArraySlice = createSlice({
  name: "assetArray",
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<AssetGet>) => {
      state.assetArray.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      const updatedAssets = state.assetArray.filter((item) => item.id !== action.payload);
      state.assetArray = updatedAssets;
    },
    removeAssetsFromOnePortfolio: (state, action: PayloadAction<string>) => {
      const updatedAssets = state.assetArray.filter((item) => item.portfolioId !== action.payload);
      state.assetArray = updatedAssets;
    },
    modifyAsset: (state, action: PayloadAction<AssetGet>) => {
      for (let i = 0; i < state.assetArray.length; i++) {
        if (state.assetArray[i].id == action.payload.id) {
          state.assetArray[i] = action.payload;
        }
      }
    },
    clearAssets: (state) => {
      state.assetArray = [];
    },
  },
});

export const { addAsset, removeAsset, removeAssetsFromOnePortfolio, modifyAsset, clearAssets } =
  assetArraySlice.actions;

export default assetArraySlice.reducer;
