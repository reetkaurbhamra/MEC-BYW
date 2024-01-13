import Image from "next/image";
import { Inter } from "next/font/google";
import Tutorial from "@/components/signIn";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <Tutorial />;
}
