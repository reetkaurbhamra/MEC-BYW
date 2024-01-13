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
// [meta] name: UserInfoCollectionForm
// [meta] description: Create an update for the form to collect user information like name, education, country of residence, and phone number
function UserInfoCollectionForm() {
  const [formData, setFormData] = useState({
    name: "",
    education: "",
    country: "",
    phoneNumber: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
    window.open("pages/joblist.tsx");
    // Handle form submission logic
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
        <Select multiple>
          <SelectTrigger>
            <SelectValue placeholder="Select Education" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="highSchool" onSelect={() => handleChange("education", "High School")}>
              High School
            </SelectItem>
            <SelectItem value="bachelor" onSelect={() => handleChange("education", "Bachelor")}>
              Bachelor
            </SelectItem>
            <SelectItem value="master" onSelect={() => handleChange("education", "Master")}>
              Master
            </SelectItem>
            <SelectItem value="phd" onSelect={() => handleChange("education", "Ph.D")}>
              Ph.D
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="experience-level">
          <User2 className="mr-2 h-4 w-4 inline" />
          Experience Level
        </Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Experience Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner" onSelect={() => handleChange("experienceLevel", "Beginner")}>
              Beginner
            </SelectItem>
            <SelectItem value="intermediate" onSelect={() => handleChange("experienceLevel", "Intermediate")}>
              Intermediate
            </SelectItem>
            <SelectItem value="advanced" onSelect={() => handleChange("experienceLevel", "Advanced")}>
              Advanced
            </SelectItem>
            <SelectItem value="expert" onSelect={() => handleChange("experienceLevel", "Expert")}>
              Expert
            </SelectItem>
          </SelectContent>
        </Select>
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
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full-time" onSelect={() => handleChange("type", "Full-time")}>
              Full-time
            </SelectItem>
            <SelectItem value="part-time" onSelect={() => handleChange("type", "Part-time")}>
              Part-time
            </SelectItem>
            <SelectItem value="contract" onSelect={() => handleChange("type", "Contract")}>
              Contract
            </SelectItem>
            <SelectItem value="internship" onSelect={() => handleChange("type", "Internship")}>
              Internship
            </SelectItem>
            <SelectItem value="temporary" onSelect={() => handleChange("type", "Temporary")}>
              Temporary
            </SelectItem>
            <SelectItem value="volunteer" onSelect={() => handleChange("type", "Volunteer")}>
              Volunteer
            </SelectItem>
            <SelectItem value="other" onSelect={() => handleChange("type", "Other")}>
              Other
            </SelectItem>
          </SelectContent>
        </Select>
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
          placeholder="Your skills"
          onChange={(e) => handleChange("skills", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="accessibility-features">Accessibility Features</Label>
        <Select multiple>
          <SelectTrigger>
            <SelectValue placeholder="Select Accessibility Features" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="screenReader" onSelect={() => handleChange("accessibilityFeatures", "Screen Reader")}>
              Screen Reader
            </SelectItem>
            <SelectItem
              value="brailleDisplay"
              onSelect={() => handleChange("accessibilityFeatures", "Braille Display")}
            >
              Braille Display
            </SelectItem>
            <SelectItem value="magnifier" onSelect={() => handleChange("accessibilityFeatures", "Magnifier")}>
              Magnifier
            </SelectItem>
            <SelectItem
              value="speechRecognition"
              onSelect={() => handleChange("accessibilityFeatures", "Speech Recognition")}
            >
              Speech Recognition
            </SelectItem>
            <SelectItem value="none" onSelect={() => handleChange("accessibilityFeatures", "None")}>
              None
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

export default UserInfoCollectionForm;
