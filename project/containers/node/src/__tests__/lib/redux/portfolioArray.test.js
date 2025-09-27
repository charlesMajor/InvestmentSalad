import "@testing-library/jest-dom";
import reducer, {
  addPortfolio,
  removePortfolio,
  modifyPortfolio,
  clearPortfolios,
} from "@/redux/portfolioArray";
import { afterEach } from "node:test";

const testPortfolio = {
  id: 1,
  name: "portfolio",
  description: "Test portfolio",
  cashBalance: 10,
  currency: "CAD",
  cashInterestRate: 2,
  interestPaymentFrequencyPerYear: 1,
  initialInterestPaymentDate: null,
};

const testPortfolio2 = {
  id: 2,
  name: "portfolio",
  description: "Test portfolio",
  cashBalance: 10,
  currency: "CAD",
  cashInterestRate: 2,
  interestPaymentFrequencyPerYear: 1,
  initialInterestPaymentDate: null,
};

const testPortfolioChange = {
  id: 1,
  name: "portfolio changed",
  description: "Test portfolio",
  cashBalance: 10,
  currency: "CAD",
  cashInterestRate: 2,
  interestPaymentFrequencyPerYear: 1,
  initialInterestPaymentDate: null,
};

const testPortfolioChangeFake = {
  id: 3,
  name: "portfolio change not existing",
  description: "Test portfolio",
  cashBalance: 10,
  currency: "CAD",
  cashInterestRate: 2,
  interestPaymentFrequencyPerYear: 1,
  initialInterestPaymentDate: null,
};

afterEach(() => {});

describe("Portfolio reducers", () => {
  it("Should return the initial state.", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ portfolioArray: [] });
  });

  it("Should handle adding a portfolio to the empty state.", async () => {
    const previousState = { portfolioArray: [] };

    expect(reducer(previousState, addPortfolio(testPortfolio))).toEqual({
      portfolioArray: [testPortfolio],
    });
  });

  it("Should handle adding a second portfolio in the state.", async () => {
    const previousState = { portfolioArray: [testPortfolio] };

    expect(reducer(previousState, addPortfolio(testPortfolio2))).toEqual({
      portfolioArray: [testPortfolio, testPortfolio2],
    });
  });

  it("Should handle removing a non-existing portfolio in an empty state.", async () => {
    const previousState = { portfolioArray: [] };

    expect(reducer(previousState, removePortfolio(testPortfolio.id))).toEqual({
      portfolioArray: [],
    });
  });

  it("Should handle removing a portfolio in a state with only one portfolio.", async () => {
    const previousState = { portfolioArray: [testPortfolio] };

    expect(reducer(previousState, removePortfolio(testPortfolio.id))).toEqual({
      portfolioArray: [],
    });
  });

  it("Should handle removing a portfolio in a state with multiple portfolios.", async () => {
    const previousState = { portfolioArray: [testPortfolio, testPortfolio2] };

    expect(reducer(previousState, removePortfolio(testPortfolio.id))).toEqual({
      portfolioArray: [testPortfolio2],
    });
  });

  it("Should handle removing portfolios in a state with multiple similar portfolios.", async () => {
    const previousState = { portfolioArray: [testPortfolio, testPortfolio] };

    expect(reducer(previousState, removePortfolio(testPortfolio.id))).toEqual({
      portfolioArray: [],
    });
  });

  it("Should handle modifying a non existing portfolio.", async () => {
    const previousState = { portfolioArray: [testPortfolio, testPortfolio2] };

    expect(reducer(previousState, modifyPortfolio(testPortfolioChangeFake))).toEqual({
      portfolioArray: [testPortfolio, testPortfolio2],
    });
  });

  it("Should handle modifying a portfolio.", async () => {
    const previousState = { portfolioArray: [testPortfolio, testPortfolio2] };

    expect(reducer(previousState, modifyPortfolio(testPortfolioChange))).toEqual({
      portfolioArray: [testPortfolioChange, testPortfolio2],
    });
  });

  it("Should handle clearing an empty state.", async () => {
    const previousState = { portfolioArray: [] };

    expect(reducer(previousState, clearPortfolios())).toEqual({
      portfolioArray: [],
    });
  });

  it("Should handle clearing a non-empty state.", async () => {
    const previousState = { portfolioArray: [testPortfolio, testPortfolio2] };

    expect(reducer(previousState, clearPortfolios())).toEqual({
      portfolioArray: [],
    });
  });
});
