import { createSlice } from "@reduxjs/toolkit";

export interface pageState {
  page: number;
}

const initialState: pageState = {
  page: 1,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
