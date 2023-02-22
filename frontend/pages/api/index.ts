// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data1 = await require("./data.json");
  const data2 = await require("./course.json");
  res.status(200).json({ data1, data2 });
}
