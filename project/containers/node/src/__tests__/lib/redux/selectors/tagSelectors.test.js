import "@testing-library/jest-dom";
import { selectTagById, selectMultipleTagsByIds } from "@/redux/selectors/tagSelectors";

const tag1 = {
  hexColor: "000000",
  name: "tag 1",
  tagId: "1",
};

const tag2 = {
  hexColor: "000001",
  name: "tag 2",
  tagId: "2",
};

const mockState = {
  tagArray: {
    tagArray: [tag1, tag2],
  },
};

describe("tagSelectors", () => {
  test("selectTagById should return the tag with the specified id", () => {
    const selector = selectTagById("1");
    const selectedTag = selector(mockState);
    expect(selectedTag).toEqual(tag1);
  });

  test("selectTagById should return no tag if none has the id", () => {
    const selector = selectTagById("3");
    const selectedTag = selector(mockState);
    expect(selectedTag).toEqual(undefined);
  });

  test("selectMultipleTagsByIds should return the tags with the specified ids", () => {
    const selector = selectMultipleTagsByIds(["1", "2"]);
    const selectedTag = selector(mockState);
    expect(selectedTag).toEqual([tag1, tag2]);
  });

  test("selectMultipleTagsByIds should return no tag if none has the id", () => {
    const selector = selectMultipleTagsByIds(["3", "4"]);
    const selectedTag = selector(mockState);
    expect(selectedTag).toEqual([]);
  });
});
