import axios from "axios";
import Sidebar from "../Sidebar";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import Loader from "../../Loader";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [meterial, setMeterial] = useState(false);
  const [title, setTittle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState();
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("jwt_token");
  const defaltImage =
    "https://lh4.googleusercontent.com/proxy/DoNHTkbKc_H3qo5JuJJYI5-ONSm4faJPXC9sXDR93wQLU6S1bwGplDuMep4xI-6uqJlOYu1Uvgg";

  const addCourse = async () => {
    if (courseName) {
      setLoading(true);
      try {
        const url = "https://lmsbackend-fhsd.onrender.com/courses";
        const data = {
          courseName: courseName,
          imageUrl: defaltImage,
        };
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data, "Hello");

        setCourseId(response.data.courseId);
        setMeterial(true);
      } catch (e: any) {
        console.log(e.response, "HIIIIII");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please Provide a Course Name");
    }
  };

  const removeCourse = async () => {
    const confirmRemove = window.confirm(
      `Are Sure you wana remove Course ${courseName}`
    );
    if (confirmRemove) {
      setLoading(true);
      try {
        const url = "https://lmsbackend-fhsd.onrender.com/courses/courseName";
        const data = {
          courseName: courseName,
        };

        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 204) {
          toast.success(`${courseName} Course removed successfully!`);
          setCourseName("");
        }
      } catch (e: any) {
        console.log(e.response.data.message);
        toast.error(`${e.response.data.message} ${courseName}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const addReadingMaterial = async () => {
    if (title || description) {
      setLoading(true);
      try {
        const url = `https://lmsbackend-fhsd.onrender.com/course_details`;
        const data = {
          content: title,
          description: description,
          courseId: courseId,
        };
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Reading Material Added Successfully");
        setDescription("");
        setTittle("");
        console.log(response);
      } catch (e: any) {
        console.log(e.response.data.message);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please Provide Sub title and Description");
    }
  };

  return (
    <div className="add-course-main-container">
      <div>
        <Header />
      </div>
      <div>
        <Sidebar />
      </div>
      <div className="add-course-container">
        <h1 className="add-course-heading">Add A New Course</h1>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            <div>
              <label className="add-course-name" style={{ fontWeight: "bold" }}>
                Course Name
              </label>
              <br />
              <textarea
                required
                className="course-title-input"
                value={courseName}
                rows={10}
                cols={80}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              ></textarea>

              <br />
              <button className="add-course" onClick={addCourse}>
                Add Or Update Course
              </button>
              <button className="add-course" onClick={removeCourse}>
                Remove Course
              </button>
            </div>
            {meterial && (
              <div>
                <label
                  className="add-course-subtitle"
                  style={{ fontWeight: "bold" }}
                >
                  Sub Title
                </label>
                <br />
                <textarea
                  onChange={(e) => {
                    setTittle(e.target.value);
                  }}
                  value={title}
                  className="course-title-input"
                  required
                  rows={10}
                  cols={80}
                ></textarea>
                <br />
                <label
                  className="add-course-subtitle"
                  style={{ fontWeight: "bold" }}
                >
                  Description
                </label>
                <br />
                <textarea
                  className="course-title-input"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                  required
                  rows={10}
                  cols={80}
                ></textarea>
                <br />
                <button className="add-course" onClick={addReadingMaterial}>
                  Add Reading Material
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddCourse;
