import axios from "axios";
import { ICourseSubmitForm } from "../interfaces/Course.type";
import CourseApiConfig from "./ApiConfig";
import cookie from "react-cookies";

const api = axios.create({
  baseURL: CourseApiConfig.course,
  headers: {
    "Cache-Control": "no-cache",
  },
});

export const getCourseListApi = async (queryParams = {}) => {
  try {
    const accessToken = cookie.load("accessToken");
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await api.get("", {
      params: queryParams,
      headers: {
        "Access-Token": accessToken,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCourseApi = async (data: ICourseSubmitForm) => {
  const accessToken = cookie.load("accessToken");
  try {
    const response = await axios.post(CourseApiConfig.course, data, {
      headers: {
        "Access-Token": accessToken,
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
  const accessToken = cookie.load("accessToken");
  return await axios.put(`${CourseApiConfig.course}/${courseId}`, data, {
    headers: {
      "Access-Token": accessToken,
    },
  });
};

export const removeCourseApi = async (courseId: number) => {
  const accessToken = cookie.load("accessToken");
  try {
    const config = {
      headers: {
        "Access-Token": accessToken,
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
  const accessToken = cookie.load("accessToken");
  try {
    const config = {
      method: method,
      data: {},
      headers: {
        "Access-Token": accessToken,
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
  const accessToken = cookie.load("accessToken");
  try {
    const config = {
      method: method,
      data: {},
      headers: {
        "Access-Token": accessToken,
      },
    };
    const response = await axios(`${CourseApiConfig.like}/${courseId}`, config);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
