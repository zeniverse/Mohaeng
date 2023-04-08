import axios from "axios";
import { ICourse, ICourseSubmitForm } from "../interfaces/Course.type";
import ApiConfig from "./ApiConfig";
import cookie from "react-cookies";

const accessToken = cookie.load("accessToken");

export const getCourseListApi = async (queryParams = {}) => {
  return axios.get(ApiConfig.course, {
    params: queryParams,
    headers: {
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};

export const createCourseApi = async (data: ICourseSubmitForm) => {
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
