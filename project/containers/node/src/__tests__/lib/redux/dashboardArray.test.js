import "@testing-library/jest-dom";
import reducer, { addDashboard, removeDashboard, clearDashboards } from "@/redux/dashboardArray";
import { afterEach } from "node:test";

const testDashboard = {
  id: "1",
};

const testDashboard2 = {
  id: "2",
};

afterEach(() => {});

describe("Dashboard reducers", () => {
  it("Should return the initial state.", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ dashboardArray: [] });
  });

  it("Should handle adding a dashboard to the empty state.", async () => {
    const previousState = { dashboardArray: [] };

    expect(reducer(previousState, addDashboard(testDashboard))).toEqual({
      dashboardArray: [testDashboard],
    });
  });

  it("Should handle adding a second dashboard in the state.", async () => {
    const previousState = { dashboardArray: [testDashboard] };

    expect(reducer(previousState, addDashboard(testDashboard2))).toEqual({
      dashboardArray: [testDashboard, testDashboard2],
    });
  });

  it("Should handle removing a non-existing dashboard in an empty state.", async () => {
    const previousState = { dashboardArray: [] };

    expect(reducer(previousState, removeDashboard(testDashboard.id))).toEqual({
      dashboardArray: [],
    });
  });

  it("Should handle removing a dashboard in a state with only one dashboard.", async () => {
    const previousState = { dashboardArray: [testDashboard] };

    expect(reducer(previousState, removeDashboard(testDashboard.id))).toEqual({
      dashboardArray: [],
    });
  });

  it("Should handle removing a dashboard in a state with multiple dashboards.", async () => {
    const previousState = { dashboardArray: [testDashboard, testDashboard2] };

    expect(reducer(previousState, removeDashboard(testDashboard.id))).toEqual({
      dashboardArray: [testDashboard2],
    });
  });

  it("Should handle removing dashboards in a state with multiple similar dashboards.", async () => {
    const previousState = { dashboardArray: [testDashboard, testDashboard] };

    expect(reducer(previousState, removeDashboard(testDashboard.id))).toEqual({
      dashboardArray: [],
    });
  });

  it("Should handle clearing an empty state.", async () => {
    const previousState = { dashboardArray: [] };

    expect(reducer(previousState, clearDashboards())).toEqual({
      dashboardArray: [],
    });
  });

  it("Should handle clearing a non-empty state.", async () => {
    const previousState = { dashboardArray: [testDashboard, testDashboard2] };

    expect(reducer(previousState, clearDashboards())).toEqual({
      dashboardArray: [],
    });
  });
});
