import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import Sidebar from "../StudentSidebar";
import Header from "../../AdminFolder/Header";
import { useAppDispatch } from "../../Hooks";
import { addAdmin } from "../../../redex/admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { Course } from "../../Type";
import Loader from "../../Loader";

const AllCourses = () => {
  const [course, setCourse] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const storedUserDetails: any = localStorage.getItem("studentDetails");
  const parsedData = JSON.parse(storedUserDetails);
  const student = parsedData.UserDetails;
  const courseIds: number[] = [];

  student.courses.map((each: Course) => courseIds.push(each.courseId));
  const token = Cookies.get("jwt_token");

  const fetchingTheData = async () => {
    const url = "https://lmsbackend-fhsd.onrender.com/courses";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCourse(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchingTheData();
  }, []);

  const enrollingOnCourse = async (each: Course) => {
    courseIds.push(each.courseId);
    try {
      const url = `https://lmsbackend-fhsd.onrender.com/student-completed`;
      const data = {
        studentId: student.studentId,
        courseId: each.courseId,
        totalContent: each.courseDetails.length,
      };
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (e) {
      console.log(e, "EEEEEEE");
    }

    try {
      const url = `https://lmsbackend-fhsd.onrender.com/course-adding/${student.studentId}`;
      const data = {
        courses: courseIds.map((courseId) => ({
          courseId: courseId,
        })),
      };

      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Enrolled Successfully");
      }
      dispatch(addAdmin(response.data));
    } catch (e) {
      console.log(e, "lllllll");
    }
  };

  return (
    <div className="main-container">
      <div>
        <Header />
      </div>
      <div>
        <Sidebar />
      </div>

      <div className="content-container">
        {loading ? (
          <Loader />
        ) : (
          <div className="course-title-container">
            {course.map((each: Course) => (
              <div key={each.courseId}>
                <div className="individual-course-container-student individual-course-container">
                  <img
                    className="course-image-student "
                    src={each.imageUrl}
                    alt={each.courseName}
                  />
                  <p className="enrole-course-title">{each.courseName}</p>
                  <button
                    className="enroll-btn"
                    onClick={() => enrollingOnCourse(each)}
                  >
                    Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllCourses;
