import Image from "next/image";
import { Inter } from "next/font/google";
import Tutorial from "@/components/tutorial";
import React, { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const tt = "123";

export default function Home() {
  const [ttt, setTtt] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(`api/getDataset`, {
        method: "GET",
      })
        .then((res) => res.text())
        .then((text) => {
          console.log(text);
          setTtt(text);
          return text;
        });
    }

    fetchData();
  });

  return (
    <div>
      <h1>1123</h1>
      {ttt}
    </div>
  );
}
