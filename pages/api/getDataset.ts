import type { NextApiRequest, NextApiResponse } from "next";

import { parse } from "csv-parse";

type Data = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  var myParser = csvParse({ delimiter: "," }, function (data, err) {
    console.log(data);
  });
  res.status(200).json({ name: "asd" });
}
