import { getCourseListApi } from "@/src/services/courseService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "../../interfaces/Course.type";

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
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
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
  },
});

export const {} = CourseSlice.actions;
export default CourseSlice.reducer;
