import { Link } from "react-router-dom";
import axios from "axios";
import { FormEvent, useState } from "react";
import "./index.css";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader";
const Register = () => {
  const [hidePassword, setHidePassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const showPassword = () => {
    setHidePassword((hidePassword) => !hidePassword);
  };

  const registerTheUserToDatabase = async () => {
    const url = "https://lmsbackend-fhsd.onrender.com/register";
    const data = {
      firstName: firstName,
      lastName: lastName,
      username: userName,
      phoneNumber: phonenumber,
      email: email,
      role: "USER",
      password: password,
    };
    try {
      setIsLoading(true);
      const response = await axios.post(url, data);
      if (response.status == 200) {
        setIsLoading(false);
        toast.success("Student Registerd Successfully Please Login");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setUserName("");
        setFirstName("");
        setLastName("");
      }
    } catch (e: any) {
      setIsLoading(false);
      toast.error(e.response.data);
      console.log(e.response.data);
    }
  };

  const validateTheUser = (e: FormEvent) => {
    e.preventDefault();

    registerTheUserToDatabase();
  };
  return (
    <div>
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="register-container register">
          <div>
            <img
              className="register-image"
              src="https://res.cloudinary.com/dymvamc30/image/upload/v1723035330/rag-doll-with-blue-cap-checklist_imhfwd.jpg"
              alt="login-image"
            />
          </div>
          <form
            onSubmit={validateTheUser}
            className="register-details-container"
          >
            <div>
              <h1 className="register-heading">Student Register Form</h1>
              <div className="register-con">
                <label className="label" htmlFor="phone">
                  First Name
                </label>
                <br />
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  value={firstName}
                  className="login-inputs"
                  id="phone"
                  type="text"
                  placeholder="Please Enter Phonenumber"
                />
              </div>
              <div className="register-con">
                <label className="label" htmlFor="phone">
                  Last Name
                </label>
                <br />
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  value={lastName}
                  className="login-inputs"
                  id="phone"
                  type="text"
                  placeholder="Please Enter Phonenumber"
                />
              </div>
              <div className="register-con">
                <label className="label" htmlFor="phone">
                  User Name
                </label>
                <br />
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  value={userName}
                  className="login-inputs"
                  id="phone"
                  type="text"
                  placeholder="Please Enter Phonenumber"
                />
              </div>
              <div className="register-con">
                <label className="label" htmlFor="phone">
                  Email
                </label>
                <br />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  value={email}
                  className="login-inputs"
                  id="phone"
                  type="text"
                  placeholder="Please Enter Phonenumber"
                />
              </div>
              <div className="register-con">
                <label className="label" htmlFor="phone">
                  Phone Number
                </label>
                <br />
                <input
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  value={phonenumber}
                  className="login-inputs"
                  id="phone"
                  type="text"
                  placeholder="Please Enter Phonenumber"
                />
              </div>

              <div className="password-con register-pass">
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="password-icon">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-inputs"
                    type={hidePassword ? "text" : "password"}
                    placeholder="Please Enter Password"
                  />

                  {hidePassword ? (
                    <FaRegEye className="eye-icon" onClick={showPassword} />
                  ) : (
                    <FaEyeSlash className="eye-icon" onClick={showPassword} />
                  )}
                </div>
              </div>
            </div>
            {/* <p style={{ textAlign: "center", fontWeight: "bold" }}>{message}</p> */}

            <div className="login-btn-container">
              <button className="login-btn" type="submit">
                Register
              </button>
              <Link to="/login">
                <button className="login-btn" type="button">
                  Login
                </button>
              </Link>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Register;
