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

const locationMult = 1.2;
const educationMult = 0.8;

function getLocationScore(joblocation: number, userlocation: number, remote: boolean) {
  if (remote) {
    return locationMult;
  }
  if (1/*same city*/) {
    return locationMult;
  } else if (1/*same area*/) {
    return locationMult * 0.7;
  } else if (1/*same state/province*/) {
    return locationMult * 0.3;
  } else {
    return 0;
  }
}

function getEducationScore(jobed: number, usered: number) {
  if (jobed > usered) {
    return 0;
  }
  return (7 + usered - jobed) * educationMult;
}
/*
0 - PT
1 - FT
2 - contract
3 - intern
4 - temp
5 - volunteer
6 - other */
function getJobTypeScore(jobtype: number, usertype: number) {
  return (jobtype == usertype) ? 10 : 0;
}

/*
0 - year
1 - month
2 - hour */
function getSalaryScore(jobmaxsalary: number, jobminsalary: number, jobmedsalary: number, usersalary: number, jobpayperiod: number, hasmedian: boolean, hasminmax: boolean) {
  if (!hasmedian && !hasminmax) return 0;
  var jobsalary = hasmedian ? jobmedsalary : ((jobmaxsalary + jobminsalary) / 2);
  if (jobpayperiod == 1) {
    jobsalary *= 12;
  } else if (jobpayperiod == 2) {
    jobsalary *= 2080;
  }
  if (jobsalary == usersalary) return 8;
  if (usersalary > jobsalary) {
    return (jobsalary - (2*usersalary/3)) * (21/usersalary) + 1;
  } else {
    return (jobsalary - (usersalary/5)) * (5/usersalary) + 4;
  }
}

// function getAccessibilityScore(jobaccessft: )
