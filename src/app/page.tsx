"use client";

import { Students } from "@/components/Students/Students";
import Register from "./register/page";
import { Modal } from "@/components/Modal"

export default function Home() {
  return (
    <div>
      <Register />
      <Students/>
    </div>
  );
}
