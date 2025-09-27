import "@testing-library/jest-dom";
import reducer, { addTag, clearTags } from "@/redux/tagArray";
import { afterEach } from "node:test";

const testTag = {
  tagId: "1",
  name: "tag for test",
  hexColor: "000000",
};

const testTag2 = {
  tagId: "2",
  name: "tag for test 2",
  hexColor: "000000",
};

afterEach(() => {});

describe("Tag reducers", () => {
  it("Should return the initial state.", async () => {
    expect(reducer(undefined, { type: undefined })).toEqual({ tagArray: [] });
  });

  it("Should handle adding a tag to the empty state.", async () => {
    const previousState = { tagArray: [] };

    expect(reducer(previousState, addTag(testTag))).toEqual({
      tagArray: [testTag],
    });
  });

  it("Should handle adding a second tag in the state.", async () => {
    const previousState = { tagArray: [testTag] };

    expect(reducer(previousState, addTag(testTag2))).toEqual({
      tagArray: [testTag, testTag2],
    });
  });

  it("Should handle clearing an empty state.", async () => {
    const previousState = { tagArray: [] };

    expect(reducer(previousState, clearTags())).toEqual({ tagArray: [] });
  });

  it("Should handle clearing a non-empty state.", async () => {
    const previousState = { tagArray: [testTag, testTag2] };

    expect(reducer(previousState, clearTags())).toEqual({
      tagArray: [],
    });
  });
});
