import { createSlice } from "@reduxjs/toolkit";

export interface content {
  name: string;
  areaCode: string;
  firstImage: string;
  contentId: string;
  isBookmark: boolean;
}

export interface placeState {
  contents: content[];
  totalPages: number;
  totalElements: number;
}

const initialState: placeState = {
  contents: [],
  totalPages: 0,
  totalElements: 0,
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setPlace: (state, action) => {
      state.contents = action.payload.content;
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
    },
  },
});

export const { setPlace } = placeSlice.actions;
export default placeSlice.reducer;
