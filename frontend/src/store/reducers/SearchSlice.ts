import { createSlice } from "@reduxjs/toolkit";

export interface content {
  name: string;
  firstImage: string;
  contentId: string;
}

export interface SearchPlaceState {
  contents: content[];
  totalPages: number;
  totalElements: number;
}

const initialState: SearchPlaceState = {
  contents: [],
  totalPages: 0,
  totalElements: 0,
};

const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchPlace: (state, action) => {
      state.contents = action.payload.content;
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
    },
    // setSearchCourse: (state, action) => {

    // }
  },
});

export const { setSearchPlace } = SearchSlice.actions;
export default SearchSlice.reducer;
