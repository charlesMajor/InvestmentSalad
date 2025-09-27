import "@testing-library/jest-dom";
import {
  selectAssetById,
  selectAssetByType,
  selectAssetByTypeAndPortfolio,
  selectAssetByPortfolio,
  selectAssetsByTags,
} from "@/redux/selectors/assetSelectors";
import { AssetType } from "@/lib/services/returnTypes";

const portfolio1 = {
  name: "portfolio 1",
  description: "",
  cashBalance: 10,
  cashInterestRate: 0,
  interestPaymentFrequencyPerYear: 0,
  initialInterestPaymentDate: null,
  currency: "CAD",
  tags: ["tag1"],
  id: "1",
};

const portfolio2 = {
  name: "portfolio 2",
  description: "",
  cashBalance: 15,
  cashInterestRate: 0,
  interestPaymentFrequencyPerYear: 0,
  initialInterestPaymentDate: null,
  currency: "USD",
  tags: [],
  id: "2",
};

const asset1 = {
  name: "asset1",
  description: "",
  quantity: 5,
  unitPrice: 10,
  tags: ["tag1", "tag1", "tag2"],
  assetType: AssetType.STOCK,
  buyDate: "2022-06-12",
  id: "1",
  portfolioId: "1",
};

const asset2 = {
  name: "asset2",
  description: "",
  quantity: 7,
  unitPrice: 12,
  tags: ["tag2"],
  assetType: AssetType.CRYPTO,
  buyDate: "2022-06-12",
  id: "2",
  portfolioId: "1",
};

const asset3 = {
  name: "asset3",
  description: "",
  quantity: 3,
  unitPrice: 8,
  tags: ["tag1"],
  assetType: AssetType.STOCK,
  buyDate: "2022-06-12",
  id: "3",
  portfolioId: "2",
};

const mockState = {
  assetArray: {
    assetArray: [asset1, asset2, asset3],
  },
  portfolioArray: {
    portfolioArray: [portfolio1, portfolio2],
  },
};

describe("assetSelectors", () => {
  test("selectAssetById should return the asset with the specified id", () => {
    const selector = selectAssetById("1");
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual(asset1);
  });

  test("selectAssetById should return no asset if none has the id", () => {
    const selector = selectAssetById("4");
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual(undefined);
  });

  test("selectAssetByType should return an asset of a specific type", () => {
    const selector = selectAssetByType(AssetType.CRYPTO);
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([asset2]);
  });

  test("selectAssetByType should return multiple asset of a specific type", () => {
    const selector = selectAssetByType(AssetType.STOCK);
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([asset1, asset3]);
  });

  test("selectAssetByType should return no asset if none have a specific type", () => {
    const selector = selectAssetByType(AssetType.RESSOURCE);
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([]);
  });

  test("selectAssetByTypeAndPortfolio should return an asset of a specific type and portfolio", () => {
    const selector = selectAssetByTypeAndPortfolio(AssetType.STOCK, "1");
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([asset1]);
  });

  test("selectAssetByTypeAndPortfolio should no asset if none have the specific type and portfolio", () => {
    const selector = selectAssetByTypeAndPortfolio(AssetType.STOCK, "3");
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([]);
  });

  test("selectAssetByPortfolio should return an asset of a portfolio", () => {
    const selector = selectAssetByPortfolio("2");
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([asset3]);
  });

  test("selectAssetByPortfolio should return multiple asset of a portfolio", () => {
    const selector = selectAssetByPortfolio("1");
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([asset1, asset2]);
  });

  test("selectAssetByPortfolio should return no asset if none are in the portfolio", () => {
    const selector = selectAssetByPortfolio("3");
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual([]);
  });

  test("selectAssetByTags should return a map of asset by tags", () => {
    const tagMap = {};
    tagMap["tag1"] = [asset1, asset3, asset2];
    tagMap["tag2"] = [asset1, asset2];

    const selector = selectAssetsByTags(["tag1", "tag2"]);
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual(tagMap);
  });

  test("selectAssetByTags should return an empty map of asset by not existing tags", () => {
    const tagMap = {};
    tagMap["tag3"] = [];
    tagMap["tag4"] = [];

    const selector = selectAssetsByTags(["tag3", "tag4"]);
    const selectedAsset = selector(mockState);
    expect(selectedAsset).toEqual(tagMap);
  });
});
