import Image from "next/image";
import { Inter } from "next/font/google";
import Tutorial from "@/components/signIn";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";



export default function Home() {
  const [filteredList, setFilteredList] = useState(String);

  useEffect(() => {
    async function fetchdata() {
      const dataset = await fetch(`api/getDataset`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((text) => {
          return text;
        });

      await fetch(`api/getFilteredList`, {
        method: "POST",
        body: JSON.stringify({ jobs: dataset, user: {} }),
      })
        .then((res) => res.text())
        .then((text) => {
          // UI THIS
          setFilteredList(text);
        });
    }

    fetchdata();
  });

  const JobListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const prevPage = () => {
    setCurrentPage((page) => (page > 1 ? page - 1 : page));
  };

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  // Assuming 10 job listings for the placeholder
  const placeholderJobs = new Array(10).fill(0).map((_, index) => ({
    title: `Job Title ${index + 1}`,
    company: `Company ${index + 1}`,
    location: "Location",
    description: "This is a brief description of the job opportunity.",
  }));
const inter = Inter({ subsets: ["latin"] });

  return (
    <div className="px-4 py-8 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto grid gap-4">
        {placeholderJobs.map((job, index) => (
          <Card className="border dark:border-gray-700" key={index}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.company} - {job.location}
                <br />
                <span className="text-sm text-gray-600">
                  Accessibility: {job.accessibility}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <div className="flex gap-2">
          <Button variant="outline" onClick={prevPage}>
            <ChevronLeft className="h-4 w-4 dark:text-white" />
          </Button>
          <p className="dark:text-white">Page {currentPage}</p>
          <Button variant="outline" onClick={nextPage}>
            <ChevronRight className="h-4 w-4 dark:text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
