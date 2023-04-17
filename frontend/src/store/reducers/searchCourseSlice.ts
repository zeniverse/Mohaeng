import { ICourse } from "@/src/interfaces/Course.type";
import { createSlice } from "@reduxjs/toolkit";

export interface SearchCourseState {
  courseList: ICourse[];
  totalPages: number;
  totalElements: number;
}

const initialState: SearchCourseState = {
  courseList: [],
  totalPages: 0,
  totalElements: 0,
};

export const searchCourseSlice = createSlice({
  name: "searchCourse",
  initialState,
  reducers: {
    setSearchCourse: (state, action) => {
      state.courseList = action.payload.courseList;
      state.totalPages = action.payload.totalPages;
      state.totalElements = action.payload.totalElements;
    },
  },
});

export const { setSearchCourse } = searchCourseSlice.actions;
export default searchCourseSlice.reducer;
