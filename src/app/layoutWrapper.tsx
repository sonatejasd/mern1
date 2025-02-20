"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useSelector } from "react-redux";
import { appStore } from "@/redux/store";
import dynamic from "next/dynamic";

const Login = dynamic (() => import('@/components/Login'), {ssr: false,
  loading: () => <p>loading...</p>
})


interface AppState{
  appReducer: {
    isLoggedIn: boolean;
    user: string;
  }
}
export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoggedIn } = useSelector((state: AppState) => state?.appReducer);
  return (
    
        <Provider store={appStore}>
          {isLoggedIn ? children : <Login />}
        </Provider>
       
       
  );
}
