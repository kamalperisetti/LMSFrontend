import { useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
const StudentSidebar = () => {
  const navigate = useNavigate();
  const storedUserDetails: any = localStorage.getItem("studentDetails");
  const parsedData = JSON.parse(storedUserDetails);
  const student = parsedData.UserDetails;

  const profilePic =
    student.imageUrl !== "null"
      ? "https://i.pngimg.me/thumb/f/720/c3f2c592f9.jpg"
      : student.imageUrl;
  const handleLogOut = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  return (
    <div className="side-bar-container">
      <div className="profile-details">
        {student === null ? (
          <img
            className="profile-pic"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXas_90ZgA-Bj4mzwnuWDcJUDhOuizjL4NQ&s"
            alt="Profile Pic"
          />
        ) : (
          <img className="profile-pic" src={profilePic} alt="Profile Pic" />
        )}
        {student === null ? (
          <h4>Welcome User Name 🧑‍💻</h4>
        ) : (
          <h4>
            Welcome {student.firstName} {student.lastName} 🧑‍💻
          </h4>
        )}
      </div>
      <hr />
      <div style={{ margin: "50px 0px 0px 20px" }}>
        <p
          className={`sidebar-elements ${
            location.pathname === "/student" && "active"
          }`}
          onClick={() => {
            navigate("/student");
          }}
        >
          Dashboard
        </p>
        <p
          className={`sidebar-elements ${
            location.pathname === "/all-courses" && "active"
          }`}
          onClick={() => {
            navigate("/all-courses");
          }}
        >
          All Courses
        </p>
        <p onClick={handleLogOut} className="sidebar-elements">
          Logout 👋
        </p>
      </div>
      <div></div>
    </div>
  );
};
export default StudentSidebar;
