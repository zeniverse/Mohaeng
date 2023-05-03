import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  removeCourseApi,
  getCourseListApi,
  toggleBookmarkApi,
  toggleLikeApi,
  createCourseApi,
  editCourseApi,
} from "@/src/services/courseService";
import { ToggleLikeApiResponse } from "../reducers/courseListSlice";
import { RootState } from "../store";
import { getCourseDetailApi } from "@/src/services/courseDetailService";
import {
  ICourseEditParam,
  ICourseOriginForm,
  ICourseSubmitForm,
} from "@/src/interfaces/Course.type";

interface ILikeToggleParams {
  courseId: number;
  isLiked: boolean;
  isDetailPage?: boolean;
}
interface IBookmarkToggleParams {
  courseId: number;
  isBookmarked: boolean;
  isDetailPage?: boolean;
}

export const getCourseListAction = createAsyncThunk(
  "course/getCourseListAction",
  async (queryParams: any, { rejectWithValue }) => {
    try {
      const response = await getCourseListApi(queryParams);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeCourseAction = createAsyncThunk(
  "course/removeCourseAction",
  async (courseId: number, { rejectWithValue }) => {
    try {
      await removeCourseApi(courseId);
      return courseId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeToggleAction = createAsyncThunk(
  "course/ToggleLike",
  async ({ courseId, isLiked, isDetailPage }: ILikeToggleParams) => {
    let resData: ToggleLikeApiResponse;
    if (isLiked) {
      resData = await toggleLikeApi(courseId, "DELETE");
    } else {
      resData = await toggleLikeApi(courseId, "POST");
    }
    return { ...resData, isDetailPage };
  }
);

export const bookmarkToggleAction = createAsyncThunk(
  "course/toggleBookmark",
  async ({ courseId, isBookmarked, isDetailPage }: IBookmarkToggleParams) => {
    if (isBookmarked) {
      await toggleBookmarkApi(courseId, "DELETE");
    } else {
      await toggleBookmarkApi(courseId, "POST");
    }
    return { courseId, isDetailPage };
  }
);

export const getCourseDetailAction = createAsyncThunk(
  "course/getCourseDetailAction",
  async (courseId: number, { rejectWithValue }) => {
    try {
      const response = await getCourseDetailApi(courseId);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

async function validateCourseData(
  params: ICourseOriginForm
): Promise<ICourseSubmitForm> {
  const { places, ...rest } = params;
  const validPlace = places.find((place) => place.imgUrl.trim() !== "");
  const thumbnailUrl = validPlace?.imgUrl ?? "";
  const extractedPlaceIds = places.map((place) => place.placeId);

  return {
    ...rest,
    placeIds: extractedPlaceIds,
    thumbnailUrl,
  };
}
export const createCourseAction = createAsyncThunk(
  "course/createCourseAction",
  async (formData: ICourseOriginForm, { rejectWithValue }) => {
    try {
      const validData = await validateCourseData(formData);

      const resData = await createCourseApi(validData);
      return { formData, resData };
    } catch (error) {
      return rejectWithValue("코스를 생성하는 데에 실패했습니다.");
    }
  }
);

export const editCourseAction = createAsyncThunk(
  "course/editCourseAction",
  async ({ formData, courseId }: ICourseEditParam, { rejectWithValue }) => {
    try {
      const validData = await validateCourseData(formData);
      await editCourseApi(courseId, validData);
      return formData;
    } catch (error) {
      return rejectWithValue("코스를 수정하는 데에 실패했습니다.");
    }
  }
);
