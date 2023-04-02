import axios from "axios";
import { ICourse, ICourseSubmitForm } from "../interfaces/Course.type";
import ApiConfig from "./ApiConfig";
import cookie from "react-cookies";

export const getCourseListData = async () => {
  const response = await axios.get("/api/course");
  console.log(response.data);
  return response.data;
};

export const createCourseApi = async (data: ICourseSubmitForm) => {
  const accessToken = await cookie.load("accessToken");
  return await axios.post<ICourse>(ApiConfig.course, data, {
    headers: {
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};
