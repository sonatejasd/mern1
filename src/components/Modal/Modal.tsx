import React from 'react'
import { useSelector } from 'react-redux';
interface Student {
  name: string,
  rno : number
}

interface ModalProps {
  student: Student,
}

export const Modal : React.FC<ModalProps> = ({student}) => {
  const {name, rno} = student;
  return (
    <div className="position-fixed top-0 bottom-0 start-0 end-0 h-100 w-100 bg-opacity-75 bg-dark">
      <div className="d-flex h-100 w-100 align-items-center justify-content-center">
      <div  className="position-absolute bg-secondary w-100 w-sm-75 w-md-50 h-25 p-2 rounded-1">
        <div className="mt-3 ms-2 d-flex">
          <label className="form-label me-5" htmlFor="editName">name:</label>
          <input className="form-control mb-2 w-50" id="editName" type="text" value={name}/>
        </div>
        <div className="ms-2 mt-2  d-flex">
          <label className="me-5 form-label" htmlFor="editRno">roll no</label>
          <input className="form-control mb-3 w-50" id="editRno" type="text" value={rno}/>
        </div>
        <div>
          <button className="position-relative btn btn-dark p-1 x-50" style={{"left": "40%"}}>Update</button>
        </div>
        <button className="btn btn-danger p-2 pt-1 pb-1 position-absolute top-0 end-0 m-1">X</button>
      </div>
      </div>

    </div>
  )
};


