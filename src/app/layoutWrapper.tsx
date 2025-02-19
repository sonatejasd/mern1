"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useSelector } from "react-redux";
import { appStore } from "@/redux/store";
import Login from "./login/page";
export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useSelector((state:any) => state?.appReducer);
  console.log(isLoggedIn);
  return (
    
        <Provider store={appStore}>
          {isLoggedIn ? children : <Login />}
        </Provider>
       
       
  );
}
