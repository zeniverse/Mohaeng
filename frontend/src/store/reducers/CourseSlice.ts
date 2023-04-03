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
  async (queryParams: any, { rejectWithValue }) => {
    try {
      const response = await getCourseListApi(queryParams);
      console.log(response.data);
      return response.data.data.courseList;
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
      state.list = action.payload;
    });
    builder.addCase(getCourseListAction.rejected, (state) => {});
  },
});

export const {} = CourseSlice.actions;
export default CourseSlice.reducer;
