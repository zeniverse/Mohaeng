import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://http://localhost:3000",
  withCredentials: true,
});
// 나중에 주소 변경
