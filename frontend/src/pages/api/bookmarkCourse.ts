import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookmarkCoursedData = await require("./JSON/bookmarkCourse.json");
  res.status(200).json(bookmarkCoursedData);
}
