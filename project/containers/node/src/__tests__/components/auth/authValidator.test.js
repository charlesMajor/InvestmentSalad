import { isUsernameValid, countCharacterTypes } from "@/components/auth/authValidator";

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

describe("isUsernameValid", () => {
  it("Given valid username, when isUsernameValid called, then true is returned.", () => {
    const validUsername = "userNAME_123";

    const result = isUsernameValid(validUsername);

    expect(result).toBe(true);
  });

  it("Given an empty string as username, when isUsernameValid called, then false is returned.", () => {
    const username = "";

    const result = isUsernameValid(username);

    expect(result).toBe(false);
  });

  it("Given a too short username, when isUsernameValid called, then false is returned.", () => {
    const username = "us";

    const result = isUsernameValid(username);

    expect(result).toBe(false);
  });

  it("Given a too long username, when isUsernameValid called, then false is returned.", () => {
    const username = "usernameusernameusernameusername1";

    const result = isUsernameValid(username);

    expect(result).toBe(false);
  });

  it("Given a username with invalid characters, when isUsernameValid called, then false is returned.", () => {
    const username = "username=!/$%?&&*()";

    const result = isUsernameValid(username);

    expect(result).toBe(false);
  });
});

describe("countCharacterTypes", () => {
  it("Given an empty string, when countCharacterTypes called, then 0 is returned.", () => {
    const stringToCount = "";
    const nbCharTypes = 0;

    const result = countCharacterTypes(stringToCount);

    expect(result).toBe(nbCharTypes);
  });

  it("Given a string with lowercase alphabets, when countCharacterTypes called, then 1 is returned.", () => {
    const stringToCount = "abcdefghijklmnopqrstuvwxyz";
    const nbCharTypes = 1;

    const result = countCharacterTypes(stringToCount);

    expect(result).toBe(nbCharTypes);
  });

  it("Given a string with uppercase alphabets, when countCharacterTypes called, then 1 is returned.", () => {
    const stringToCount = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nbCharTypes = 1;

    const result = countCharacterTypes(stringToCount);

    expect(result).toBe(nbCharTypes);
  });

  it("Given a string with numbers, when countCharacterTypes called, then 1 is returned.", () => {
    const stringToCount = "0123456789";
    const nbCharTypes = 1;

    const result = countCharacterTypes(stringToCount);

    expect(result).toBe(nbCharTypes);
  });

  it("Given a string with special characters, when countCharacterTypes called, then 1 is returned.", () => {
    const stringToCount = "!/$%?&*()#|:`^¨;<";
    const nbCharTypes = 1;

    const result = countCharacterTypes(stringToCount);

    expect(result).toBe(nbCharTypes);
  });

  it("Given a string with mixed characters, when countCharacterTypes called, then 4 is returned.", () => {
    const stringToCount = "abcDEF123!";
    const nbCharTypes = 4;

    const result = countCharacterTypes(stringToCount);

    expect(result).toBe(nbCharTypes);
  });
});
