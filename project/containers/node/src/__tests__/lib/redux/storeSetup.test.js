import "@testing-library/jest-dom";
import reducer, { storeIsInitialised, storeIsNotInitialised } from "@/redux/storeSetup";
import { afterEach } from "node:test";

afterEach(() => {});

describe("Store setup reducers", () => {
  it("Should return the initial state.", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ isInitialised: false });
  });

  it("Should be true after calling the initialisation", async () => {
    const previousState = { isInitialised: false };

    expect(reducer(previousState, storeIsInitialised())).toEqual({
      isInitialised: true,
    });
  });

  it("Should be false after uninitialising it", async () => {
    const previousState = { isInitialised: true };

    expect(reducer(previousState, storeIsNotInitialised())).toEqual({
      isInitialised: false,
    });
  });
});
