import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface bookmarkCourse {
  bookMarkId: number;
  courseId: number;
  courseTitle: string;
  region: string;
  content: string;
  courseStatus: string;
  createdDate: string;
  modifiedDate: string;
}

export interface bookmarkCourseState {
  data: bookmarkCourse[];
}

const initialState: bookmarkCourseState = {
  data: [],
};

export const getCourseBookmark = createAsyncThunk(
  "mypage/coursebookmark",
  async (token: string) => {
    const response = await axios.get(`/api/myPage/course/bookMark`, {
      headers: {
        "Access-Token": token,
      },
      withCredentials: true,
    });
    // console.log(response);
    return response.data.data;
  }
);

export const CourseBookmarkSlice = createSlice({
  name: "courseBookmark",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourseBookmark.pending, (state) => {
      // state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(getCourseBookmark.fulfilled, (state, action) => {
      // state.createUserFormStatus = ApiStatus.success;
      state.data = action.payload;
    });
    builder.addCase(getCourseBookmark.rejected, (state) => {
      // state.createUserFormStatus = ApiStatus.error;
    });
  },
});

export default CourseBookmarkSlice.reducer;
