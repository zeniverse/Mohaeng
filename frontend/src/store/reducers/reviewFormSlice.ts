import { createSlice } from "@reduxjs/toolkit";

export interface formData {
  rating: string;
  content: string;
  imgUrl: string[];
}

export interface formDataState {
  rating: string;
  content: string;
  imgUrl: string[];
}

const initialState: formDataState = {
  rating: "",
  content: "",
  imgUrl: [],
};

export const reviewFormSlice = createSlice({
  name: "reviewForm",
  initialState,
  reducers: {
    setReviewForm: (state, action) => {
      state.rating = action.payload.rating;
      state.content = action.payload.content;
      state.imgUrl = action.payload.imgUrl;
    },
  },
});

export const { setReviewForm } = reviewFormSlice.actions;
export default reviewFormSlice.reducer;
