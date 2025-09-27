import { TagGet } from "@/lib/services/returnTypes";
import { createSelector } from "@reduxjs/toolkit";

const selectTagArray = (state: any) => state.tagArray.tagArray;

export const selectTagById = (tagId: string) =>
  createSelector(selectTagArray, (tagArray) => tagArray.find((tag: TagGet) => tag.tagId === tagId));

export const selectMultipleTagsByIds = (tagIds: string[]) =>
  createSelector(selectTagArray, (tagArray) =>
    tagArray.filter((tag: TagGet) => tagIds.includes(tag.tagId)),
  );
