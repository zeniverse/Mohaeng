import {
  getCourseListApi,
  toggleBookmarkApi,
} from "@/src/services/courseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../interfaces/Course.type";
import { RootState } from "../store";

interface CourseState {
  error?: string;
  courseList: ICourse[];
  totalElements?: number;
  totalPages?: number;
  // places: IPlacesForm
}

export const initialState: CourseState = {
  courseList: [],
};
export const getCourseListAction = createAsyncThunk(
  "course/getCourseListAction",
  async (queryParams: any, { rejectWithValue }) => {
    try {
      const response = await getCourseListApi(queryParams);
      console.log(response);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const toggleBookmarkAction = createAsyncThunk(
  "course/toggleBookmark",
  async (courseId: number, { getState }) => {
    const courseState = (await getState()) as RootState;
    const courseList = courseState.course.courseList;
    const index = courseList.findIndex((course) => course.id === courseId);
    const course = courseList[index];
    const isBookMarked = course ? course.isBookMarked : false;
    if (isBookMarked) {
      await toggleBookmarkApi(courseId, "DELETE");
      console.log("북마크 제거");
    } else {
      await toggleBookmarkApi(courseId, "POST");
      console.log("북마크 추가");
    }
    return index;
  }
);

export const CourseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseListAction.pending, (state) => {});
    builder.addCase(getCourseListAction.fulfilled, (state, action) => {
      const { courseList, totalElements, totalPages } = action.payload;
      state.courseList = courseList;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    });
    builder.addCase(getCourseListAction.rejected, (state) => {});
    builder.addCase(toggleBookmarkAction.pending, (state) => {});
    builder.addCase(toggleBookmarkAction.fulfilled, (state, action) => {
      const index = action.payload;
      state.courseList[index].isBookMarked =
        !state.courseList[index].isBookMarked;
    });
    builder.addCase(toggleBookmarkAction.rejected, (state) => {});
  },
});

export const {} = CourseSlice.actions;
export default CourseSlice.reducer;
