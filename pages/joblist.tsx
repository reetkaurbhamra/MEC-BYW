import Image from "next/image";
import { Inter } from "next/font/google";
import Tutorial from "@/components/signIn";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [filteredList, setFilteredList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  function getCookie(name: any) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  useEffect(() => {
    async function fetchdata() {
      const dataset = await fetch(`api/getDataset`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          return json;
        });

      await fetch(`api/getFilteredList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: getCookie("user"), jobs: JSON.stringify(dataset.slice(600, 900)) }),
      })
        .then((res) => res.json())
        .then((json) => {
          setFilteredList(json.list); // SCUFFED
        });
    }

    fetchdata();
  });

  const prevPage = () => {
    setCurrentPage((page) => (page > 1 ? page - 1 : page));
  };

  const nextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  // Assuming 10 job listings for the placeholder
  const placeholderJobs = filteredList.map((e: any) => ({
    title: e.title,
    accessibility: e.accessft,
    location: e.location,
    description: e.desc,
  }));

  return (
    <div className="px-4 py-8 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto grid gap-4">
        {placeholderJobs.map((job, index) => (
          <Card className="border dark:border-gray-700" key={index}>
            <CardHeader>
              <CardTitle>{job.title}</CardTitle>
              <CardDescription>
                {job.location} - {job.accessibility}
                <br />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{job.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <h3 className="flex justify-center mt-8">{filteredList.length == 0 ? "loading..." : ""}</h3>
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
