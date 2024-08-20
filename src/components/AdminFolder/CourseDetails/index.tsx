import { useLocation } from "react-router-dom";
import Sidebar from "../../AdminFolder/Sidebar";
import "./index.css";
import Header from "../Header";
import { CourseDetail } from "../../Type";

const CourseDetails = () => {
  const location = useLocation();
  const details = location.state.e;

  return (
    <div className="course_details-container">
      <div>
        <Header />
      </div>
      <div>
        <Sidebar />
      </div>

      <div className="content-container">
        <h1> {details.courseName}</h1>
        <ul>
          {details.courseDetails.map((each: CourseDetail) => (
            <div key={each.courserDetailsId}>
              <h2>{each.content}</h2>
              <p className="description">{each.description}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;
