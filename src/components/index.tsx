"use client";
import React, { useRef } from 'react'

export const Register = () => {
  const name = useRef<HTMLInputElement>(null);
  const rno = useRef<HTMLInputElement>(null);

  const registerStudent = async () => {
    try{
    const res = await fetch("http://localhost:2020/students/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          name: name.current?.value,
          rno: rno.current?.value
        }
      })
    } );
    console.log(res.json);
  }catch(err) {
    console.log(err);
  }
  };
  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div>
      <div>
        <label className="form-label" htmlFor="name">Name:</label>
        <input ref={name} type="text" className='form-control' id='name'/>
      </div>
      <div className='mt-2 mb-2'>
        <label htmlFor="rno" className='form-label'>Roll No.</label>
        <input ref={rno} type="text" className='form-control'/>
      </div>
      <div><button className='btn btn-primary' onClick={registerStudent}>register</button></div>
      </div>
    </div>
  )
}


