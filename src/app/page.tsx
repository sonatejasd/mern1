"use client";
import { useSelector } from "react-redux";
import Login from "./login/page";
import Register from "./register/page";
import { useState } from "react";

export default function Home() { 
  return (
    <div>
      <Register/>
    </div>
  );
}
