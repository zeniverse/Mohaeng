import { createSlice } from "@reduxjs/toolkit";

export interface data {
  reviewId: number;
  nickname: string;
  memberImage: string;
  rating: string;
  content: string;
  createdDate: string;
  imgUrl: string[];
}

export interface ReviewState {
  data: data[];
  totalPages: number;
  totalElements: number;
}

const initialState: ReviewState = {
  data: [],
  totalPages: 0,
  totalElements: 0,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.data = action.payload.review;
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
    },
  },
});

export const { setReview } = reviewSlice.actions;
export default reviewSlice.reducer;
