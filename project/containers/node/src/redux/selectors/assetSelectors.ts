import { AssetGet, AssetType } from "@/lib/services/returnTypes";
import { createSelector } from "@reduxjs/toolkit";
import { selectPortfoliosByTags } from "./portfolioSelectors";
import { Portfolio } from "@/lib/models/portfolioModel";

const selectAssetArray = (state: any) => state.assetArray.assetArray;

export const selectAssetById = (assetId: string) =>
  createSelector(selectAssetArray, (assetArray) =>
    assetArray.find((asset: AssetGet) => asset.id === assetId),
  );

export const selectAssetByType = (assetType: AssetType) =>
  createSelector(selectAssetArray, (assetArray) =>
    assetArray.filter((asset: AssetGet) => asset.assetType === assetType),
  );

export const selectAssetByTypeAndPortfolio = (assetType: AssetType, portfolioId: string) =>
  createSelector(selectAssetArray, (assetArray) =>
    assetArray.filter(
      (asset: AssetGet) => asset.assetType === assetType && asset.portfolioId === portfolioId,
    ),
  );

export const selectAssetByPortfolio = (portfolioId: string) =>
  createSelector(selectAssetArray, (assetArray) =>
    assetArray.filter((asset: AssetGet) => asset.portfolioId === portfolioId),
  );

export const selectAssetsByTags = (tags: string[]) =>
  createSelector([selectAssetArray, selectPortfoliosByTags(tags)], (assetArray, portfolios) => {
    const tagMap: Record<string, AssetGet[]> = {}; // Record to hold tag arrays

    // Initialize the tagMap with empty arrays for each tag
    tags.forEach((tag) => {
      tagMap[tag] = [];
    });
    assetArray.forEach((asset: AssetGet) => {
      //good------------------------------------------------------------
      asset.tags.forEach((tag) => {
        if (tagMap[tag]) {
          let isAssetAlreadyInList = false;
          for (let i = 0; i < tagMap[tag].length; i++) {
            if (tagMap[tag][i].id == asset.id) {
              isAssetAlreadyInList = true;
            }
          }
          if (!isAssetAlreadyInList) {
            tagMap[tag].push(asset);
          }
        }
      });
    });
    portfolios.forEach((portfolio: Portfolio) => {
      // for each tag in the portfolio's list
      for (let i = 0; i < portfolio.tags.length; i++) {
        const tag = portfolio.tags[i];
        // if the tag is in the list
        if (tagMap[tag]) {
          // for each asset in the store
          for (let j = 0; j < assetArray.length; j++) {
            let asset = assetArray[j];
            // if the asset is in the portfolio
            if (asset.portfolioId == portfolio.id) {
              let isAssetAlreadyInList = false;
              // for each asset already in the tag's array
              for (let k = 0; k < tagMap[tag].length; k++) {
                // if the asset is already in the list, break
                if (tagMap[tag][k].id == asset.id) {
                  isAssetAlreadyInList = true;
                  break;
                }
              }
              // if it is not already in the list, add it
              if (!isAssetAlreadyInList) {
                tagMap[tag].push(asset);
              }
            }
          }
        }
      }
    });
    return tagMap;
  });
