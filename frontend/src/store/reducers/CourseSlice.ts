import {
  getCourseListApi,
  toggleBookmarkApi,
} from "@/src/services/courseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../interfaces/Course.type";
import { RootState } from "../store";
import { createCourseAction } from "./CourseFormSlice";

interface CourseState {
  error?: string;
  courseList: ICourse[];
  totalElements?: number;
  totalPages?: number;
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
    const course = courseList.find((course) => course.id === courseId);
    const isBookMarked = course ? course.isBookMarked : false;
    if (isBookMarked) {
      await toggleBookmarkApi(courseId, "DELETE");
      console.log("북마크 제거");
    } else {
      await toggleBookmarkApi(courseId, "POST");
      console.log("북마크 추가");
    }
    return { courseId, course };
  }
);

export const CourseSlice = createSlice({
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
      const createdCourse = { id: resData.courseId, ...formData };
      CourseSlice.actions.addCourseToList(createdCourse);
    });
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
      const { courseId } = action.payload;
      const course = state.courseList.find((c) => c.id === courseId);
      if (course) {
        course.isBookMarked = !course.isBookMarked;
      }
    });
    builder.addCase(toggleBookmarkAction.rejected, (state) => {});
  },
});

export const { addCourseToList } = CourseSlice.actions;
export default CourseSlice.reducer;
