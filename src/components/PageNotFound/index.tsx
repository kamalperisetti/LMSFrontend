import { useNavigate } from "react-router-dom";
import Header from "../AdminFolder/Header";
import "./index.css";
const PageNotFound = () => {
  const navigate = useNavigate();
  const storedUserDetails: any = localStorage.getItem("userDetails");
  const parsedData = JSON.parse(storedUserDetails);
  const details = parsedData.UserDetails;
  let role;
  if (details.role === "USER") {
    role = "/student";
  } else {
    role = "/admin";
  }
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="page-not-found">
        <img
          className="notfound-image"
          src="https://www.cloudns.net/blog/wp-content/uploads/2023/10/Error-404-Page-Not-Found.png"
          alt="Not Found"
        />
        <button
          className="add-course"
          onClick={() => {
            navigate(role);
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
