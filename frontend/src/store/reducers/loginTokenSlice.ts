import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  id: number;
  token: string;
  nickname: string;
  email: string;
}

const initialState: LoginState = {
  token: "",
  nickname: "",
  email: "",
  id: 0,
};

export const logintokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setIdx: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setToken, setNickname, setEmail, setIdx } =
  logintokenSlice.actions;
export default logintokenSlice.reducer;
