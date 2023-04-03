import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "searchTab",
  initialState: { name: "여행지" },
  reducers: {
    setActiveTab: (state, action) => {
      const { name } = action.payload;
      state.name = name;
    },
  },
});

export const { setActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
