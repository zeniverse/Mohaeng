import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface myPlaceData {
  placeId: number;
  imagUrl: string;
  title: string;
  address: string;
  content: string;
  rating: number;
}

export interface myCourseData {
  courseId: number;
  title: string;
  imgUrl: string;
  likeCount: number;
  startDate: string;
  endDate: string;
  createdDate: string;
  courseStatus: string;
  data: myPlaceData[];
}

export interface myCourseState {
  data: myCourseData[];
}

const initialState: myCourseState = {
  data: [],
};

export const getMyCourse = createAsyncThunk(
  "mypage/myCourse",
  async (token: string) => {
    const response = await axios.get(`/api/myPage/course`, {
      headers: {
        "Access-Token": token,
      },
      withCredentials: true,
    });
    // console.log(response.data.data);
    return response.data.data;
  }
);

export const myCourseSlice = createSlice({
  name: "myCourse",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyCourse.pending, (state) => {
      // state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(getMyCourse.fulfilled, (state, action) => {
      // state.createUserFormStatus = ApiStatus.success;
      state.data = action.payload;
    });
    builder.addCase(getMyCourse.rejected, (state) => {
      // state.createUserFormStatus = ApiStatus.error;
    });
  },
});

export default myCourseSlice.reducer;
