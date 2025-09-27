"use client";

import { createSlice } from "@reduxjs/toolkit";

interface StoreSetupState {
  isInitialised: boolean;
}

const initialState: StoreSetupState = {
  isInitialised: false,
};

export const storeSetupSlice = createSlice({
  name: "storeSetup",
  initialState,
  reducers: {
    storeIsInitialised: (state) => {
      state.isInitialised = true;
    },
    storeIsNotInitialised: (state) => {
      state.isInitialised = false;
    },
  },
});

export const { storeIsInitialised, storeIsNotInitialised } = storeSetupSlice.actions;

export default storeSetupSlice.reducer;
