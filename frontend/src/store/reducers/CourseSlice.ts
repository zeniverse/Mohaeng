import {
  createCourseApi,
  getCourseListApi,
} from "@/src/services/courseService";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ICourse,
  ICourseForm,
  ICourseOriginForm,
  ICourseSubmitForm,
} from "../../interfaces/Course.type";

interface CourseState {
  error?: string;
  list: ICourse[];
  // places: IPlacesForm
}

export const initialState: CourseState = {
  list: [],
};
export const getCourseListAction = createAsyncThunk(
  "course/getCourseListAction",
  async () => {
    const response = await getCourseListApi();
    console.log(response.data);
    return response.data.data.courseList;
  }
);

export const CourseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseListAction.pending, (state) => {});
    builder.addCase(getCourseListAction.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(getCourseListAction.rejected, (state) => {});
  },
});

export const {} = CourseSlice.actions;
export default CourseSlice.reducer;
