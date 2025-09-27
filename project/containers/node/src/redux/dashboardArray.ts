"use client";

import { Dashboard } from "@/lib/services/returnTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface DashboardArrayState {
  dashboardArray: Dashboard[];
}

const initialState: DashboardArrayState = {
  dashboardArray: [],
};

export const dashboardArraySlice = createSlice({
  name: "dashboardArray",
  initialState,
  reducers: {
    addDashboard: (state, action: PayloadAction<Dashboard>) => {
      state.dashboardArray.push(action.payload);
    },
    removeDashboard: (state, action: PayloadAction<string>) => {
      const updatedDashboardArray = state.dashboardArray.filter(
        (item) => item.id !== action.payload,
      );
      state.dashboardArray = updatedDashboardArray;
    },
    clearDashboards: (state) => {
      state.dashboardArray = [];
    },
  },
});

export const { addDashboard, removeDashboard, clearDashboards } = dashboardArraySlice.actions;

export default dashboardArraySlice.reducer;
