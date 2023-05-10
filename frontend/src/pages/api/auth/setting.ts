import axios from "axios";
import cookie from "react-cookies";

const apiInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = cookie.load("accessToken");
    if (accessToken) {
      config.headers["Access-Token"] = `${accessToken}`;
      config.headers["Cache-Control"] = "no-cache";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
