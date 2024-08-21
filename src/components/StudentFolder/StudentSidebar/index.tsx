import { useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { MdSpaceDashboard } from "react-icons/md";
import { HiMiniWallet } from "react-icons/hi2";
import { RiLogoutBoxFill } from "react-icons/ri";
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
    const confirmDelete = window.confirm(`Are you sure you want to Logout?`);
    if (confirmDelete) {
      Cookies.remove("jwt_token");
      navigate("/login");
    }
  };
  return (
    <div>
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
            <p>Welcome User Name 🧑‍💻</p>
          ) : (
            <p>
              Welcome {student.firstName} {student.lastName} 🧑‍💻
            </p>
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
            <MdSpaceDashboard /> Dashboard
          </p>
          <p
            className={`sidebar-elements ${
              location.pathname === "/all-courses" && "active"
            }`}
            onClick={() => {
              navigate("/all-courses");
            }}
          >
            <HiMiniWallet />
            All Courses
          </p>
          <p onClick={handleLogOut} className="sidebar-elements">
            <RiLogoutBoxFill /> Logout 👋
          </p>
        </div>
        <div></div>
      </div>
      <div className="side-bar-container-mobile">
        <div className="profile-details">
          {student === null ? (
            <p className="sidebar-title-mobile">Welcome User Name 🧑‍💻</p>
          ) : (
            <p className="sidebar-title-mobile">
              Welcome {student?.firstName} {student?.lastName} 🧑‍💻
            </p>
          )}
        </div>
        <div className="sidebar-element-container-mobile">
          <p
            className={`sidebar-elements-mobile ${
              location.pathname === "/student" && "active-mobile"
            }`}
            onClick={() => {
              navigate("/student");
            }}
          >
            <MdSpaceDashboard />
          </p>
          <p
            className={`sidebar-elements-mobile ${
              location.pathname === "/all-courses" && "active-mobile"
            }`}
            onClick={() => {
              navigate("/all-courses");
            }}
          >
            <HiMiniWallet />
          </p>

          <p onClick={handleLogOut} className="sidebar-elements-mobile">
            <RiLogoutBoxFill />
          </p>
        </div>
      </div>
    </div>
  );
};
export default StudentSidebar;
