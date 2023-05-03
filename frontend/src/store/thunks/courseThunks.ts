import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  removeCourseApi,
  getCourseListApi,
  toggleBookmarkApi,
  toggleLikeApi,
} from "@/src/services/courseService";
import { ToggleLikeApiResponse } from "../reducers/courseListSlice";
import { RootState } from "../store";

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

export const listBookmarkToggleAction = createAsyncThunk(
  "course/listToggleBookmark",
  async (courseId: number, { getState }) => {
    // TODO: 개선 가능
    const courseState = (await getState()) as RootState;
    const courseList = courseState.course.courseList;
    const course = courseList.find((course) => course.courseId === courseId);
    const isBookmarked = course ? course.isBookmarked : false;
    if (isBookmarked) {
      await toggleBookmarkApi(courseId, "DELETE");
      console.log("목록 북마크 제거");
    } else {
      await toggleBookmarkApi(courseId, "POST");
      console.log("목록 북마크 추가");
    }
    return courseId;
  }
);

export const listLikeToggleAction = createAsyncThunk(
  "course/listToggleLike",
  async ({ courseId, isLiked }: any) => {
    let resData: ToggleLikeApiResponse;
    if (isLiked) {
      resData = await toggleLikeApi(courseId, "DELETE");
      console.log("목록 좋아요 해제");
    } else {
      resData = await toggleLikeApi(courseId, "POST");
      console.log("목록 좋아요 추가");
    }
    return resData;
  }
);
