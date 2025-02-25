"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { appStore } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";

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
  const dispatch = useDispatch();
    useEffect(()=> {
      if(typeof window !== "undefined" ){
        dispatch({type:"UPDATE_LOGIN_STATUS", payload: sessionStorage.getItem("loggedInUser") ? {isLoggedIn:true}: {isLoggedIn:false}});
      }
    }, [dispatch]);
  const { isLoggedIn } = useSelector((state: AppState) => state?.appReducer);
  return (
    
        <Provider store={appStore}>
          {isLoggedIn ? children : <Login />}
        </Provider>
       
       
  );
}
