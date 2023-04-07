const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const ApiConfig = {
  course: `${baseUrl}/api/course`,
  Cbookmark: `${baseUrl}/api/course/bookmark`,
};

export default ApiConfig;
