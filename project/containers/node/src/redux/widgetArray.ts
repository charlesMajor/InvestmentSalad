"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WidgetGet } from "@/lib/services/returnTypes";

interface WidgetArrayState {
  widgetArray: WidgetGet[];
}

const initialState: WidgetArrayState = {
  widgetArray: [],
};

export const widgetArraySlice = createSlice({
  name: "widgetArray",
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<WidgetGet>) => {
      state.widgetArray.push(action.payload);
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      const updatedWidgets = state.widgetArray.filter((widget) => widget.id !== action.payload);
      state.widgetArray = updatedWidgets;
    },
    modifyWidget: (state, action: PayloadAction<WidgetGet>) => {
      for (let i = 0; i < state.widgetArray.length; i++) {
        if (state.widgetArray[i].id == action.payload.id) {
          state.widgetArray[i] = action.payload;
          break;
        }
      }
    },
    clearWidgetsForDashboard: (state, action: PayloadAction<string>) => {
      const updatedWidgets = state.widgetArray.filter(
        (widget) => widget.dashboardId !== action.payload,
      );
      state.widgetArray = updatedWidgets;
    },
    clearWidgets: (state) => {
      state.widgetArray = [];
    },
  },
});

export const { addWidget, removeWidget, modifyWidget, clearWidgetsForDashboard, clearWidgets } =
  widgetArraySlice.actions;

export default widgetArraySlice.reducer;
