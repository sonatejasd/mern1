"use client";
import { AppState, Student } from "@/app/layoutWrapper";
import Ajax from "@/services/Ajax";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export const Students = () => {
  const students = useSelector((state: AppState) => state?.appReducer.students); //here students get populated from redu hence students is also state variable and hence changes can be tracjked in uiseeffect
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [currentPg, setCurrentPg] = useState(1);
  const noOfStudentsPerPg = 10;
  const noOfPgs = useRef(0);
  const dispatch = useDispatch();

  const paginate = () => {
    noOfPgs.current = Math.ceil(students.length / noOfStudentsPerPg);
    const end = currentPg * noOfStudentsPerPg;
    const start = end - noOfStudentsPerPg;
    setStudentList(students?.slice(start, end));
  };

  useEffect(() => {
    dispatch({ type: "GET_STUDENTS" });
  }, []);

  useEffect(() => {
    paginate();
  }, [currentPg, students]);
  //pagination
  const previousPg = () => {
    setCurrentPg(currentPg - 1);
  };
  const nextPg = () => {
    setCurrentPg(currentPg + 1);
  };
  //edit delete
  const editStudent = (student: Student) => {
    dispatch({
      type: "SHOW_EDIT_MODAL",
      payload: { showEditModal: true, student },
    });
  };

  const deleteStudent = async (student: Student) => {
    const delStudent = confirm(`Are you sure you want to delete this student - ${student._id}`);
    if(delStudent){
      const result = await Ajax.delete(`/students/${student._id}`);
      console.log(result);
      if(result.status === `Successfully deleted student with id ${student._id}`){
        alert(result.status);
        dispatch({type: `GET_STUDENTS`})
      }
      else{
        alert(`unable to delete student with id ${student._id}`)
      }
    }
  }
  return (
    <div>
      <table className="table mt-5 mx-auto" style={{ width: "75%" }}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Roll no</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) => {
            const { name, rno, _id } = student;
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{name}</td>
                <td>{rno}</td>
                <td>
                  <button
                    className="btn btn-primary me-lg-3 p-1 pe-lg-3 ps-lg-3"
                    data-id={_id}
                    onClick={() => {
                      editStudent(student);
                    }}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger p-1" data-id={_id} onClick={()=>deleteStudent(student)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav style={{ float: "right" }} className="me-5 pe-5" aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPg == 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              tabIndex={-1}
              aria-disabled="true"
              onClick={previousPg}
            >
              Previous
            </a>
          </li>

          <li className="page-item">
            <a className="page-link" href="#">
              {currentPg}
            </a>
          </li>

          <li className="page-item">
            <a
              className={`page-link ${
                currentPg == noOfPgs.current ? "disabled" : ""
              }`}
              href="#"
              onClick={nextPg}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
