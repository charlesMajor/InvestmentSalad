import { AssetInformation } from "@/lib/managers/assetsManager";
import { StockGet } from "@/lib/services/returnTypes";

export function getTotalValueFromAssetList(
  assetsList: StockGet[],
  assetsInfoList: (AssetInformation | null)[],
): number {
  let totalValue = 0;
  assetsList.map((asset: StockGet, index) => {
    const initialCost = asset.quantity * asset.unitPrice;
    if (assetsInfoList[index] !== null) {
      const price = assetsInfoList[index]?.price;
      if (price !== undefined) {
        totalValue += price * asset.quantity;
      }
    } else totalValue += initialCost;
  });

  return totalValue;
}

export function getTotalReturnFromAssetList(
  assetsList: StockGet[],
  assetsInfoList: (AssetInformation | null)[],
): number {
  let totalInitialCost = 0;
  assetsList.map((asset: StockGet) => {
    totalInitialCost += asset.quantity * asset.unitPrice;
  });
  totalInitialCost = getTotalValueFromAssetList(assetsList, assetsInfoList) - totalInitialCost;

  return totalInitialCost;
}

export function getTotalReturnPercentageFromAssetList(
  assetsList: StockGet[],
  assetsInfoList: (AssetInformation | null)[],
): number {
  let totalInitialCost = 0;
  assetsList.map((asset: StockGet) => {
    totalInitialCost += asset.quantity * asset.unitPrice;
  });

  return (getTotalReturnFromAssetList(assetsList, assetsInfoList) / totalInitialCost) * 100;
}
