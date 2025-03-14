"use client";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Ajax from "@/services/Ajax";



export const Login = () => {
  const [incorrectCredentials, setFlag] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  // }, []);
  const handleLogin = async () => {
    const userName = userRef.current?.value || '';
    const userDetails = {
      data: {
        username: userName,
        password: passwordRef.current?.value,
      },
    };
    try {
      const res = await Ajax.post("/users/login", userDetails);
      
      if (res?.token) {
        if(typeof window !== "undefined"){
          sessionStorage.setItem("loggedInUser", res?.token); 
        }
        dispatch({
          type: "UPDATE_LOGIN_STATUS",
          payload: { isLoggedIn: true, user: userName },
        });
      } else {
        setFlag(true);
      }
    } catch (err: unknown) {
      if(err instanceof Error) {
      console.log(err?.message);
      } else {
        console.log("unknown error",err);
        setFlag(true);
      }
    }
  };
  const handleLoginChange = () => {
    if (incorrectCredentials) setFlag(false);
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="border border-3 p-5 rounded-5">
        {incorrectCredentials && (
          <h6 className="mb-5 text-danger">Incorrect username or password!!</h6>
        )}
        <div className="mb-3 row">
          <div className="col-auto">
            <label className="col-form-label" htmlFor="username">
              username:
            </label>
          </div>
          <div className="col-auto">
            <input
              ref={userRef}
              className="form-control"
              type="text"
              id="username"
              onChange={handleLoginChange}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <div className="col-auto">
            <label className="col-form-label" htmlFor="password">
              password:
            </label>
          </div>
          <div className="col-auto">
            <input
              ref={passwordRef}
              className="form-control"
              type="password"
              id="password"
              onChange={handleLoginChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};
