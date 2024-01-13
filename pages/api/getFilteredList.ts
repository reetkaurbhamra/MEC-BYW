import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  list: any;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const jobs = req.body;
  let filteredList: any[] = [];

  for (const key in jobs) {
    const job = jobs[key];
  }

  res.status(200).json({ list: [{ name: "123" }, { name: "ccom" }] });
}

function getLocationScore() {
  console.log("intest");
}

function getShitScore() {
  console.log("intest");
}
