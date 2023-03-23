import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  id: number;
  token: string;
  nickName: string;
  email: string;
}

const initialState: LoginState = {
  token: "",
  nickName: "",
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
      state.nickName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setToken, setNickname, setEmail, setId } =
  logintokenSlice.actions;
export default logintokenSlice.reducer;
