import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const keywordData = await require("./keyword.json");
  switch (method) {
    case "GET":
      res.status(200).json(keywordData);
      break;
    case "POST":
      res.status(200).json({ message: "POST 요청을 받음", body });
      break;
    default:
      res.status(400).json({ error: "error message" });
      break;
  }
  res.status(200).json(keywordData);
}

// import type { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const keywordData = await require("./keyword.json");
//   res.status(200).json(keywordData);
// }
