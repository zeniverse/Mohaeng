import { createSlice } from "@reduxjs/toolkit";

export interface ReviewData {
  reviewId: number;
  nickname: string;
  memberImage: string;
  rating: string;
  content: string;
  createdDate: string;
  imgUrl: string[];
}

export interface ReviewState {
  reviews: ReviewData[];
  totalPages: number;
  totalElements: number;
  averageRating: number;
}

const initialState: ReviewState = {
  reviews: [],
  totalPages: 0,
  totalElements: 0,
  averageRating: 0,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload.reviews;
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
      state.averageRating = action.payload.averageRating;
    },
  },
});

export const { setReview } = reviewSlice.actions;
export default reviewSlice.reducer;
