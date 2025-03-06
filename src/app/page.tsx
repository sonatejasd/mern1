"use client";

import { Students } from "@/components/Students/Students";
import Register from "./register/page";


export default function Home() {
  return (
    <div>
      <Register />
      <Students/>
    </div>
  );
}
