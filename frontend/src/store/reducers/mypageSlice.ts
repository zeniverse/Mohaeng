import { createSlice } from "@reduxjs/toolkit";

export interface bookmarkPlace {
  bookMarkId: number;
  categoryId: number;
  placeId: number;
  placeName: string;
}

export interface bookmarkCourse {
  bookMarkId: number;
  courseId: number;
  courseTitle: string;
  r: string;
  content: string;
  isPublished: boolean;
  courseImgUrl: string;
  createdDate: string;
  modifiedDate: string;
}

export interface bookmarkPlaceState {
  data: bookmarkPlace[];
}

export interface bookmarkCourseState {
  data: bookmarkCourse[];
}

export interface myPageState {
  currIdx: number;
  label: string;
}
const initialState: myPageState = {
  currIdx: 0,
  label: "회원 정보",
};

export const mypageSlice = createSlice({
  name: "mypage",
  initialState,
  reducers: {
    setCurrIdx: (state, action) => {
      state.currIdx = action.payload.currIdx;
      state.label = action.payload.label;
    },
  },
});

export const { setCurrIdx } = mypageSlice.actions;
export default mypageSlice.reducer;
