import type { NextApiRequest, NextApiResponse } from "next";
import keyword from "../api/JSON/keyword.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const placeRes = keyword.find(
    (keyword) => "${keyword.id}" === (id as string | number) // 따옴표
  );
  if (!placeRes) {
    return res.status(404).end("Place id not found");
  }

  res.status(200).json(placeRes);
}
