import cookie from "react-cookies";
import axios from "axios";
import CourseApiConfig from "./ApiConfig";

export const getCourseDetailApi = async (courseId: number) => {
  const accessToken = await cookie.load("accessToken");
  return axios(`${CourseApiConfig.course}/${courseId}`, {
    headers: {
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};
