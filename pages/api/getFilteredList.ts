import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const jobs = req.body;
  const filteredList = [];

  for (const key in jobs) {
    const job = jobs[key];
  }

  res.status(200).json({ name: "testes" });
}

function getLocationScore() {
  console.log("intest");
}

function getShitScore() {
  console.log("intest");
}
