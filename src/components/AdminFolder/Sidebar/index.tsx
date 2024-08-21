import { useNavigate } from "react-router-dom";
import "./index.css";
import Cookies from "js-cookie";
import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { ImBoxAdd } from "react-icons/im";
const Sidebar = () => {
  const navigate = useNavigate();

  const storedUserDetails: any = localStorage.getItem("userDetails");
  // console.log(storedUserDetails, "MY THINGS");
  const parsedData = JSON.parse(storedUserDetails);
  // console.log(parsedData.UserDetails, "From Local Storage");
  const adminD = parsedData.UserDetails;

  // console.log(adminD);
  const imageUrl = adminD?.imageUrl
    ? adminD?.imageUrl
    : "https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg";

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
          {adminD === null ? (
            <img
              className="profile-pic"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXas_90ZgA-Bj4mzwnuWDcJUDhOuizjL4NQ&s"
              alt="Profile Pic"
            />
          ) : (
            <img className="profile-pic" src={imageUrl} alt="Profile Pic" />
          )}
          {adminD === null ? (
            <p className="sidebar-title">Welcome User Name 🧑‍💻</p>
          ) : (
            <p className="sidebar-title">
              Welcome {adminD?.firstName} {adminD?.lastName} 🧑‍💻
            </p>
          )}
        </div>
        <div className="sidebar-element-container">
          <p
            className={`sidebar-elements ${
              location.pathname === "/admin" && "active"
            }`}
            onClick={() => {
              navigate("/admin");
            }}
          >
            <MdSpaceDashboard /> Dashboard
          </p>
          <p
            className={`sidebar-elements ${
              location.pathname === "/allstudents" && "active"
            }`}
            onClick={() => {
              navigate("/allstudents");
            }}
          >
            <PiStudentFill /> All Students
          </p>
          <p
            className={`sidebar-elements ${
              location.pathname === "/add-course" && "active"
            }`}
            onClick={() => {
              navigate("/add-course");
            }}
          >
            <ImBoxAdd /> Add / Remove Courses
          </p>
        </div>
        <div>
          <p onClick={handleLogOut} className="sidebar-elements">
            👋 Logout
          </p>
        </div>
      </div>
      <div className="side-bar-container-mobile">
        <div className="profile-details">
          {adminD === null ? (
            <p className="sidebar-title-mobile">Welcome User Name 🧑‍💻</p>
          ) : (
            <p className="sidebar-title-mobile">
              Welcome {adminD?.firstName} {adminD?.lastName} 🧑‍💻
            </p>
          )}
        </div>
        <div className="sidebar-element-container-mobile">
          <p
            className={`sidebar-elements-mobile ${
              location.pathname === "/admin" && "active-mobile"
            }`}
            onClick={() => {
              navigate("/admin");
            }}
          >
            <MdSpaceDashboard />
          </p>
          <p
            className={`sidebar-elements-mobile ${
              location.pathname === "/allstudents" && "active-mobile"
            }`}
            onClick={() => {
              navigate("/allstudents");
            }}
          >
            <PiStudentFill />
          </p>
          <p
            className={`sidebar-elements-mobile ${
              location.pathname === "/add-course" && "active-mobile"
            }`}
            onClick={() => {
              navigate("/add-course");
            }}
          >
            <ImBoxAdd />
          </p>
          <p onClick={handleLogOut} className="sidebar-elements-mobile">
            👋
          </p>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
