import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetchUser = createAsyncThunk("token/fetchUser", async () => {
//   try {
//     const accessToken = localStorage.getItem("accessToken");
//     const res = await axios.get(`http://219.255.1.253:8080/loginInfo`, {
//       headers: {
//         "Access-Token": `${accessToken}`,
//       },
//     });
//     console.log(res);
//     return {
//       id: res.data.id,
//       nickName: res.data.nickName,
//       email: res.data.email,
//     };
//   } catch (err) {
//     return console.log(err);
//   }
// });

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
  // extraReducers: (builder) => {
  //   builder.addCase(fetchUser.pending, (state) => {
  //     state.isLoading = "loading";
  //   });
  //   builder.addCase(fetchUser.fulfilled, (state, action) => {
  //     state.id = action.payload.id;
  //     state.nickName = action.payload.nickName;
  //     state.email = action.payload.email;
  //     state.isLoggedin = true;
  //   });
  //   builder.addCase(fetchUser.rejected, (state) => {
  //     state.isLoading = "fail";
  //   });
  // },
});

export const { setToken, setNickname, setEmail, setId, setProfileUrl } =
  logintokenSlice.actions;
export default logintokenSlice.reducer;
