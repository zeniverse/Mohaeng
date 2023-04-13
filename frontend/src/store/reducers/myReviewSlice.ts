import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface myReviewData {
  reviewId: number;
  placeId: number;
  title: string;
  content: string;
  likeCount: number;
  rating: string;
  imgUrl: string;
  createdDate: string;
}

export interface myReviewState {
  data: myReviewData[];
}

const initialState: myReviewState = {
  data: [],
};

export const getMyReview = createAsyncThunk(
  "mypage/myReview",
  async (token: string) => {
    const response = await axios.get(`/api/myPage/myReview`, {
      headers: {
        "Access-Token": token,
      },
      withCredentials: true,
    });
    console.log(response.data.data);
    return response.data.data;
  }
);

export const myReviewSlice = createSlice({
  name: "myReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyReview.pending, (state) => {
      // state.createUserFormStatus = ApiStatus.loading;
    });
    builder.addCase(getMyReview.fulfilled, (state, action) => {
      // state.createUserFormStatus = ApiStatus.success;
      state.data = action.payload;
    });
    builder.addCase(getMyReview.rejected, (state) => {
      // state.createUserFormStatus = ApiStatus.error;
    });
  },
});

export default myReviewSlice.reducer;
