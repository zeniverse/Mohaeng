import axios from "axios";
import { ICourse, ICourseSubmitForm } from "../interfaces/Course.type";
import CourseApiConfig from "./ApiConfig";
import cookie from "react-cookies";

// * 여행지 검색
export const getPlaceListApi = async (queryParams = {}) => {
  const accessToken = await cookie.load("accessToken");
  return axios.get(`/api/place`, {
    params: queryParams,
    headers: {
      "Cache-Control": "no-cache",
      "Access-Token": accessToken,
      withCredentials: true,
    },
  });
};

// export const createCourseApi = async (data: ICourseSubmitForm) => {
//   const accessToken = await cookie.load("accessToken");
//   return await axios.post(CourseApiConfig.course, data, {
//     headers: {
//       "Access-Token": accessToken,
//       withCredentials: true,
//     },
//   });
// };

// * 북마크
export const toggleBookmarkApi = async (
  placeId: number,
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
    const response = await axios(
      `${process.env.NEXT_PUBLIC_API_URL}/api/place/bookmark/${placeId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
