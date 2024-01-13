import Image from "next/image";
import { Inter } from "next/font/google";
import Tutorial from "@/components/tutorial";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const tt = "123";

export default function Home() {
  const [ttt, setTtt] = useState(String);
  useEffect(() => {
    async function fetchdata() {
      const dataset = await fetch(`api/getDataset`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((text) => {
          return text;
        });

      const filteredList = await fetch(`api/getFilteredList`, {
        method: "POST",
        body: JSON.stringify(dataset),
      })
        .then((res) => res.text())
        .then((text) => {
          setTtt(text);
        });
    }

    fetchdata();
  });

  return (
    <div>
      <h1>1123</h1>
      {ttt}
    </div>
  );
}
