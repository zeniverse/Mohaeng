import axios from "axios";
import { ICourse, ICourseSubmitForm } from "../interfaces/Course.type";
import ApiConfig from "./ApiConfig";
import cookie from "react-cookies";

export const getCourseListApi = async (queryParams = {}) => {
  return await axios.get(ApiConfig.course, { params: queryParams });
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
export const toggleBookmarkApi = async (
  courseId: number,
  method: "POST" | "DELETE"
) => {
  try {
    const accessToken = await cookie.load("accessToken");
    const config = {
      method: method,
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
