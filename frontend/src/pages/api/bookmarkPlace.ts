import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookmarkPlaceData = await require("./JSON/bookmarkPlace.json");
  res.status(200).json(bookmarkPlaceData);
}
