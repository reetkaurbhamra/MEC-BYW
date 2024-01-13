import Image from "next/image";
import { Inter } from "next/font/google";
import Tutorial from "@/components/signIn";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

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

  return (
    <div>
      <h1>Jobs</h1>
      {filteredList}
    </div>
  );
}
