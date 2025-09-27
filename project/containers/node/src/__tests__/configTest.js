import React from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";

afterAll(() => jest.clearAllMocks());

const AllTheProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export * from "@testing-library/jest-dom";

export { customRender as render };
