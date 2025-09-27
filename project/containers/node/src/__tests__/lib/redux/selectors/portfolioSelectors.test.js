import "@testing-library/jest-dom";
import { selectPortfolioById, selectPortfoliosByTags } from "@/redux/selectors/portfolioSelectors";

const portfolio1 = {
  name: "portfolio 1",
  description: "",
  cashBalance: 10,
  cashInterestRate: 0,
  interestPaymentFrequencyPerYear: 0,
  initialInterestPaymentDate: null,
  currency: "CAD",
  tags: ["tag1", "tag2"],
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
  tags: ["tag1"],
  id: "2",
};

const mockState = {
  portfolioArray: {
    portfolioArray: [portfolio1, portfolio2],
  },
};

describe("portfolioSelectors", () => {
  test("selectPortfolioById should return the portfolio with the specified id", () => {
    const selector = selectPortfolioById("1");
    const selectedPortfolio = selector(mockState);
    expect(selectedPortfolio).toEqual(portfolio1);
  });

  test("selectPortfolioById should return no portfolio if none has the id", () => {
    const selector = selectPortfolioById("3");
    const selectedPortfolio = selector(mockState);
    expect(selectedPortfolio).toEqual(undefined);
  });

  test("selectPortfoliosByTags should return a portfolio if it has the specified tags", () => {
    const selector = selectPortfoliosByTags(["tag2"]);
    const selectedPortfolios = selector(mockState);
    expect(selectedPortfolios).toEqual([portfolio1]);
  });

  test("selectPortfoliosByTags should return portfolios with any of the specified tags", () => {
    const selector = selectPortfoliosByTags(["tag1"]);
    const selectedPortfolios = selector(mockState);
    expect(selectedPortfolios).toEqual([portfolio1, portfolio2]);
  });

  test("selectPortfoliosByTags should return no portfolios if non have the specified tags", () => {
    const selector = selectPortfoliosByTags(["tag3"]);
    const selectedPortfolios = selector(mockState);
    expect(selectedPortfolios).toEqual([]);
  });
});
