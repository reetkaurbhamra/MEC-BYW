import type { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

type Job = {
  index: number;
  title: string;
  desc: string;
  salmax: number;
  salmed: number;
  salmin: number;
  payperiod: string;
  type: string;
  location: string;
  explevel: string;
  skills: string;
  accessft: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Job>) {
  // var myParser = parse({ delimiter: "," }, function (data, err) {
  //   console.log(data);
  // });
  // console.log("aaa");

  const csvFilePath = path.resolve(__dirname, '../../../../dataset.csv');
  
  const headers = ['Index', 'title', 'desc', 'salmax', 'salmed', 'salmin', 'payperiod', 'type', 'location', 'explevel', 'skills', 'accessft'];
  
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: Job[]) => {
    if (error) {
      console.error(error);
    }
    res.status(200).json(result);
  });
  
}
