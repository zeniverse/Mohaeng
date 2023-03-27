import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(res);
  const code = res;
  const getToken = await axios.post(
    `http://219.255.1.253:8080/oauth/token?code=${code}`
  );

  res.status(200).send(getToken);
}
