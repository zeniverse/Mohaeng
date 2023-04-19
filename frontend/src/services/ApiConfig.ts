const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const CourseApiConfig = {
  course: `${baseUrl}/api/course`,
  bookmark: `${baseUrl}/api/course/bookmark`,
  like: `${baseUrl}/api/course/likes`,
};

export default CourseApiConfig;
