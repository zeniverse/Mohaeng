import { CourseDetailType } from "@/src/interfaces/Course";
import {
  getCourseListApi,
  toggleBookmarkApi,
} from "@/src/services/courseService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICoursePlaceName } from "../../interfaces/Course.type";
import { RootState } from "../store";
import { createCourseAction } from "./CourseFormSlice";

interface CourseState {
  error?: string;
  courseList: ICoursePlaceName[];
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
    const isBookmarked = course ? course.isBookmarked : false;
    if (isBookmarked) {
      await toggleBookmarkApi(courseId, "DELETE");
      console.log("북마크 제거");
    } else {
      await toggleBookmarkApi(courseId, "POST");
      console.log("북마크 추가");
    }
    return courseId;
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
      const placeNames = formData.places.map((place) => ({ name: place.name }));
      const createdCourse: ICoursePlaceName = {
        id: parseInt(resData.courseId),
        ...formData,
        places: placeNames,
      };
      state.courseList.push(createdCourse);
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
      const courseId = action.payload;
      const course = state.courseList.find((c) => c.id === courseId);
      if (course) {
        course.isBookmarked = !course.isBookmarked;
      }
    });
    builder.addCase(toggleBookmarkAction.rejected, (state) => {});
  },
});

export const { addCourseToList } = CourseListSlice.actions;
export default CourseListSlice.reducer;
