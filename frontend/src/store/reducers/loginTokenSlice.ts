import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  // isLoading: string;
  // isLoggedin: boolean;

  id: number;
  token: string;
  nickName: string;
  email: string;
  profileUrl: string;
}

const initialState: LoginState = {
  // isLoading: "loading",
  // isLoggedin: false,
  id: 0,
  token: "",
  nickName: "",
  email: "",
  profileUrl: "",
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
    setProfileUrl: (state, action) => {
      state.profileUrl = action.payload;
    },
  },
});

export const { setToken, setNickname, setEmail, setId, setProfileUrl } =
  logintokenSlice.actions;
export default logintokenSlice.reducer;
