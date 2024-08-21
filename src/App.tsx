import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Student from "./components/StudentFolder/student";
import Admin from "./components/AdminFolder/Admin";
import CourseDetails from "./components/AdminFolder/CourseDetails";
import AllStudents from "./components/AdminFolder/AllStudents";
import StudentDetails from "./components/AdminFolder/StudentDetails";
import AddCourse from "./components/AdminFolder/AddCourse";
import CourseBasedStudents from "./components/AdminFolder/CourseBasedStudents";
import AllCourses from "./components/StudentFolder/AllCourse";
import StudentAllCourse from "./components/StudentFolder/StudentAllCourseDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/student" element={<Student />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/course/details" element={<CourseDetails />} />
          <Route
            path="/course-based-students"
            element={<CourseBasedStudents />}
          />
          <Route path="/allstudents" element={<AllStudents />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/all-courses" element={<AllCourses />} />
          <Route path="/course-details" element={<StudentAllCourse />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
// import Login from "./components/Login";
// import Register from "./components/Register";
// import Student from "./components/StudentFolder/student";
// import Admin from "./components/AdminFolder/Admin";
// import CourseDetails from "./components/AdminFolder/CourseDetails";
// import AllStudents from "./components/AdminFolder/AllStudents";
// import StudentDetails from "./components/AdminFolder/StudentDetails";
// import AddCourse from "./components/AdminFolder/AddCourse";
// import CourseBasedStudents from "./components/AdminFolder/CourseBasedStudents";
// import AllCourses from "./components/StudentFolder/AllCourse";
// import StudentAllCourse from "./components/StudentFolder/StudentAllCourseDetails";
// import {
//   UserProtectedRoute,
//   AdminProtectedRoute,
// } from "./components/ProtectedRoute";
// // import Home from "./components/Home";
// import PageNotFound from "./components/PageNotFound";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route element={<UserProtectedRoute />}>
//           <Route path="/student" element={<Student />} />
//           <Route path="/all-courses" element={<AllCourses />} />
//           <Route path="/course-details" element={<StudentAllCourse />} />
//         </Route>

//           <Route path="/admin" element={<Admin />} />
//           <Route path="/course/details" element={<CourseDetails />} />
//           <Route
//             path="/course-based-students"
//             element={<CourseBasedStudents />}
//           />
//           <Route path="/allstudents" element={<AllStudents />} />
//           <Route path="/student-details" element={<StudentDetails />} />
//           <Route path="/add-course" element={<AddCourse />} />
//           <Route path="*" element={<PageNotFound />} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
