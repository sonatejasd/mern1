"use client";
import Ajax from '@/services/Ajax';
import React, { useRef } from 'react'

export const Register = () => {
  const name = useRef<HTMLInputElement>(null);
  const rno = useRef<HTMLInputElement>(null);

  const registerStudent = async () => {
    const data = {data: {
            name: name.current?.value,
            rno: rno.current?.value
          }}
    try{
    // const res = await fetch("https://mern1-server-student.vercel.app/students/register",{
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json", // Set the Content-Type header
    //   },
    //   body: JSON.stringify({
    //     data: {
    //       name: name.current?.value,
    //       rno: rno.current?.value
    //     }
    //   })
    // } );
    // const response = await res.json();
    // console.log(response);

    const res = await Ajax.post("/students/register",data);
    
    if(res?.status.includes(`Successfully inserted ${rno.current?.value}`)){
      alert(`Successfully added student -  ${rno.current?.value}`);
      name.current!.value = '';
      rno.current!.value = '';
    }

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


