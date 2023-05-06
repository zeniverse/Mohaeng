import axios from "axios";
import { ICourseSubmitForm } from "../interfaces/Course.type";
import CourseApiConfig from "./ApiConfig";
import cookie from "react-cookies";

const accessToken = cookie.load("accessToken");

export const getCourseListApi = async (queryParams = {}) => {
  return axios.get(CourseApiConfig.course, {
    params: queryParams,
    headers: {
      "Cache-Control": "no-cache",
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};

export const createCourseApi = async (data: ICourseSubmitForm) => {
  try {
    const response = await axios.post(CourseApiConfig.course, data, {
      headers: {
        "Access-Token": accessToken,
        withCredentials: true,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCourseApi = async (
  courseId: number,
  data: ICourseSubmitForm
) => {
  return await axios.put(`${CourseApiConfig.course}/${courseId}`, data, {
    headers: {
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};

export const removeCourseApi = async (courseId: number) => {
  try {
    const config = {
      headers: {
        "Access-Token": accessToken,
        withCredentials: true,
      },
    };
    const response = await axios.delete(
      `${CourseApiConfig.course}/${courseId}`,
      config
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
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
    const response = await axios(
      `${CourseApiConfig.bookmark}/${courseId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const toggleLikeApi = async (
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
    const response = await axios(`${CourseApiConfig.like}/${courseId}`, config);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
