"use client";
import Ajax from "@/services/Ajax";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export interface Student {
  name: string;
  rno: string;
  _id: string;
}

interface ModalProps {
  student: Student;
}

export const Modal: React.FC<ModalProps> = ({ student }) => {
  const dispatch = useDispatch();
  const [newStudent, setNewStudent] = useState(student);
  const getValues = (val: string, type: string) => {
    const newValue = { ...newStudent, [type]: val };
    setNewStudent(newValue);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    getValues(e.target.value, type);
  };

  const controlModalDisplay = (show=false) => {
    dispatch({ type: "SHOW_EDIT_MODAL", payload: { showEditModal: show } });
  }
  const updateStudent = async () => {
    const result = await Ajax.put(`/students/${newStudent._id}`, {
      data: { name: newStudent.name, rno: newStudent.rno },
    });
    
    if(result.status.includes(true)){
      alert(result.status);
      dispatch({type: "GET_STUDENTS"})
    }
    else{
      alert("failed to update student");
    }
    controlModalDisplay();
  };

  const closeModal = () => {
    controlModalDisplay();
  };

  return (
    <div className="position-fixed top-0 bottom-0 start-0 end-0 h-100 w-100 bg-opacity-75 bg-dark">
      <div className="d-flex h-100 w-100 align-items-center justify-content-center">
        <div className="position-absolute bg-secondary w-xs-100 w-sm-75 w-md-50 h-xs-50 h-md-25 p-2 rounded-3">
          <div className="mt-3 ms-2 d-flex">
            <label className="form-label me-5" htmlFor="editName">
              name:
            </label>
            <input
              className="form-control mb-2 w-50"
              id="editName"
              type="text"
              value={newStudent.name}
              onChange={(e) => handleChange(e, "name")}
            />
          </div>
          <div className="ms-2 mt-2  d-flex">
            <label className="me-5 form-label" htmlFor="editRno">
              roll no
            </label>
            <input
              className="form-control mb-3 w-50"
              id="editRno"
              type="text"
              value={newStudent.rno}
              onChange={(e) => handleChange(e, "rno")}
            />
          </div>
          <div>
            <button
              className="position-relative btn btn-dark p-1 x-50"
              style={{ left: "40%" }}
              onClick={updateStudent}
            >
              Update
            </button>
          </div>
          <button className="btn btn-danger p-2 pt-1 pb-1 position-absolute top-0 end-0 m-1" onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};
