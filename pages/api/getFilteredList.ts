import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  list: Object;
};

const accessFeatures = [
  "None",
  "Accessible Communication",
  "Accessible Emergency Evacuation Plans",
  "Accessible Facilities",
  "Accessible Meetings and Events",
  "Accessible Rest Areas",
  "Accessible Transportation",
  "Accessible Websites and Intranet",
  "Assistance Animals",
  "Assistive Technology",
  "Braille and Large Print Materials",
  "Clear Communication",
  "Ergonomic Workstations",
  "Feedback Mechanisms",
  "Flexible Work Arrangements",
  "Mental Health Support",
  "Mentoring and Support Programs",
  "Reasonable Accommodations",
  "Training and Sensitivity Programs",
];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const jobs = JSON.parse(req.body.jobs);
  const user = JSON.parse(req.body.user);
  const filteredList = [];

  const locationMult = 1.5;
  const experienceMult = 0.8;
  const jobTypeMult = 0.8;
  const accessMult = 2;
  const skillMult = 1;
  const salaryMult = 1.5;

  for (const key in jobs) {
    const job = jobs[key];
    var score = 0;
    score += locationMult * getLocationScore(job.location, user.location, user.remoteWork);
    score += experienceMult * getExperienceScore(job.explevel, user.experienceLevel);
    score += jobTypeMult * getJobTypeScore(job.type, user.jobType);
    var jaccessstr = String(job.accessft).split(", ");
    var jaccess = [20];
    jaccessstr.forEach((ft) => {
      ft.replace(/^ /, "");
      ft.replace(/,$/, "");
      var accessVal = accessFeatures.indexOf(ft);
      if (accessVal > 0) jaccess.push(accessVal);
    });
    score +=
      accessMult *
      getAccessibilityScore(
        jaccess,
        accessFeatures.indexOf(user.access1),
        accessFeatures.indexOf(user.access2),
        accessFeatures.indexOf(user.access3),
        accessFeatures.indexOf(user.access4)
      );

    if (score < 0) continue;
    score += skillMult * getSkillScore(job.skills, user.skills);
    var jmed = !(job.salmed == "");
    var jmax = !(job.salmax == "");
    score +=
      salaryMult * getSalaryScore(job.salmax, job.salmin, job.salmed, user.expectedSalary, job.payperiod, jmed, jmax);
    console.log(job.title);
    console.log(score, salaryMult);

    job.score = score;
    filteredList.push(job);
    if (filteredList.length > 10) break;
  }

  filteredList.sort((a, b) => b.score - a.score);
  res.status(200).json({ list: filteredList });
}

function getLocationScore(joblocation: string, userlocation: string, remote: boolean) {
  if (remote) {
    return 10;
  }
  var ucity = userlocation.slice(0, -4);
  var ustate = userlocation.slice(-2);
  var jcity = joblocation.slice(0, ucity.length);
  var jstate = joblocation.slice(-2);
  if (ucity === jcity) {
    return 10;
  } else if (ustate === jstate) {
    return 4;
  } else {
    return 0;
  }
}

/*
0 - beginner
1 - inter
2 - advanced
3 - expert */
function getExperienceScore(jobexp: string, userexp: string) {
  return jobexp === userexp ? 10 : 0;
}

/*
0 - HS
1 - bachelor
2 - master
3 - Ph.D */
function getEducationScore(jobed: number, usered: number) {
  if (jobed > usered) {
    return 0;
  }
  return 10 - 2 * (usered - jobed);
}

function getSkillScore(jobskills: string, userskills: string) {
  var uskillarr = userskills.split(", ");
  var regstr = "";
  uskillarr.forEach((sk) => {
    regstr += sk + "|";
  });
  regstr.slice(0, -1);
  const regex = new RegExp(regstr, "g");
  var skscore = ((jobskills || "").match(regex) || []).length;
  skscore *= 3;
  return skscore > 10 ? 10 : skscore;
}

/*
0 - PT
1 - FT
2 - contract
3 - intern
4 - temp
5 - volunteer
6 - other */
function getJobTypeScore(jobtype: string, usertype: string) {
  return jobtype === usertype ? 10 : 0;
}

/*
0 - year
1 - month
2 - hour */
function getSalaryScore(
  jobmaxsalary: number,
  jobminsalary: number,
  jobmedsalary: number,
  usersalary: number,
  jobpayperiod: string,
  hasmedian: boolean,
  hasminmax: boolean
) {
  if (!hasmedian && !hasminmax) return 1;
  var jobsalary = hasmedian ? jobmedsalary : (jobmaxsalary + jobminsalary) / 2;
  var salscore;
  if (jobpayperiod === "MONTHLY") {
    jobsalary *= 12;
  } else if (jobpayperiod === "HOURLY") {
    jobsalary *= 2080;
  }
  if (jobsalary == usersalary) return 8;
  if (usersalary > jobsalary) {
    salscore = (jobsalary - (2 * usersalary) / 3) * (21 / usersalary) + 1;
  } else {
    salscore = (jobsalary - usersalary / 5) * (5 / usersalary) + 4;
  }
  if (salscore < 0) return 1;
  if (salscore > 10) return 10;
  return salscore;
}

/*
0 - none
1........ - rest */
function getAccessibilityScore(
  jobaccessft: number[],
  useraccess1: number,
  useraccess2: number,
  useraccess3: number,
  useraccess4: number
) {
  var uaccess = [useraccess1, useraccess2, useraccess3, useraccess4];
  for (let i = 0; i < 4; i++) {
    if (uaccess[i] == 0) return 10;
    var nomatch = true;

    for (let j = 0; j < jobaccessft.length; j++) {
      if (jobaccessft[j] == uaccess[i]) {
        nomatch = false;
        break;
      }
    }
    if (nomatch) return 1;
  }
  return 10;
}
