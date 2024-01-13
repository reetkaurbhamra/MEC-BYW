// [meta] name: null
// [meta] description: add another field to the form, phone number

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { Globe2 } from "lucide-react";
import { School2 } from "lucide-react";
import { Smartphone } from "lucide-react";
import { User2 } from "lucide-react";
import { FormEvent } from "react";
import { useState } from "react";

function UserInfoCollectionForm() {
  const [formData, setFormData] = useState({});

  function setCookie(name: any, value: any, expires = "Fri, 31 Dec 9999 23:59:59 GMT") {
    document.cookie = `${name}=${JSON.stringify(value)}; expires=${expires}; path=/`;
    console.log(document.cookie);
  }

  const handleChange = (field: string, value: string) => {
    console.log("in handle");
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setCookie("user", formData);
    window.open("joblist");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">User Information</h2>
      <div>
        <Label htmlFor="name">
          <User2 className="mr-2 h-4 w-4 inline" />
          Full Name
        </Label>
        <Input id="name" type="text" placeholder="John Doe" onChange={(e) => handleChange("name", e.target.value)} />
      </div>

      <div>
        <Label htmlFor="education">
          <School2 className="mr-2 h-4 w-4 inline" />
          Education
        </Label>
        <select onChange={(e) => handleChange("education", e.target.value)}>
          <option value="select">Select</option>
          <option value="highSchool">High School</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Masters</option>
          <option value="phd">PHD</option>
        </select>
      </div>

      <div>
        <Label htmlFor="experience-level">
          <User2 className="mr-2 h-4 w-4 inline" />
          Experience Level
        </Label>
        <select onChange={(e) => handleChange("experienceLevel", e.target.value)}>
          <option value="select">Select</option>
          <option value="Associate">associate</option>
          <option value="Director">director</option>
          <option value="Entry level">entrylevel</option>
          <option value="Executive">executive</option>
          <option value="Internship">internship</option>
          <option value="Mid-Senior level">Mid-Senior level</option>
        </select>
      </div>

      <div>
        <Label htmlFor="job-title">
          <User2 className="mr-2 h-4 w-4 inline" />
          Job Title
        </Label>
        <Input
          id="job-title"
          type="text"
          placeholder="Software Engineer"
          onChange={(e) => handleChange("jobTitle", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="location">
          <Globe2 className="mr-2 h-4 w-4 inline" />
          Location
        </Label>
        <Input
          id="location"
          type="text"
          placeholder="City, Country"
          onChange={(e) => handleChange("location", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="type">
          <User2 className="mr-2 h-4 w-4 inline" />
          Job Type
        </Label>
        <select onChange={(e) => handleChange("jobType", e.target.value)}>
          <option value="select">Select</option>
          <option value="Full-time">full-time</option>
          <option value="Part-time">part-time</option>
          <option value="Contract">contract</option>
          <option value="Internship">internship</option>
          <option value="Temporary">temporary</option>
          <option value="Volunteer">volunteer</option>
          <option value="Other">other</option>
        </select>
      </div>

      <div>
        <Label htmlFor="remote-work">Remote Work</Label>
        <div className="flex items-center">
          <input
            id="remote-work-yes"
            name="remote-work"
            type="radio"
            value="yes"
            onChange={(e) => handleChange("remoteWork", e.target.value)}
            className="mr-2"
          />
          <Label htmlFor="remote-work-yes" className="mr-4">
            Yes
          </Label>
          <input
            id="remote-work-no"
            name="remote-work"
            type="radio"
            value="no"
            onChange={(e) => handleChange("remoteWork", e.target.value)}
            className="mr-2"
          />
          <Label htmlFor="remote-work-no">No</Label>
        </div>
      </div>
      <div>
        <Label htmlFor="expected-salary">
          <User2 className="mr-2 h-4 w-4 inline" />
          Expected Salary
        </Label>
        <Input
          id="expected-salary"
          type="text"
          placeholder="Expected Salary"
          onChange={(e) => handleChange("expectedSalary", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="skills">
          <User2 className="mr-2 h-4 w-4 inline" />
          Skills
        </Label>
        <Input
          id="skills"
          type="text"
          placeholder="Your skills separated by commas"
          onChange={(e) => handleChange("skills", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="accessibility-features">Accessibility Features</Label>
        <select onChange={(e) => handleChange("accessibilityFeatures1", e.target.value)}>
          <option value="None">None</option>
          <option value="Accessible Communication">Accessible Communication</option>
          <option value="Accessible Emergency Evacuation Plans">Accessible Emergency Evacuation Plans</option>
          <option value="Accessible Meetings And Events">Accessible Meetings and Events</option>
          <option value="Accessible Rest Areas">Accessible Rest Areas</option>
          <option value="Accessible Transportation">Accessible Transportation</option>
          <option value="Accessible Websites and Intranet">Websites and Intranet</option>
          <option value="Assistance Animals">Assistance Animals</option>
          <option value="Assistive Technology">Assistive Technology</option>
          <option value="Braille and Large Print Materials">Braille Display</option>
          <option value="Clear Communication">Clear Communication</option>
          <option value="Ergonomic Workstations">Ergonomic Workstations</option>
          <option value="Feedback Mechanisms">Feedback Mechanisms</option>
          <option value="Flexible Work Arrangements">Flexible Work Arrangements</option>
          <option value="Mental Health Support">Mental Health Support</option>
          <option value="Mentoring and Support Programs">Mentoring And Support</option>
          <option value="Reasonable Accommodations">Reasonable Accommodations</option>
          <option value="Training and Sensitivity Programs">Training and Sensitivity</option>
        </select>
      </div>

      <div>
        <Label htmlFor="accessibility-features">Accessibility Features</Label>
        <select onChange={(e) => handleChange("accessibilityFeatures2", e.target.value)}>
          <option value="None">None</option>
          <option value="Accessible Communication">Accessible Communication</option>
          <option value="Accessible Emergency Evacuation Plans">Accessible Emergency Evacuation Plans</option>
          <option value="Accessible Meetings And Events">Accessible Meetings and Events</option>
          <option value="Accessible Rest Areas">Accessible Rest Areas</option>
          <option value="Accessible Transportation">Accessible Transportation</option>
          <option value="Accessible Websites and Intranet">Websites and Intranet</option>
          <option value="Assistance Animals">Assistance Animals</option>
          <option value="Assistive Technology">Assistive Technology</option>
          <option value="Braille and Large Print Materials">Braille Display</option>
          <option value="Clear Communication">Clear Communication</option>
          <option value="Ergonomic Workstations">Ergonomic Workstations</option>
          <option value="Feedback Mechanisms">Feedback Mechanisms</option>
          <option value="Flexible Work Arrangements">Flexible Work Arrangements</option>
          <option value="Mental Health Support">Mental Health Support</option>
          <option value="Mentoring and Support Programs">Mentoring And Support</option>
          <option value="Reasonable Accommodations">Reasonable Accommodations</option>
          <option value="Training and Sensitivity Programs">Training and Sensitivity</option>
        </select>
      </div>

      <div>
        <Label htmlFor="accessibility-features">Accessibility Features</Label>
        <select onChange={(e) => handleChange("accessibilityFeatures3", e.target.value)}>
          <option value="None">None</option>
          <option value="Accessible Communication">Accessible Communication</option>
          <option value="Accessible Emergency Evacuation Plans">Accessible Emergency Evacuation Plans</option>
          <option value="Accessible Meetings And Events">Accessible Meetings and Events</option>
          <option value="Accessible Rest Areas">Accessible Rest Areas</option>
          <option value="Accessible Transportation">Accessible Transportation</option>
          <option value="Accessible Websites and Intranet">Websites and Intranet</option>
          <option value="Assistance Animals">Assistance Animals</option>
          <option value="Assistive Technology">Assistive Technology</option>
          <option value="Braille and Large Print Materials">Braille Display</option>
          <option value="Clear Communication">Clear Communication</option>
          <option value="Ergonomic Workstations">Ergonomic Workstations</option>
          <option value="Feedback Mechanisms">Feedback Mechanisms</option>
          <option value="Flexible Work Arrangements">Flexible Work Arrangements</option>
          <option value="Mental Health Support">Mental Health Support</option>
          <option value="Mentoring and Support Programs">Mentoring And Support</option>
          <option value="Reasonable Accommodations">Reasonable Accommodations</option>
          <option value="Training and Sensitivity Programs">Training and Sensitivity</option>
        </select>
      </div>

      <div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

export default UserInfoCollectionForm;
