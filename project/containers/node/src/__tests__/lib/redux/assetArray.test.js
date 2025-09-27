import "@testing-library/jest-dom";
import reducer, {
  addAsset,
  removeAsset,
  removeAssetsFromOnePortfolio,
  modifyAsset,
  clearAssets,
} from "@/redux/assetArray";
import { afterEach } from "node:test";

const testStockAsset = {
  id: "1",
  portfolioId: "1",
  name: "stock asset",
  description: "test stock asset",
  quantity: 1,
  unitPrice: 10,
  tags: ["1"],
  buyDate: "2023-02-20",
  symbol: "AAPL",
};

const testCryptoAsset = {
  id: "2",
  portfolioId: "1",
  name: "crypto asset",
  description: "test crypto asset",
  quantity: 1,
  unitPrice: 10,
  tags: ["1"],
  buyDate: "2023-02-20",
  symbol: "CRYPTO",
};

const testRessourceAsset = {
  id: "3",
  portfolioId: "2",
  name: "ressource asset",
  description: "test ressource asset",
  quantity: 1,
  unitPrice: 10,
  tags: ["1"],
  buyDate: "2023-02-20",
  ressourceType: "GOLD",
};

const testFixedRevenueAsset = {
  id: "4",
  portfolioId: "1",
  name: "fixed revenue asset",
  description: "test fixed revenue asset",
  quantity: 1,
  unitPrice: 10,
  tags: ["1"],
  buyDate: "2023-02-20",
  interestRate: 2,
  paymentFrequencyPerYear: 1,
  expirationDate: "2024-02-20",
  firstPaymentDate: "2023-02-20",
};

const testStockAssetChange = {
  id: "1",
  portfolioId: "1",
  name: "stock asset changed",
  description: "test stock asset",
  quantity: 1,
  unitPrice: 10,
  tags: ["1"],
  buyDate: "2023-02-20",
  symbol: "AAPL",
};

const testStockAssetChangeFake = {
  id: "10",
  portfolioId: "1",
  name: "stock asset changed",
  description: "test stock asset",
  quantity: 1,
  unitPrice: 10,
  tags: ["1"],
  buyDate: "2023-02-20",
  symbol: "AAPL",
};

afterEach(() => {});

describe("Asset reducers", () => {
  it("Should return the initial state.", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      assetArray: [],
    });
  });

  it("Should handle adding a stock asset to the empty state.", async () => {
    const previousState = {
      assetArray: [],
    };

    expect(reducer(previousState, addAsset(testStockAsset))).toEqual({
      assetArray: [testStockAsset],
    });
  });

  it("Should handle adding a second stock asset in the state.", async () => {
    const previousState = {
      assetArray: [testStockAsset],
    };

    expect(reducer(previousState, addAsset(testStockAsset))).toEqual({
      assetArray: [testStockAsset, testStockAsset],
    });
  });

  it("Should handle adding a crypto asset to the empty state.", async () => {
    const previousState = {
      assetArray: [],
    };

    expect(reducer(previousState, addAsset(testCryptoAsset))).toEqual({
      assetArray: [testCryptoAsset],
    });
  });

  it("Should handle adding a second crypto asset in the state.", async () => {
    const previousState = {
      assetArray: [testCryptoAsset],
    };

    expect(reducer(previousState, addAsset(testCryptoAsset))).toEqual({
      assetArray: [testCryptoAsset, testCryptoAsset],
    });
  });

  it("Should handle adding a ressource asset to the empty state.", async () => {
    const previousState = {
      assetArray: [],
    };

    expect(reducer(previousState, addAsset(testRessourceAsset))).toEqual({
      assetArray: [testRessourceAsset],
    });
  });

  it("Should handle adding a second ressource asset in the state.", async () => {
    const previousState = {
      assetArray: [testRessourceAsset],
    };

    expect(reducer(previousState, addAsset(testRessourceAsset))).toEqual({
      assetArray: [testRessourceAsset, testRessourceAsset],
    });
  });

  it("Should handle adding a fixed revenue asset to the empty state.", async () => {
    const previousState = {
      assetArray: [],
    };

    expect(reducer(previousState, addAsset(testFixedRevenueAsset))).toEqual({
      assetArray: [testFixedRevenueAsset],
    });
  });

  it("Should handle adding a second fixed revenue asset in the state.", async () => {
    const previousState = {
      assetArray: [testFixedRevenueAsset],
    };

    expect(reducer(previousState, addAsset(testFixedRevenueAsset))).toEqual({
      assetArray: [testFixedRevenueAsset, testFixedRevenueAsset],
    });
  });

  it("Should handle adding an asset in an array of the state without changing the other arrays.", async () => {
    const previousState = {
      assetArray: [testStockAsset, testRessourceAsset, testFixedRevenueAsset],
    };

    expect(reducer(previousState, addAsset(testCryptoAsset))).toEqual({
      assetArray: [testStockAsset, testRessourceAsset, testFixedRevenueAsset, testCryptoAsset],
    });
  });

  it("Should handle removing a non-existing asset in an empty state.", async () => {
    const previousState = {
      assetArray: [],
    };

    expect(reducer(previousState, removeAsset(testStockAsset.id))).toEqual({
      assetArray: [],
    });
  });

  it("Should handle removing a stock asset in a state with only one asset.", async () => {
    const previousState = {
      assetArray: [testStockAsset],
    };

    expect(reducer(previousState, removeAsset(testStockAsset.id))).toEqual({
      assetArray: [],
    });
  });

  it("Should handle removing a crypto asset in a state with only one asset.", async () => {
    const previousState = {
      assetArray: [testCryptoAsset],
    };

    expect(reducer(previousState, removeAsset(testCryptoAsset.id))).toEqual({
      assetArray: [],
    });
  });

  it("Should handle removing a ressource asset in a state with only one asset.", async () => {
    const previousState = {
      assetArray: [testRessourceAsset],
    };

    expect(reducer(previousState, removeAsset(testRessourceAsset.id))).toEqual({
      assetArray: [],
    });
  });

  it("Should handle removing a ressource asset in a state with only one asset.", async () => {
    const previousState = {
      assetArray: [testFixedRevenueAsset],
    };

    expect(reducer(previousState, removeAsset(testFixedRevenueAsset.id))).toEqual({
      assetArray: [],
    });
  });

  it("Should handle removing assets in a state with multiple similar assets.", async () => {
    const previousState = {
      assetArray: [testStockAsset, testStockAsset],
    };

    expect(reducer(previousState, removeAsset(testStockAsset.id))).toEqual({
      assetArray: [],
    });
  });

  it("Should handle removing all assets from one specific portfolio.", async () => {
    const previousState = {
      assetArray: [testStockAsset, testCryptoAsset, testRessourceAsset, testFixedRevenueAsset],
    };

    expect(reducer(previousState, removeAssetsFromOnePortfolio("1"))).toEqual({
      assetArray: [testRessourceAsset],
    });
  });

  it("Should handle modifying a non existing asset.", async () => {
    const previousState = { assetArray: [testStockAsset, testStockAsset] };

    expect(reducer(previousState, modifyAsset(testStockAssetChangeFake))).toEqual({
      assetArray: [testStockAsset, testStockAsset],
    });
  });

  it("Should handle modifying an asset.", async () => {
    const previousState = { assetArray: [testStockAsset, testCryptoAsset] };

    expect(reducer(previousState, modifyAsset(testStockAssetChange))).toEqual({
      assetArray: [testStockAssetChange, testCryptoAsset],
    });
  });

  it("Should handle clearing an empty state.", async () => {
    const previousState = { assetArray: [] };

    expect(reducer(previousState, clearAssets())).toEqual({
      assetArray: [],
    });
  });

  it("Should handle clearing a non-empty state.", async () => {
    const previousState = { assetArray: [testStockAsset, testCryptoAsset] };

    expect(reducer(previousState, clearAssets())).toEqual({
      assetArray: [],
    });
  });
});
