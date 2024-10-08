import { FaRegCheckCircle } from "react-icons/fa";
import "./index.css";
import { useState } from "react";

const StudentCourseDetails = ({
  content,
  description,
  onClickCompleted,
}: {
  content: string;
  description: string;
  onClickCompleted: () => void;
}) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleButtonClick = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      onClickCompleted();
    }
  };

  return (
    <div>
      <h2 className="student-content-side-heading">{content}</h2>
      <p className="student-content-description">{description}</p>
      <button
        className={isCompleted ? "completed active" : "completed"}
        onClick={handleButtonClick}
      >
        Completed
        <FaRegCheckCircle />
      </button>
    </div>
  );
};

export default StudentCourseDetails;
