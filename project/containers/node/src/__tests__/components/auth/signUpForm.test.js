import { toast } from "sonner";
import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import { HttpStatusCode } from "axios";
import SignUpView from "@/app/signup/page";
import { signUp } from "@/lib/services/authService";
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

const SIGN_UP_USERNAME_LABEL = "SIGN_UP_USERNAME_LABEL";
const SIGN_UP_EMAIL_LABEL = "SIGN_UP_EMAIL_LABEL";
const SIGN_UP_PASSWORD_LABEL = "SIGN_UP_PASSWORD_LABEL";
const SIGN_UP_PASSWORD_CONFIRM_LABEL = "SIGN_UP_PASSWORD_CONFIRM_LABEL";

const SIGN_UP_USERNAME_LENGTH_ERROR = "SIGN_UP_USERNAME_LENGTH";
const SIGN_UP_USERNAME_FORMAT_ERROR = "SIGN_UP_USERNAME_FORMAT";
const SIGN_UP_EMAIL_FORMAT_ERROR = "SIGN_UP_EMAIL_FORMAT";
const SIGN_UP_PASSWORD_LENGTH_ERROR = "SIGN_UP_PASSWORD_LENGTH";
const SIGN_UP_PASSWORD_CHAR_TYPES_ERROR = "SIGN_UP_PASSWORD_CHAR_TYPES";
const SIGN_UP_PASSWORD_MISMATCH_ERROR = "SIGN_UP_PASSWORD_MISMATCH";

const SIGN_UP_SUBMIT_BUTTON = "SIGN_UP_SUBMIT_BUTTON";

const SIGN_UP_API_SUCCESS_MESSAGE = "SIGN_UP_API_SUCCESS";
const SIGN_UP_API_GENERIC_ERROR_MESSAGE = "SIGN_UP_API_GENERIC_ERROR";

describe("SignUpView", () => {
  describe("Valid submit", () => {
    it("Given a SignUpView, when all input fields are valid and the form is submitted, then a success message should be displayed.", async () => {
      const { getByText, getByLabelText } = render(<SignUpView />);
      const usernameInput = getByLabelText(SIGN_UP_USERNAME_LABEL);
      const emailInput = getByLabelText(SIGN_UP_EMAIL_LABEL);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);
      const passwordConfirmationInput = getByLabelText(SIGN_UP_PASSWORD_CONFIRM_LABEL);

      signUp.mockResolvedValue({ success: true });

      fireEvent.change(usernameInput, { target: { value: "valid_Username123" } });
      fireEvent.change(emailInput, { target: { value: "abc@def.com" } });
      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.change(passwordConfirmationInput, { target: { value: "StrongPassword123!" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(SIGN_UP_API_SUCCESS_MESSAGE);
      });
    });

    it("Given a SignUpView, when the form is submitted with valid inputs but encounters an API error, then the appropriate error message should be displayed.", async () => {
      const { getByText, getByLabelText } = render(<SignUpView />);
      const usernameInput = getByLabelText(SIGN_UP_USERNAME_LABEL);
      const emailInput = getByLabelText(SIGN_UP_EMAIL_LABEL);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);
      const passwordConfirmationInput = getByLabelText(SIGN_UP_PASSWORD_CONFIRM_LABEL);

      signUp.mockResolvedValue({
        success: false,
        message: {
          message: "SIGN_UP_API_GENERIC_ERROR",
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });

      fireEvent.change(usernameInput, { target: { value: "valid_Username123" } });
      fireEvent.change(emailInput, { target: { value: "abc@def.com" } });
      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.change(passwordConfirmationInput, { target: { value: "StrongPassword123!" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        expect(toast).toHaveBeenCalledWith(SIGN_UP_API_GENERIC_ERROR_MESSAGE);
      });
    });
  });

  describe("Username", () => {
    it("Given a SignUpView, when a valid username is entered and the form is submitted, then no username error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const usernameInput = getByLabelText(SIGN_UP_USERNAME_LABEL);

      fireEvent.change(usernameInput, { target: { value: "valid_Username123" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_USERNAME_FORMAT_ERROR);
        expect(errorMessage).toBeNull();
      });
    });

    it("Given a SignUpView, when a too short username is entered and the form is submitted, then a username format error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const usernameInput = getByLabelText(SIGN_UP_USERNAME_LABEL);

      fireEvent.change(usernameInput, { target: { value: "us" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_USERNAME_LENGTH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("Given a SignUpView, when a too long username is entered and the form is submitted, then a username format error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const usernameInput = getByLabelText(SIGN_UP_USERNAME_LABEL);

      fireEvent.change(usernameInput, { target: { value: "usernameusernameusernameusernameu" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_USERNAME_LENGTH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("Given a SignUpView, when a username with unauthorized characters is entered and the form is submitted, then a username format error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const usernameInput = getByLabelText(SIGN_UP_USERNAME_LABEL);

      fireEvent.change(usernameInput, { target: { value: "username!/@" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_USERNAME_FORMAT_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe("Email", () => {
    it("Given a SignUpView, when a valid email is entered and the form is submitted, then no email error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const emailInput = getByLabelText(SIGN_UP_EMAIL_LABEL);

      fireEvent.change(emailInput, { target: { value: "abc@def.com" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_EMAIL_FORMAT_ERROR);
        expect(errorMessage).toBeNull();
      });
    });

    it("Given a SignUpView, when an email with the wrong format is entered and the form is submitted, then an email format error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const emailInput = getByLabelText(SIGN_UP_EMAIL_LABEL);

      fireEvent.change(emailInput, { target: { value: "abc@def" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_EMAIL_FORMAT_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe("Password", () => {
    it("Given a SignUpView, when a valid password is entered and the form is submitted, then no password error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);

      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        let errorMessage = queryByText(SIGN_UP_PASSWORD_LENGTH_ERROR);
        expect(errorMessage).toBeNull();

        errorMessage = queryByText(SIGN_UP_PASSWORD_CHAR_TYPES_ERROR);
        expect(errorMessage).toBeNull();
      });
    });

    it("Given a SignUpView, when a too short password is entered and the form is submitted, then a password error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);

      fireEvent.change(passwordInput, { target: { value: "passwor" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_PASSWORD_LENGTH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("Given a SignUpView, when a too long password is entered and the form is submitted, then a password error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);

      fireEvent.change(passwordInput, {
        target: { value: "passwordpasswordpasswordpasswordpasswordpasswordpasswordpasswordp" },
      });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_PASSWORD_LENGTH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("Given a SignUpView, when a password with one character type is entered and the form is submitted, then a password error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);

      fireEvent.change(passwordInput, { target: { value: "weakpassword" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_PASSWORD_CHAR_TYPES_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });

  describe("Password confirmation", () => {
    it("Given a SignUpView, when a valid password and its confirmation are entered, and the form is submitted, then no password mismatch error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);
      const passwordConfirmationInput = getByLabelText(SIGN_UP_PASSWORD_CONFIRM_LABEL);

      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.change(passwordConfirmationInput, { target: { value: "StrongPassword123!" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_PASSWORD_MISMATCH_ERROR);
        expect(errorMessage).toBeNull();
      });
    });

    it("Given a SignUpView, when the password is empty and the form is submitted, then no password mismatch error message should be displayed for confirmation.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);

      fireEvent.change(passwordInput, { target: { value: "" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_PASSWORD_MISMATCH_ERROR);
        expect(errorMessage).toBeNull();
      });
    });

    it("Given a SignUpView, when a password is entered and its confirmation is empty, and the form is submitted, then a password mismatch error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);
      const passwordConfirmationInput = getByLabelText(SIGN_UP_PASSWORD_CONFIRM_LABEL);

      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.change(passwordConfirmationInput, { target: { value: "" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_PASSWORD_MISMATCH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });

    it("Given a SignUpView, when a password is entered and its confirmation does not match, and the form is submitted, then a password mismatch error message should be displayed.", async () => {
      const { getByText, getByLabelText, queryByText } = render(<SignUpView />);
      const passwordInput = getByLabelText(SIGN_UP_PASSWORD_LABEL);
      const passwordConfirmationInput = getByLabelText(SIGN_UP_PASSWORD_CONFIRM_LABEL);

      fireEvent.change(passwordInput, { target: { value: "StrongPassword123!" } });
      fireEvent.change(passwordConfirmationInput, { target: { value: "StrongPassword123" } });
      fireEvent.submit(getByText(SIGN_UP_SUBMIT_BUTTON));

      await waitFor(() => {
        const errorMessage = queryByText(SIGN_UP_PASSWORD_MISMATCH_ERROR);
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
