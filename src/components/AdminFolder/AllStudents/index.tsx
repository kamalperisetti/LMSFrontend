// import axios from "axios";
// import { useEffect, useState } from "react";
// import Sidebar from "../Sidebar";
// import "./index.css";
// import { useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Header from "../Header";
// import Cookies from "js-cookie";
// import { StudentType } from "../../Type";

// const AllStudents = () => {
//   const [students, setStudents] = useState<[]>([]);
//   const token = Cookies.get("jwt_token");
//   const navigate = useNavigate();
//   const getAllTheStudents = async () => {
//     const url = "https://lmsbackend-fhsd.onrender.com/all-users";
//     try {
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.status == 200) {
//         const data = response.data;
//         const filtered = data.filter(
//           (each: StudentType) => each.role !== "ADMIN"
//         );
//         setStudents(filtered);
//       }
//     } catch (e: any) {
//       console.log(e.response);
//     }
//   };
//   useEffect(() => {
//     getAllTheStudents();
//   }, []);
//   const notify = () => {
//     toast.success("Student removed successfully!");
//   };

//   const removeStudent = async (each: StudentType) => {
//     console.log(each);
//     const confirmDelete = window.confirm(
//       `Are you sure you want to delete ${each.firstName} ${each.lastName}}?`
//     );
//     if (confirmDelete) {
//       try {
//         const url = `https://lmsbackend-fhsd.onrender.com/users/${each.studentId}`;
//         const response = await axios.delete(url, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (response.status == 200) {
//           notify();
//           getAllTheStudents();
//         }
//         console.log(response);
//       } catch (e: any) {
//         console.log(e.response.data.message);
//       }
//     }
//   };

//   return (
//     <div className="all-students-container">
//       <div>
//         <Header />
//       </div>
//       <div>
//         <Sidebar />
//       </div>
//       <div className="students-details-container">
//         <table className="student-table">
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Details</th>
//               <th>Remove Student</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((each: StudentType) => (
//               <tr key={each.studentId}>
//                 <td>
//                   {each.firstName} {each.lastName}
//                 </td>
//                 <td>{each.email}</td>
//                 <td>{each.phoneNumber}</td>
//                 <td>
//                   <button
//                     className="button"
//                     onClick={() =>
//                       navigate("/student-details", { state: each })
//                     }
//                   >
//                     View Details
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     className="delete-icon"
//                     onClick={() => removeStudent(each)}
//                   >
//                     <MdDelete />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AllStudents;

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";
import Cookies from "js-cookie";
import { StudentType } from "../../Type";
import Loader from "../../Loader";

const AllStudents = () => {
  const [students, setStudents] = useState<StudentType[]>([]);
  const [loading, setLoading] = useState(true); // State for loading
  const token = Cookies.get("jwt_token");
  const navigate = useNavigate();

  const getAllTheStudents = async () => {
    const url = "https://lmsbackend-fhsd.onrender.com/all-users";
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        const data = response.data;
        const filtered = data.filter(
          (each: StudentType) => each.role !== "ADMIN"
        );
        setStudents(filtered);
      }
    } catch (e: any) {
      console.log(e.response);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    getAllTheStudents();
  }, []);

  const notify = () => {
    toast.success("Student removed successfully!");
  };

  const removeStudent = async (each: StudentType) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${each.firstName} ${each.lastName}?`
    );
    if (confirmDelete) {
      try {
        const url = `https://lmsbackend-fhsd.onrender.com/users/${each.studentId}`;
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          notify();
          getAllTheStudents();
        }
      } catch (e: any) {
        console.log(e.response.data.message);
      }
    }
  };

  return (
    <div className="all-students-container">
      <div>
        <Header />
      </div>
      <div>
        <Sidebar />
      </div>
      <div className="students-details-container">
        {loading ? (
          <Loader /> // Show loader while loading
        ) : (
          <table className="student-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Details</th>
                <th>Remove Student</th>
              </tr>
            </thead>
            <tbody>
              {students.map((each: StudentType) => (
                <tr key={each.studentId}>
                  <td>
                    {each.firstName} {each.lastName}
                  </td>
                  <td>{each.email}</td>
                  <td>{each.phoneNumber}</td>
                  <td>
                    <button
                      className="button"
                      onClick={() =>
                        navigate("/student-details", { state: each })
                      }
                    >
                      View Details
                    </button>
                  </td>
                  <td>
                    <button
                      className="delete-icon"
                      onClick={() => removeStudent(each)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllStudents;
