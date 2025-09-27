import "@testing-library/jest-dom";
import { afterEach } from "node:test";
import axios, { HttpStatusCode } from "axios";
import { cleanup } from "@testing-library/react";
import { createTag, getAllTags } from "@/lib/services/tagService";

jest.mock("axios");
jest.mock("@/lib/managers/tokenManager");

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const TAG_ID = "5c0f3798-cdcb-45d0-a6bd-c3cc12090bca";
const TAG_NAME = "tagName";
const TAG_COLOR = "FAEDCB";

const LOG_OUT_API_ERROR = "LOG_OUT_API_ERROR";

const ADD_TAG_ALREADY_EXIST_ERROR = "ADD_TAG_ALREADY_EXIST";
const ADD_TAG_API_GENERIC_ERROR = "ADD_TAG_API_GENERIC_ERROR";

const GET_ALL_TAGS_API_GENERIC_ERROR = "GET_ALL_TAGS_API_GENERIC_ERROR";

describe("TagService", () => {
  describe("CreateTag", () => {
    it("Given a valid CreateTag request, when the API call succeeds (201), then the user should be given tag data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Created,
        data: {
          tagId: TAG_ID,
          name: TAG_NAME,
          hexColor: TAG_COLOR,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: TAG_NAME,
        hexColor: TAG_COLOR,
      };
      const result = await createTag(mockValues);

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a CreateTag request with an already existing tag, when the API returns a 422 Unprocessable Entity error, then the add tag already exist error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.UnprocessableEntity,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: TAG_NAME,
        hexColor: TAG_COLOR,
      };
      const result = await createTag(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: ADD_TAG_ALREADY_EXIST_ERROR },
      });
    });

    it("Given a CreateTag request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.post.mockRejectedValueOnce(mockResponse);

      const mockValues = {
        name: TAG_NAME,
        hexColor: TAG_COLOR,
      };
      const result = await createTag(mockValues);

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a CreateTag request encountering an unexpected error, when the API returns a status code (other than 201), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.post.mockResolvedValueOnce(mockResponse);

      const mockValues = {
        name: TAG_NAME,
        hexColor: TAG_COLOR,
      };
      const result = await createTag(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: ADD_TAG_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a CreateTag request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const mockValues = {
        name: TAG_NAME,
        hexColor: TAG_COLOR,
      };
      const result = await createTag(mockValues);

      expect(result).toEqual({
        success: false,
        message: {
          message: ADD_TAG_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });

  describe("GetAllTags", () => {
    it("Given a valid GetAllTags request, when the API call succeeds (200), then the user should be given tag data.", async () => {
      const mockResponse = {
        status: HttpStatusCode.Ok,
        data: {
          tagId: TAG_ID,
          name: TAG_NAME,
          hexColor: TAG_COLOR,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllTags();

      expect(result).toEqual({ success: true, data: mockResponse.data });
    });

    it("Given a GetAllTags request with an expired token, when the API returns a 401 Unauthorized, then the log out error message should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.Unauthorized,
        },
      };

      axios.get.mockRejectedValueOnce(mockResponse);
      const result = await getAllTags();

      expect(result).toEqual({
        success: false,
        message: { message: LOG_OUT_API_ERROR },
      });
    });

    it("Given a GetAllTags request encountering an unexpected error, when the API returns a status code (other than 200), then a generic error message along with the corresponding status code should be returned.", async () => {
      const mockResponse = {
        response: {
          status: HttpStatusCode.NotFound,
        },
      };

      axios.get.mockResolvedValueOnce(mockResponse);
      const result = await getAllTags();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_TAGS_API_GENERIC_ERROR,
          options: { statusCode: mockResponse.status },
        },
      });
    });

    it("Given a GetAllTags request with valid data, when the API throws an error, then generic api error message should be returned.", async () => {
      axios.post.mockImplementationOnce(() => {
        throw new Error("Network error");
      });

      const result = await getAllTags();

      expect(result).toEqual({
        success: false,
        message: {
          message: GET_ALL_TAGS_API_GENERIC_ERROR,
          options: { statusCode: HttpStatusCode.InternalServerError },
        },
      });
    });
  });
});
