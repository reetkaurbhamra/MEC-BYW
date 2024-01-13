import type { NextApiRequest, NextApiResponse } from "next";


// enum AccessFeatures {
//   None,
//   Accessible_Communication,
//   Accessible_Emergency_Evacuation_Plans,
//   Accessible_Meetings_and_Events,
//   Accessible_Rest_Areas,
//   Accessible_Transportation,
//   Accessible_Websites_and_Intranet,
//   Assistance_Animals,
//   Assistive_Technology,
//   Braille_and_Large_Print_Materials,
//   Clear_Communication,
//   Ergonomic_Workstations,
//   Feedback_Mechanisms,
//   Flexible_Work_Arrangements,
//   Mental_Health_Support,
//   Mentoring_and_Support_Programs,
//   Reasonable_Accommodations,
//   Training_and_Sensitivity_ProgramsAccessible_Facilities,
// }

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
  "Training and Sensitivity Programs"
];

// const expLevels = [
//   "Associate",
//   "Director",
//   "Entry level",
//   "Executive",
//   "Internship",
//   "Mid-Senior level"
// ]

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const jobs = req.body.jobs;
  const user = req.body.user;
  const filteredList = [];
  console.log(user);
  

  const locationMult = 1.2;
  const experienceMult = 0.8;
  const jobTypeMult = 0.8;
  const accessMult = 0.8;
  const skillMult = 0.8;
  const salaryMult = 0.8;

  

  for (const key in jobs) {
    const job = jobs[key];
    var score = 0;
    score += locationMult * getLocationScore(job.location, user.location, user.remote);
    score += experienceMult * getExperienceScore(job.explevel,user.explevel);
    score += jobTypeMult * getJobTypeScore(job.type, user.jobtype);
    var jaccessstr = String(job.accessft).split(", ");
    var jaccess = [20];
    jaccessstr.forEach(ft => {
      ft.replace(/^ /, "");
      ft.replace(/,$/, "");
      var accessVal = accessFeatures.indexOf(ft);
      if (accessVal > 0) jaccess.push(accessVal);
    });
    score += accessMult * getAccessibilityScore(jaccess, accessFeatures.indexOf(user.access1), accessFeatures.indexOf(user.access2), accessFeatures.indexOf(user.access3), accessFeatures.indexOf(user.access4));
    console.log(job.title);
    console.log(score);
    
    if (score < 0) continue;
    score += skillMult * getSkillScore(job.skills, user.skills);
    var jmed = !(job.salmed === null);
    var jmax = !(job.salmax === null);
    score += salaryMult * getSalaryScore(job.salmax, job.salmin, job.salmed, user.salary, job.payperiod, jmed, jmax);


    filteredList.push(job);
    if (filteredList.length > 3) break;
  }

  res.status(200).json({list:filteredList});
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
    return -300;
  }
}

/*
0 - beginner
1 - inter
2 - advanced
3 - expert */
function getExperienceScore(jobexp: string, userexp: string) {
  return (jobexp === userexp) ? 10 : -300;
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
  return 10 - 2 *(usered - jobed);
}

function getSkillScore(jobskills: string, userskills: string) {
  var uskillarr = userskills.split(", ");
  var regstr = "";
  uskillarr.forEach(sk => {
    regstr += (sk + "|");
  });
  regstr.slice(0, -1);
  const regex = new RegExp(regstr, "g");
  var skscore = ((jobskills || '').match(regex) || []).length;
  skscore *= 3;
  return (skscore > 10) ? 10 : skscore;
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
  return (jobtype === usertype) ? 10 : -300;
}

/*
0 - year
1 - month
2 - hour */
function getSalaryScore(jobmaxsalary: number, jobminsalary: number, jobmedsalary: number, usersalary: number, jobpayperiod: number, hasmedian: boolean, hasminmax: boolean) {
  if (!hasmedian && !hasminmax) return 0;
  var jobsalary = hasmedian ? jobmedsalary : ((jobmaxsalary + jobminsalary) / 2);
  var salscore;
  if (jobpayperiod == 1) {
    jobsalary *= 12;
  } else if (jobpayperiod == 2) {
    jobsalary *= 2080;
  }
  if (jobsalary == usersalary) return 8;
  if (usersalary > jobsalary) {
    salscore = (jobsalary - (2*usersalary/3)) * (21/usersalary) + 1;
  } else {
    salscore = (jobsalary - (usersalary/5)) * (5/usersalary) + 4;
  }
  if (salscore < 0) return 0;
  if (salscore > 10) return 10;
  return salscore;
}

/*
0 - none
1........ - rest */
function getAccessibilityScore(jobaccessft: number[], useraccess1: number, useraccess2: number, useraccess3: number, useraccess4: number) {
  if (useraccess1 == 0) return 10;
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
    if (nomatch) return -300;
  }
  return 10;
}