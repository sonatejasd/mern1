"use client";
import "./globals.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { appStore } from "@/redux/store";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Modal } from "@/components/Modal";

const Login = dynamic (() => import('@/components/Login'), { //to avoid ssr of Login component as it has sessin storage code
  ssr: false,
  loading: () => <p>loading...</p>
})

export interface Student {
  _id : string,
  name : string,
  rno : string
}

export interface AppState{
  appReducer: {
    isLoggedIn: boolean;
    showEditModal: boolean;
    student: Student;
    students: Student[];
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
  const { isLoggedIn, showEditModal, student } = useSelector((state: AppState) => state?.appReducer);
  
  return (
    
        <Provider store={appStore}>
          {isLoggedIn ? children : <Login />}
          {showEditModal && <Modal student={student}/>}
        </Provider>
       
       
  );
}
