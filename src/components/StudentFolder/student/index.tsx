import { useEffect, useState } from "react";
import "./index.css";
import { useAppDispatch } from "../../Hooks";
import { addCourse } from "../../../redex/allStudents";
import Header from "../../AdminFolder/Header";
import StudentSidebar from "../StudentSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { addAdmin } from "../../../redex/admin";
import { CourseDetail } from "../../Type";
import Loader from "../../Loader";

// Interfaces
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

const Student = () => {
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    fetchUpdatedStudentData();
  }, []);

  const fetchUpdatedStudentData = async () => {
    setIsLoading(true);
    try {
      const storedUserDetails = localStorage.getItem("studentDetails");
      if (!storedUserDetails) {
        throw new Error("No stored user details found");
      }
      const parsedData = JSON.parse(storedUserDetails);
      const studentId = parsedData.UserDetails.studentId;

      const url = `https://lmsbackend-fhsd.onrender.com/userbyid/${studentId}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(addAdmin(response.data.UserDetails));
      setStudent(response.data.UserDetails);
      localStorage.setItem(
        "studentDetails",
        JSON.stringify({
          ...parsedData,
          UserDetails: response.data.UserDetails,
        })
      );
    } catch (error) {
      console.error("Failed to fetch updated student data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToCourseDetails = (course: Course) => {
    dispatch(addCourse(course));
    navigate("/course-details", { state: course });
  };

  if (isLoading || !student) {
    return <Loader />;
  }

  const courses: Course[] = student.courses.map((course: Course) => {
    const progress: Progress = student.studentsCompleted.find(
      (progress: any) => progress.courseId === course.courseId
    );
    return {
      ...course,
      progress: progress ? progress : { completed: 0, totalContent: 0 },
    };
  });

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="students-main-container">
      <div>
        <Header />
      </div>
      <div>
        <StudentSidebar />
      </div>
      <div className="student-enrolled-course-container">
        {courses.length === 0 ? (
          <div>
            <h1>Student Not Enrolled In Any Course Yet.</h1>
          </div>
        ) : (
          <div className="container-students-main">
            <h1
              className="enrolled-courses-heading"
              style={{ textAlign: "center", margin: "0px 0px 50px 0px" }}
            >
              My Enrolled Courses
            </h1>
            <div className="dashboard-container">
              {courses.map((course: Course) => (
                <div
                  className="course-progress-container"
                  key={course.courseId}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                    cursor: "pointer",
                  }}
                  onClick={() => navigateToCourseDetails(course)}
                >
                  <div className="student-displays-dashboard">
                    {" "}
                    <img
                      className="student-course-image"
                      src={course.imageUrl}
                      alt={course.courseName}
                    />
                    <div className="course-info">
                      <h3 className="course-name">{course.courseName}</h3>
                      <div className="progress-info">
                        <p className="course-completed-para">
                          Total Content:{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {course.progress.totalContent}
                          </span>
                        </p>
                        <p className="course-completed-para">
                          Completed:{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {course.progress.completed}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="course-graph">
                    <PieChart width={120} height={200}>
                      <Pie
                        data={[
                          {
                            name: "Completed",
                            value: course.progress.completed,
                          },
                          {
                            name: "Remaining",
                            value:
                              course.progress.totalContent -
                              course.progress.completed,
                          },
                        ]}
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        layout="horizontal"
                        align="center"
                        iconType="circle"
                        formatter={(value) => (
                          <span style={{ fontSize: "0.8rem" }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </div>
                  <div className="course-graph-mobile">
                    <PieChart width={135} height={195}>
                      <Pie
                        data={[
                          {
                            name: "Completed",
                            value: course.progress.completed,
                          },
                          {
                            name: "Remaining",
                            value:
                              course.progress.totalContent -
                              course.progress.completed,
                          },
                        ]}
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        layout="horizontal"
                        align="center"
                        iconType="circle"
                        formatter={(value) => (
                          <span style={{ fontSize: "0.8rem" }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Student;
