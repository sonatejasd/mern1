import Ajax from "@/services/Ajax";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
export const Students = () => {
  const [studentList, setStudentList] = useState([]);
  const [currentPg, setCurrentPg] = useState(1);
  const noOfStudents = useRef(0);
  let noOfStudentsPerPg = 10;
  const noOfPgs = useRef(0);
  const dispatch = useDispatch();

  const getAllStudents = async () => {
    const data = await Ajax.get("/students/allStudents");
    noOfStudents.current = data.length;
    noOfPgs.current = Math.floor(data.length/noOfStudentsPerPg);
    //pages and data
    const end = currentPg*noOfStudentsPerPg;
    const start = end - noOfStudentsPerPg;
    setStudentList(data.slice(start, end));
    
  };
  useEffect(() => {
    getAllStudents();
  }, [currentPg]);
  //pagination
  const previousPg = () => {
     setCurrentPg(currentPg-1);
  };
  const nextPg = () => {
    setCurrentPg(currentPg+1);;
  };
  //edit delete
  const editStudent = (student: object) => {
    dispatch({type: "SHOW_EDIT_MODAL", payload: { showEditModal : true, student}})
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
          {studentList.map((student, index) => 
          {  
            const { name, rno, _id } = student;
            return (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{name}</td>
              <td>{rno}</td>
              <td>
                <button className="btn btn-primary me-lg-3 p-1 pe-lg-3 ps-lg-3" data-id={_id} onClick={()=>{editStudent(student)}}>
                  Edit
                </button>
                <button className="btn btn-danger p-1" data-id={_id}>Delete</button>
              </td>
            </tr>)
          }
)}

        </tbody>
      </table>
      <nav style={{ float: "right" }} className="me-5 pe-5" aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPg ==1 ? "disabled":''}`}>
            <a
              className="page-link"
              href="#"
              tabIndex={-1}
              aria-disabled="true"
              onClick = {previousPg}
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
            <a className={`page-link ${currentPg==noOfPgs.current?"disabled":""}`} href="#" onClick={nextPg}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
