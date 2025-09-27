"use client";

import { TagGet } from "@/lib/services/returnTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TagArrayState {
  tagArray: TagGet[];
}

const initialState: TagArrayState = {
  tagArray: [],
};

export const tagArraySlice = createSlice({
  name: "tagArray",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<TagGet>) => {
      state.tagArray.push(action.payload);
    },
    clearTags: (state) => {
      state.tagArray = [];
    },
  },
});

export const { addTag, clearTags } = tagArraySlice.actions;

export default tagArraySlice.reducer;
