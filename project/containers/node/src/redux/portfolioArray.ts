"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PortfolioGet } from "@/lib/services/returnTypes";

interface ModifyPortfolioState {
  id: string;
  portfolio: PortfolioGet;
}

interface PortfolioArrayState {
  portfolioArray: PortfolioGet[];
}

const initialState: PortfolioArrayState = {
  portfolioArray: [],
};

export const portfolioArraySlice = createSlice({
  name: "portfolioArray",
  initialState,
  reducers: {
    addPortfolio: (state, action: PayloadAction<PortfolioGet>) => {
      state.portfolioArray.push(action.payload);
    },
    removePortfolio: (state, action: PayloadAction<string>) => {
      const updatedPortfolioArray = state.portfolioArray.filter(
        (item) => item.id !== action.payload,
      );
      state.portfolioArray = updatedPortfolioArray;
    },
    modifyPortfolio: (state, action: PayloadAction<PortfolioGet>) => {
      for (let i = 0; i < state.portfolioArray.length; i++) {
        if (state.portfolioArray[i].id == action.payload.id) {
          state.portfolioArray[i] = action.payload;
        }
      }
    },
    clearPortfolios: (state) => {
      state.portfolioArray = [];
    },
  },
});

export const { addPortfolio, removePortfolio, modifyPortfolio, clearPortfolios } =
  portfolioArraySlice.actions;

export default portfolioArraySlice.reducer;
