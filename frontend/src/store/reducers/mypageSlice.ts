import { createSlice } from "@reduxjs/toolkit";

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
