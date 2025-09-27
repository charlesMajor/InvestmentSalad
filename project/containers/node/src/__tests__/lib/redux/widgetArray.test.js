import "@testing-library/jest-dom";
import reducer, {
  addWidget,
  removeWidget,
  modifyWidget,
  clearWidgets,
  clearWidgetsForDashboard,
} from "@/redux/widgetArray";
import { afterEach } from "node:test";

const testWidget = {
  name: "Test widget",
  posX: 0,
  posY: 0,
  width: 0,
  height: 0,
  widgetType: "DISTRIBUTION",
  tags: [],
  id: "1",
  dashboardId: "1",
};

const testWidget2 = {
  name: "Test widget 2",
  posX: 0,
  posY: 0,
  width: 0,
  height: 0,
  widgetType: "DISTRIBUTION",
  tags: [],
  id: "2",
  dashboardId: "2",
};

const testWidgetChange = {
  name: "Test widget changed",
  posX: 0,
  posY: 0,
  width: 0,
  height: 0,
  widgetType: "DISTRIBUTION",
  tags: [],
  id: "1",
  dashboardId: "1",
};

const testWidgetChangeFake = {
  name: "Test widget change not existing",
  posX: 0,
  posY: 0,
  width: 0,
  height: 0,
  widgetType: "DISTRIBUTION",
  tags: [],
  id: "3",
  dashboardId: "1",
};

afterEach(() => {});

describe("Widget reducers", () => {
  it("Should return the initial state.", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ widgetArray: [] });
  });

  it("Should handle adding a widget to the empty state.", async () => {
    const previousState = { widgetArray: [] };

    expect(reducer(previousState, addWidget(testWidget))).toEqual({
      widgetArray: [testWidget],
    });
  });

  it("Should handle adding a second widget in the state.", async () => {
    const previousState = { widgetArray: [testWidget] };

    expect(reducer(previousState, addWidget(testWidget2))).toEqual({
      widgetArray: [testWidget, testWidget2],
    });
  });

  it("Should handle removing a non-existing widget in an empty state.", async () => {
    const previousState = { widgetArray: [] };

    expect(reducer(previousState, removeWidget(testWidget.id))).toEqual({
      widgetArray: [],
    });
  });

  it("Should handle removing a widget in a state with only one widget.", async () => {
    const previousState = { widgetArray: [testWidget] };

    expect(reducer(previousState, removeWidget(testWidget.id))).toEqual({
      widgetArray: [],
    });
  });

  it("Should handle removing a widget in a state with multiple widgets.", async () => {
    const previousState = { widgetArray: [testWidget, testWidget2] };

    expect(reducer(previousState, removeWidget(testWidget.id))).toEqual({
      widgetArray: [testWidget2],
    });
  });

  it("Should handle removing widgets in a state with multiple similar widgets.", async () => {
    const previousState = { widgetArray: [testWidget, testWidget] };

    expect(reducer(previousState, removeWidget(testWidget.id))).toEqual({
      widgetArray: [],
    });
  });

  it("Should handle clearing a non existing dashboard.", async () => {
    const previousState = { widgetArray: [testWidget, testWidget2] };

    expect(reducer(previousState, clearWidgetsForDashboard("3"))).toEqual({
      widgetArray: [testWidget, testWidget2],
    });
  });

  it("Should handle clearing an existing dashboard.", async () => {
    const previousState = { widgetArray: [testWidget, testWidget2] };

    expect(reducer(previousState, clearWidgetsForDashboard("2"))).toEqual({
      widgetArray: [testWidget],
    });
  });

  it("Should handle updating a non existing widget.", async () => {
    const previousState = { widgetArray: [testWidget, testWidget2] };

    expect(reducer(previousState, modifyWidget(testWidgetChangeFake))).toEqual({
      widgetArray: [testWidget, testWidget2],
    });
  });

  it("Should handle updating a widget.", async () => {
    const previousState = { widgetArray: [testWidget, testWidget2] };

    expect(reducer(previousState, modifyWidget(testWidgetChange))).toEqual({
      widgetArray: [testWidgetChange, testWidget2],
    });
  });

  it("Should handle clearing an empty state.", async () => {
    const previousState = { widgetArray: [] };

    expect(reducer(previousState, clearWidgets())).toEqual({
      widgetArray: [],
    });
  });

  it("Should handle clearing a non empty state.", async () => {
    const previousState = { widgetArray: [testWidget, testWidget2] };

    expect(reducer(previousState, clearWidgets())).toEqual({
      widgetArray: [],
    });
  });
});
