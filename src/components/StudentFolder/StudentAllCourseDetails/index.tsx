import Header from "../../AdminFolder/Header";
import { useAppSelector } from "../../Hooks";
import StudentSidebar from "../StudentSidebar";
import "./index.css";
import StudentCourseDetails from "../StudentCourseDetails";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { CourseDetail } from "../../Type";

const StudentAllCourse = () => {
  const student = useAppSelector((state: any) => state.adminDetails.user);
  const studentId: number = student.studentId;
  const location = useLocation();

  const courseData = location.state;
  const courseId: number = courseData.courseId;
  const token = Cookies.get("jwt_token");
  const updateTheStudentCompletedTable = async () => {
    try {
      const url = `https://lmsbackend-fhsd.onrender.com/student-completed/courseId/${courseId}`;
      const data = {
        completed: 1,
        studentId: studentId,
      };

      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "KING");
    } catch (e) {
      console.log(e);
    }
  };

  const onClickCompleted = () => {
    updateTheStudentCompletedTable();
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <StudentSidebar />
      </div>
      <div className="student-all-course-container">
        {courseData &&
        courseData.courseDetails &&
        courseData.courseDetails.length > 0 ? (
          <div className="content-container">
            <h1 className="student-content-course-heading">
              {courseData.courseName}
            </h1>
            <ul>
              {courseData.courseDetails.map((each: CourseDetail) => (
                <div key={each.courserDetailsId}>
                  <StudentCourseDetails
                    content={each.content}
                    description={each.description}
                    onClickCompleted={onClickCompleted}
                  />
                </div>
              ))}
            </ul>
          </div>
        ) : (
          <p>No course details available.</p>
        )}
      </div>
    </div>
  );
};

export default StudentAllCourse;
