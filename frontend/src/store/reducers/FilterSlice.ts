import { initialState } from "./CourseFormSlice";
import { Keyword } from "@/src/interfaces/Keyword";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IArea {
  region: string;
  areaCode: string;
}

interface IFilter {
  area: IArea;
  sort?: string;
  keyword?: string;
}

const initialFilterState: IFilter = {
  area: { region: "전체보기", areaCode: "all" },
  sort: "",
  keyword: "",
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    selectArea: (state, action: PayloadAction<IArea>) => {
      const { region, areaCode } = action.payload;
      state.area = { region, areaCode };
    },
    clearAll: (state) => {
      state.area = { region: "전체보기", areaCode: "all" };
      state.sort = "";
      state.keyword = "";
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    clearKeyword: (state) => {
      state.keyword = "";
    },
  },
});

export const { selectArea, setKeyword, setSort, clearKeyword } =
  FilterSlice.actions;
export default FilterSlice.reducer;
