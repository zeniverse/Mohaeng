import { createSlice } from "@reduxjs/toolkit";

export interface LoginState {
  // isLoading: string;
  // isLoggedin: boolean;

  id: number;
  token: string;
  nickName: string;
  email: string;
  imgUrl: string;
}

const initialState: LoginState = {
  // isLoading: "loading",
  // isLoggedin: false,
  id: 0,
  token: "",
  nickName: "",
  email: "",
  imgUrl: "",
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
    setImgUrl: (state, action) => {
      state.imgUrl = action.payload;
    },
  },
});

export const { setToken, setNickname, setEmail, setId, setImgUrl } =
  logintokenSlice.actions;
export default logintokenSlice.reducer;
