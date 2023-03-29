// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import courseDetail from "../api/JSON/courseDetail.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const courseRes = courseDetail.find(
    (course) => `${course.courseId}` === (id as string | number)
  );
  if (!courseRes) {
    return res.status(404).end("Course id not found");
  }

  res.status(200).json(courseRes);
}
