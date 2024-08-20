import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./index.css";
import Header from "../Header";
import { CourseDetail } from "../../Type";

interface Course {
  courseId: number;
  courseName: string;
  imageUrl: string;
  courseDetails: CourseDetail[];
  progress: Progress;
}
interface Progress {
  completed: number;
  courseId: number;
  studentCompletedId: number;
  studentId: number;
  totalContent: number;
}
interface CourseDetails {
  courseName: string;
  totalContent: number;
  completed: number;
}
const StudentDetails = () => {
  const location = useLocation();
  const studentDetails = location.state;

  const courses = studentDetails.courses;
  const studentsCompleted = studentDetails.studentsCompleted;
  const profileImage = studentDetails.imageUrl
    ? studentDetails.imageUrl
    : "https://cdn5.vectorstock.com/i/1000x1000/52/54/male-student-graduation-avatar-profile-vector-12055254.jpg";
  const dataa = courses.map((each: Course) => {
    const progress = studentsCompleted.find(
      (progress: Progress) => progress.courseId === each.courseId
    );
    return {
      courseName: each.courseName,
      totalContent: each.courseDetails.length,
      completed: progress ? progress.completed : 0,
    };
  });
  console.log(dataa, "JULIIII");
  return (
    <div className="single-student-details-main-container">
      <div>
        <Header />
      </div>
      <div>
        <Sidebar />
      </div>
      <div className="single-student-details-container">
        <div className="student-profile-details">
          <img className="student-image" src={profileImage} alt="Student" />
          <p>
            <span style={{ fontWeight: "bold" }}>Name : </span>
            {studentDetails.firstName} {studentDetails.lastName}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Phone Number : </span>
            {studentDetails.phoneNumber}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>Email : </span>
            {studentDetails.email}
          </p>
        </div>
        <div>
          <h1>Enrolled Courses</h1>
          <hr />
          {studentDetails.courses.length === 0 && (
            <h1>Student Not Enrolled In Any Course</h1>
          )}
          {dataa.map((data: CourseDetails) => (
            <div key={data.courseName}>
              <h2>Course Name: {data.courseName}</h2>
              <p>Total Content: {data.totalContent}</p>
              <p>Completed: {data.completed}</p>

              <BarChart
                width={600}
                height={300}
                data={[data]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="courseName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalContent" fill="#8884d8" />
                <Bar dataKey="completed" fill="#82ca9d" />
              </BarChart>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
