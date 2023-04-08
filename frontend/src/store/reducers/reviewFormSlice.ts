import { createSlice } from "@reduxjs/toolkit";

export interface formData {
  rating: number;
  content: string;
  multipartFile: string[];
}

export interface formDataState {
  rating: number;
  content: string;
  multipartFile: string;
}

const initialState: formDataState = {
  rating: 0,
  content: "",
  multipartFile: "",
};

export const reviewFormSlice = createSlice({
  name: "reviewForm",
  initialState,
  reducers: {
    setReviewForm: (state, action) => {
      state.rating = action.payload.rating;
      state.content = action.payload.content;
      state.multipartFile = action.payload.multipartFile;
    },
  },
});

export const { setReviewForm } = reviewFormSlice.actions;
export default reviewFormSlice.reducer;
