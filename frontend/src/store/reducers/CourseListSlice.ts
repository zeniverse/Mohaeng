import {
  removeCourseApi,
  getCourseListApi,
  toggleBookmarkApi,
  toggleLikeApi,
} from "@/src/services/courseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICoursePlaceName } from "../../interfaces/Course.type";
import { RootState } from "../store";
import { createCourseAction, editCourseAction } from "./CourseFormSlice";

interface CourseState {
  error?: string;
  courseList: ICoursePlaceName[];
  totalElements?: number;
  totalPages?: number;
}

export interface ToggleLikeApiResponse {
  courseId: number;
  totalLikes: number;
}

const initialState: CourseState = {
  courseList: [],
};
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

export const CourseListSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    addCourseToList: (state, action) => {
      state.courseList.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createCourseAction.fulfilled, (state, action) => {
      // state.createUserFormStatus = ApiStatus.success;
      const { formData, resData } = action.payload;
      const placeNames = formData.places.map((place) => place.name).join(",");
      const createdCourse: ICoursePlaceName = {
        courseId: parseInt(resData.courseId),
        ...formData,
        places: placeNames,
      };
      state.courseList.push(createdCourse);
    });
    builder.addCase(editCourseAction.fulfilled, (state, action) => {});

    builder.addCase(getCourseListAction.pending, (state) => {});
    builder.addCase(getCourseListAction.fulfilled, (state, action) => {
      const { courseList, totalElements, totalPages } = action.payload;
      state.courseList = courseList;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    });
    builder.addCase(getCourseListAction.rejected, (state) => {});
    builder.addCase(listBookmarkToggleAction.pending, (state) => {});
    builder.addCase(listBookmarkToggleAction.fulfilled, (state, action) => {
      const courseId = action.payload;
      const course = state.courseList.find((c) => c.courseId === courseId);
      if (course) {
        course.isBookmarked = !course.isBookmarked;
      }
    });
    builder.addCase(listBookmarkToggleAction.rejected, (state) => {});
    builder.addCase(listLikeToggleAction.pending, (state) => {});
    builder.addCase(listLikeToggleAction.fulfilled, (state, action) => {
      const { courseId, totalLikes } = action.payload;
      if (state.courseList.length > 0) {
        const course = state.courseList.find((c) => c.courseId === courseId);
        if (course) {
          course.isLiked = !course.isLiked;
          course.likeCount = totalLikes;
        }
      }
    });
    builder.addCase(listLikeToggleAction.rejected, (state) => {});
    builder.addCase(removeCourseAction.pending, (state) => {});
    builder.addCase(removeCourseAction.fulfilled, (state, action) => {
      const newList = state.courseList?.filter(
        (x) => x.courseId !== action.payload
      );
      state.courseList = newList;
    });
    builder.addCase(removeCourseAction.rejected, (state) => {});
  },
});

export const { addCourseToList } = CourseListSlice.actions;
export default CourseListSlice.reducer;
