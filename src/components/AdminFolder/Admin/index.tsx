import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Sidebar from "../Sidebar";
import { useAppSelector } from "../../Hooks";
import Header from "../Header";
import Cookies from "js-cookie";
import { Course } from "../../Type";
import Loader from "../../Loader";

const Admin = () => {
  const [course, setCourse] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const adminDetails = useAppSelector((state: any) => state.adminDetails.user);
  const navigate = useNavigate();
  const token = Cookies.get("jwt_token");

  const fetchingTheData = async () => {
    try {
      const url = "https://lmsbackend-fhsd.onrender.com/courses";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourse(response.data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingTheData();
  }, []);

  const navigateToCourseDetails = (e: Course) => {
    navigate("/course/details", { state: { e, adminDetails } });
  };

  const navigateStudents = (e: Course) => {
    navigate("/course-based-students", { state: { e } });
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
                <div
                  className="individual-course-container"
                  onClick={() => navigateToCourseDetails(each)}
                >
                  {each.imageUrl ? (
                    <img
                      className="course-image"
                      src={each.imageUrl}
                      alt={each.courseName}
                    />
                  ) : (
                    <img
                      className="course-image"
                      src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg"
                      alt={each.courseName}
                    />
                  )}
                  <p>{each.courseName}</p>
                </div>
                <div>
                  <p
                    className="enrolled"
                    onClick={() => navigateStudents(each)}
                  >
                    Students Enrolled In This Course ➡️
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
