// import { useLocation } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import "./index.css";
// import Header from "../Header";
// import { StudentType } from "../../Type";
// const CourseBasedStudents = () => {
//   const location = useLocation();
//   const studentsdetails = location.state.e.students;
//   return (
//     <div className="course-based-student-container">
//       <div>
//         <Header />
//       </div>
//       <div>
//         <Sidebar />
//       </div>
//       {studentsdetails.length === 0 ? (
//         <div className="students-details-container">
//           <h1>No Student Enrolled In This Course Yet.</h1>
//         </div>
//       ) : (
//         <div className="students-details-container">
//           <table className="student-table">
//             <thead>
//               <tr>
//                 <th>Student Name</th>
//                 <th>Email</th>
//                 <th>Phone Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {studentsdetails.map((each: StudentType) => (
//                 <tr key={each.studentId}>
//                   <td>
//                     {each.firstName} {each.lastName}
//                   </td>
//                   <td>{each.email}</td>
//                   <td>{each.phoneNumber}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseBasedStudents;

import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./index.css";
import Header from "../Header";
import { StudentType } from "../../Type";
import { useEffect, useState } from "react";
import Loader from "../../Loader";

const CourseBasedStudents = () => {
  const location = useLocation();
  const studentsdetails = location.state.e.students;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="course-based-student-container">
      <div>
        <Header />
      </div>
      <div>
        <Sidebar />
      </div>
      {loading ? (
        <div className="students-details-container">
          <Loader />
        </div>
      ) : studentsdetails.length === 0 ? (
        <div className="students-details-container">
          <h1>No Student Enrolled In This Course Yet.</h1>
        </div>
      ) : (
        <div className="students-details-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {studentsdetails.map((each: StudentType) => (
                <tr key={each.studentId}>
                  <td>
                    {each.firstName} {each.lastName}
                  </td>
                  <td>{each.email}</td>
                  <td>{each.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CourseBasedStudents;
