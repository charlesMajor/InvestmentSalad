import { toast } from "sonner";
import "@testing-library/jest-dom";
import { afterEach, describe } from "node:test";
import { HttpStatusCode } from "axios";
import LoginView from "@/app/login/page";
import { login } from "@/lib/services/authService";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

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
jest.mock("@/lib/services/authService");

afterEach(() => {
  cleanup();
  assignMock.mockClear();
});

const LOGIN_EMAIL_LABEL = "LOGIN_EMAIL_LABEL";
const LOGIN_PASSWORD_LABEL = "LOGIN_PASSWORD_LABEL";

const LOGIN_EMAIL_FORMAT_ERROR = "LOGIN_EMAIL_FORMAT";
const LOGIN_PASSWORD_LENGTH_ERROR = "LOGIN_PASSWORD_LENGTH";

const LOGIN_SUBMIT_BUTTON = "LOGIN_SUBMIT_BUTTON";
const LOGIN_PAGE_FORGOT_PASSWORD_LINK = "LOGIN_PAGE_FORGOT_PASSWORD";
const LOGIN_PAGE_FORGOT_PASSWORD_MESSAGE = "LOGIN_PAGE_FORGOT_PASSWORD_MESSAGE";

const LOGIN_API_GENERIC_ERROR_MESSAGE = "LOGIN_API_GENERIC_ERROR";

describe("LoginView", () => {
  describe("Valid submit", () => {
    it("Given a LoginView, when all input fields are valid and the form is submitted, then a success message should not be displayed.", async () => {
      const { getByText, getByLabelText } = render(<LoginView />);
      const emailInput = getByLabelText(LOGIN_EMAIL_LABEL);
      const passwordInput = getByLabelText(LOGIN_PASSWORD_LABEL);

      login.mockResolvedValue({ success: true });

      fireEvent.change(emailInput, { target: { value: "abc@def.com" } });
      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.submit(getByText(LOGIN_SUBMIT_BUTTON));

      await waitFor(() => {
        expect(toast).not.toHaveBeenCalled();
      });
    });

    it("Given a LoginView, when the form is submitted with valid inputs but encounters an API error, then the appropriate error message should be displayed.", async () => {
      const { getByText, getByLabelText } = render(<LoginView />);
      const emailInput = getByLabelText(LOGIN_EMAIL_LABEL);
      const passwordInput = getByLabelText(LOGIN_PASSWORD_LABEL);

      login.mockResolvedValue({
        success: false,
        message: {
          message: LOGIN_API_GENERIC_ERROR_MESSAGE,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });

      fireEvent.change(emailInput, { target: { value: "abc@def.com" } });
      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.submit(getByText(LOGIN_SUBMIT_BUTTON));

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(LOGIN_API_GENERIC_ERROR_MESSAGE);
      });
    });
  });

  describe("View", () => {
    it("Given a LoginView, when the forgot password link is clicked, then the appropriate message should be displayed.", async () => {
      const { getByText } = render(<LoginView />);
      const forgotPasswordLink = getByText(LOGIN_PAGE_FORGOT_PASSWORD_LINK);

      fireEvent.click(forgotPasswordLink);

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(LOGIN_PAGE_FORGOT_PASSWORD_MESSAGE);
      });
    });
  });

  describe("Password", () => {
    it("Given a LoginView, when a valid password is entered and the form is submitted, then no password error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<LoginView />);
      const passwordInput = getByLabelText(LOGIN_PASSWORD_LABEL);

      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.submit(getByText(LOGIN_SUBMIT_BUTTON));

      await waitFor(() => {
        let errorMessage = queryByText(LOGIN_PASSWORD_LENGTH_ERROR);
        expect(errorMessage).toBeNull();
      });
    });

    it("Given a LoginView, when a too short password is entered and the form is submitted, then a password error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<LoginView />);
      const passwordInput = getByLabelText(LOGIN_PASSWORD_LABEL);

      fireEvent.change(passwordInput, { target: { value: "passwor" } });
      fireEvent.submit(getByText(LOGIN_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(LOGIN_PASSWORD_LENGTH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("Given a LoginView, when a too long password is entered and the form is submitted, then a password error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<LoginView />);
      const passwordInput = getByLabelText(LOGIN_PASSWORD_LABEL);

      fireEvent.change(passwordInput, {
        target: { value: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordp" },
      });
      fireEvent.submit(getByText(LOGIN_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(LOGIN_PASSWORD_LENGTH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe("Email", () => {
    it("Given a LoginView, when a valid email is entered and the form is submitted, then no email error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<LoginView />);
      const emailInput = getByLabelText(LOGIN_EMAIL_LABEL);

      fireEvent.change(emailInput, { target: { value: "abc@def.com" } });
      fireEvent.submit(getByText(LOGIN_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(LOGIN_EMAIL_FORMAT_ERROR);
        expect(errorMessage).toBeNull();
      });
    });

    it("Given a LoginView, when an email with the wrong format is entered and the form is submitted, then an email format error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<LoginView />);
      const emailInput = getByLabelText(LOGIN_EMAIL_LABEL);

      fireEvent.change(emailInput, { target: { value: "abc@def" } });
      fireEvent.submit(getByText(LOGIN_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(LOGIN_EMAIL_FORMAT_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
