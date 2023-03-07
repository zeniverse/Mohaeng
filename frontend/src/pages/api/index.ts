// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const boardData = await require("./board.json");
  res.status(200).json({});
}

// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const placeData = await require("../place.json");
//   const courseData = await require("../course.json");
//   const boardData = await require("../board.json");
//   const userData = await require("../user.json");
//   res.status(200).json({ placeData, courseData, boardData, userData });
// }
