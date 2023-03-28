import axios from "axios";

export const getCourseListData = async () => {
  const response = await axios.get("/api/course");
  console.log(response.data);
  return response.data;
};
