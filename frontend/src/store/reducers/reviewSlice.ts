import { createSlice } from "@reduxjs/toolkit";

export interface data {
  memberName: string;
  memberImage: string;
  rating: string;
  content: string;
  imgUrl: [];
}

export interface ReviewState {
  reviews: data[];
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
