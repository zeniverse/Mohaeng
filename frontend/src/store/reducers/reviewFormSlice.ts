import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface formData {
  reviewId: number;
  nickname: string;
  content: string;
  likeCount: number;
  rating: string;
  createdDate: string;
  imageUrls: string[];
}

export interface formDataState {
  reviewId: number;
  nickname: string;
  content: string;
  likeCount: number;
  rating: string;
  createdDate: string;
  imageUrls: string[];
}

const initialState: formDataState = {
  reviewId: 0,
  nickname: "",
  content: "",
  likeCount: 0,
  rating: "",
  createdDate: "",
  imageUrls: [],
};

export const reviewFormSlice = createSlice({
  name: "reviewForm",
  initialState,
  reducers: {
    setReviewForm: (state, action) => {
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

export const { setReviewForm } = reviewFormSlice.actions;
export default reviewFormSlice.reducer;
