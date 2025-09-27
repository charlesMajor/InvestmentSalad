import { createSelector } from "@reduxjs/toolkit";
import { Portfolio } from "@/lib/models/portfolioModel";

const selectPortfolioArray = (state: any) => state.portfolioArray.portfolioArray;

export const selectPortfolioById = (portfolioId: string) =>
  createSelector(selectPortfolioArray, (portfolioArray) =>
    portfolioArray.find((portfolio: Portfolio) => portfolio.id === portfolioId),
  );

export const selectPortfoliosByTags = (tags: string[]) =>
  createSelector(selectPortfolioArray, (portfolioArray) =>
    portfolioArray.filter((portfolio: Portfolio) =>
      tags.some((tag) => portfolio.tags.includes(tag)),
    ),
  );
