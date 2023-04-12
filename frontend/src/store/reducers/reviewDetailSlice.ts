import { createSlice } from "@reduxjs/toolkit";

export interface ReviewDetail {
  reviewId: number;
  nickname: string;
  content: string;
  likeCount: number;
  rating: string;
  createdDate: string;
  imageUrls: string[];
}

export interface ReviewDetailState {
  reviewId: number;
  nickname: string;
  content: string;
  likeCount: number;
  rating: string;
  createdDate: string;
  imageUrls: string[];
}

const initialState: ReviewDetailState = {
  reviewId: 0,
  nickname: "",
  content: "",
  likeCount: 0,
  rating: "",
  createdDate: "",
  imageUrls: [],
};

export const reviewDetailSlice = createSlice({
  name: "reviewDetail",
  initialState,
  reducers: {
    setReviewDetail: (state, action) => {
      state.reviewId = action.payload.rating;
      state.nickname = action.payload.nickname;
      state.content = action.payload.content;
      state.likeCount = action.payload.likeCount;
      state.rating = action.payload.rating;
      state.createdDate = action.payload.createdDate;
      state.imageUrls = action.payload.imageUrls;
    },
  },
});

export const { setReviewDetail } = reviewDetailSlice.actions;
export default reviewDetailSlice.reducer;
