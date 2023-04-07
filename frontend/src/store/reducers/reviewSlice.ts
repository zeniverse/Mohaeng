import { createSlice } from "@reduxjs/toolkit";

export interface reviews {
  memberName: string;
  // 프로필 url 추가
  content: string;
  imgUrl: [];
  rating: string;
  review: string;
}

export interface ReviewState {
  reviews: reviews[];
  totalPages: number;
  totalElements: number;
}

const initialState: ReviewState = {
  reviews: [],
  totalPages: 0,
  totalElements: 0,
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state.reviews = action.payload.review;
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
    },
  },
});

export const { setReview } = reviewSlice.actions;
export default reviewSlice.reducer;
