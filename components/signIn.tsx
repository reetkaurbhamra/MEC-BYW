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
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
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
          <option value="highSchool">HighSchool</option>
          <option value="bachelor">Bachelor</option>
          <option value="master">Master</option>
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
          <option value="associate">associate</option>
          <option value="director">director</option>
          <option value="entrylevel">entrylevel</option>
          <option value="executive">executive</option>
          <option value="internship">internship</option>
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
          <option value="full-time">full-time</option>
          <option value="part-time">part-time</option>
          <option value="contract">contract</option>
          <option value="internship">internship</option>
          <option value="temporary">temporary</option>
          <option value="volunteer">volunteer</option>
          <option value="other">other</option>
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
          <option value="none">none</option>
          <option value="screenReader">screenReader</option>
          <option value="brailleDisplay">brailleDisplay</option>
          <option value="magnifier">magnifier</option>
          <option value="speechRecognition">speechRecognition</option>
          <option value="Reasonable Accommodations">Reasonable Accommodations</option>
          <option value="emergencyEvacuationPlans">emergencyEvacuationPlans</option>
          <option value="clearCommunication">clearCommunication</option>
          <option value="assistiveTechnology">assistiveTechnology</option>
          <option value="mentalHealthSupport">mentalHealthSupport</option>
          <option value="feedbackMechanisms">feedbackMechanisms</option>
          <option value="flexibleWorkArrangements">flexibleWorkArrangements</option>
          <option value="assistanceAnimals">assistanceAnimals</option>
          <option value="meetingsAndEvents">meetingsAndEvents</option>
          <option value="restAreas">restAreas</option>
          <option value="communication">communication</option>
          <option value="mentoringAndSupport">mentoringAndSupport</option>
          <option value="websitesAndIntranet">websitesAndIntranet</option>
          <option value="ergonomicWorkstations">ergonomicWorkstations</option>
          <option value="trainingAndSensitivity">trainingAndSensitivity</option>
          <option value="facilities">facilities</option>
        </select>
      </div>

      <div>
        <Label htmlFor="accessibility-features">Accessibility Features</Label>
        <select onChange={(e) => handleChange("accessibilityFeatures2", e.target.value)}>
          <option value="none">none</option>
          <option value="screenReader">screenReader</option>
          <option value="brailleDisplay">brailleDisplay</option>
          <option value="magnifier">magnifier</option>
          <option value="speechRecognition">speechRecognition</option>
          <option value="Reasonable Accommodations">Reasonable Accommodations</option>
          <option value="emergencyEvacuationPlans">emergencyEvacuationPlans</option>
          <option value="clearCommunication">clearCommunication</option>
          <option value="assistiveTechnology">assistiveTechnology</option>
          <option value="mentalHealthSupport">mentalHealthSupport</option>
          <option value="feedbackMechanisms">feedbackMechanisms</option>
          <option value="flexibleWorkArrangements">flexibleWorkArrangements</option>
          <option value="assistanceAnimals">assistanceAnimals</option>
          <option value="meetingsAndEvents">meetingsAndEvents</option>
          <option value="restAreas">restAreas</option>
          <option value="communication">communication</option>
          <option value="mentoringAndSupport">mentoringAndSupport</option>
          <option value="websitesAndIntranet">websitesAndIntranet</option>
          <option value="ergonomicWorkstations">ergonomicWorkstations</option>
          <option value="trainingAndSensitivity">trainingAndSensitivity</option>
          <option value="facilities">facilities</option>
        </select>
      </div>

      <div>
        <Label htmlFor="accessibility-features">Accessibility Features</Label>
        <select onChange={(e) => handleChange("accessibilityFeatures3", e.target.value)}>
          <option value="none">none</option>
          <option value="screenReader">screenReader</option>
          <option value="brailleDisplay">brailleDisplay</option>
          <option value="magnifier">magnifier</option>
          <option value="speechRecognition">speechRecognition</option>
          <option value="Reasonable Accommodations">Reasonable Accommodations</option>
          <option value="emergencyEvacuationPlans">emergencyEvacuationPlans</option>
          <option value="clearCommunication">clearCommunication</option>
          <option value="assistiveTechnology">assistiveTechnology</option>
          <option value="mentalHealthSupport">mentalHealthSupport</option>
          <option value="feedbackMechanisms">feedbackMechanisms</option>
          <option value="flexibleWorkArrangements">flexibleWorkArrangements</option>
          <option value="assistanceAnimals">assistanceAnimals</option>
          <option value="meetingsAndEvents">meetingsAndEvents</option>
          <option value="restAreas">restAreas</option>
          <option value="communication">communication</option>
          <option value="mentoringAndSupport">mentoringAndSupport</option>
          <option value="websitesAndIntranet">websitesAndIntranet</option>
          <option value="ergonomicWorkstations">ergonomicWorkstations</option>
          <option value="trainingAndSensitivity">trainingAndSensitivity</option>
          <option value="facilities">facilities</option>
        </select>
      </div>

      <div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

export default UserInfoCollectionForm;
