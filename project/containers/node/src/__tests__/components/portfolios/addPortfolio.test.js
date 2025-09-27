import "@testing-library/jest-dom";
import { render, fireEvent, cleanup, waitFor } from "../../configTest";
import { afterEach, describe } from "node:test";
import { AddPortfolio } from "@/components/addPortfolio";
import { currencyList } from "@/lib/utils/constants/selectArray";

jest.mock("axios");
jest.mock("sonner");
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: "3rdParty",
    init: () => {},
  },
}));
jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
  })),
}));

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const ADD_PORTFOLIO_TAGS_LABEL = "TAG_LIST_TAGS";
const ADD_PORTFOLIO_NAME_LABEL = "NAME_LABEL";
const ADD_PORTFOLIO_DESCRIPTION_LABEL = "DESCRIPTION_LABEL";
const ADD_PORTFOLIO_CASH_BALANCE_LABEL = "CASH_BALANCE_LABEL";
const ADD_PORTFOLIO_CURRENCY_LABEL = "CURRENCY_LABEL";
const ADD_PORTFOLIO_INTEREST_RATE_LABEL = "INTEREST_RATE_LABEL";

const ADD_PORTFOLIO_NAME_LENGTH_ERROR = "ADD_PORTFOLIO_NAME_LENGTH";
const ADD_PORTFOLIO_DESCRIPTION_LENGTH_ERROR = "ADD_PORTFOLIO_DESCRIPTION_LENGTH";
const ADD_PORTFOLIO_CASH_BALANCE_NUMBER_ERROR = "ADD_PORTFOLIO_CASH_BALANCE_NUMBER";
const ADD_PORTFOLIO_INVALID_SELECT_OPTION_ERROR = "INVALID_SELECT_OPTION";
const ADD_PORTFOLIO_INTEREST_RATE_LENGTH_ERROR = "ADD_PORTFOLIO_INTEREST_RATE_LENGTH";
const ADD_PORTFOLIO_INTEREST_RATE_NUMBER_ERROR = "ADD_PORTFOLIO_INTEREST_RATE_NUMBER";

const ADD_PORTFOLIO_CONFIRM_BUTTON_TEXT = "CONFIRM_BUTTON_TEXT";

describe("AddPortfolio", () => {
  describe("Tags", () => {
    it("Given a AddPortfolio component, when a valid array of tags is entered and the form is submitted, then no error should be thrown.", async () => {
      const { getByText, getByLabelText } = render(<AddPortfolio />);
      const tagsInput = getByLabelText(ADD_PORTFOLIO_TAGS_LABEL);

      fireEvent.change(tagsInput, {
        target: {
          value: ["d1f6501c-1b58-40c3-b956-1434ff39006a", "c99b6ad8-cf0d-4abe-8082-5b0449f93941"],
        },
      });
      fireEvent.submit(getByText(ADD_PORTFOLIO_CONFIRM_BUTTON_TEXT));
    });
  });

  describe("Name", () => {
    it("Given a AddPortfolio component, when a valid name is entered and the form is submitted, then no name error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<AddPortfolio />);
      const nameInput = getByLabelText(ADD_PORTFOLIO_NAME_LABEL);

      fireEvent.change(nameInput, { target: { value: "valid - name123 !" } });
      fireEvent.submit(getByText(ADD_PORTFOLIO_CONFIRM_BUTTON_TEXT));

      await waitFor(() => {
        const errorMessage = queryByText(ADD_PORTFOLIO_NAME_LENGTH_ERROR);
        expect(errorMessage).toBeNull();
      });
    });
  });

  describe("Description", () => {
    it("Given a AddPortfolio component, when a valid description is entered and the form is submitted, then no description error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<AddPortfolio />);
      const descriptionInput = getByLabelText(ADD_PORTFOLIO_DESCRIPTION_LABEL);

      fireEvent.change(descriptionInput, {
        target: { value: "This is a test and valid description." },
      });
      fireEvent.submit(getByText(ADD_PORTFOLIO_CONFIRM_BUTTON_TEXT));

      await waitFor(() => {
        const errorMessage = queryByText(ADD_PORTFOLIO_DESCRIPTION_LENGTH_ERROR);
        expect(errorMessage).toBeNull();
      });
    });
  });

  describe("CashBalance", () => {
    it("Given a AddPortfolio component, when a valid cash balance is entered and the form is submitted, then no cash balance error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<AddPortfolio />);
      const cashBalanceInput = getByLabelText(ADD_PORTFOLIO_CASH_BALANCE_LABEL);

      fireEvent.change(cashBalanceInput, {
        target: { value: "123.456" },
      });
      fireEvent.submit(getByText(ADD_PORTFOLIO_CONFIRM_BUTTON_TEXT));

      await waitFor(() => {
        const errorMessage = queryByText(ADD_PORTFOLIO_CASH_BALANCE_NUMBER_ERROR);
        expect(errorMessage).toBeNull();
      });
    });
  });
});
