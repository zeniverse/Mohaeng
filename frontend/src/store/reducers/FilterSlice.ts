import { createSlice } from "@reduxjs/toolkit";

export const FilterSlice = createSlice({
  name: "filter",
  initialState: { region: "전체보기", areaCode: "all" },
  reducers: {
    selectArea: (state, action) => {
      const { region, areaCode } = action.payload;
      (state.region = region), (state.areaCode = areaCode);
    },
  },
});

export const { selectArea } = FilterSlice.actions;
export default FilterSlice.reducer;
