import axios from "axios";
import { ICourse, ICourseSubmitForm } from "../interfaces/Course.type";
import ApiConfig from "./ApiConfig";
import cookie from "react-cookies";

export const getCourseListApi = async (queryParams = {}) => {
  const accessToken = await cookie.load("accessToken");
  console.log(queryParams);
  return axios.get(ApiConfig.course, {
    params: queryParams,
    headers: {
      "Cache-Control": "no-cache",
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};

export const createCourseApi = async (data: ICourseSubmitForm) => {
  const accessToken = await cookie.load("accessToken");
  return await axios.post(ApiConfig.course, data, {
    headers: {
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};
export const toggleBookmarkApi = async (
  courseId: number,
  method: "POST" | "DELETE"
) => {
  const accessToken = await cookie.load("accessToken");
  try {
    const config = {
      method: method,
      data: {},
      headers: {
        "Access-Token": accessToken,
        withCredentials: true,
      },
    };
    const response = await axios(`${ApiConfig.Cbookmark}/${courseId}`, config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
