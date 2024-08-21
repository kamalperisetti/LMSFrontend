import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import "./index.css";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "../Hooks";
import axios, { AxiosResponse } from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAdmin } from "../../redex/admin";
import Cookies from "js-cookie";
import Loader from "../Loader";

const Login = () => {
  const [hide, setHide] = useState<boolean>(false);
  const [phonenumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("student");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showPassword = () => {
    setHide(!hide);
  };

  const checkingIsValidUser = async () => {
    const url = `https://lmsbackend-fhsd.onrender.com/login`;

    const details = {
      username: phonenumber,
      password: password,
    };

    try {
      setLoading(true);
      const response: AxiosResponse<any> = await axios.post(url, details);

      if (role === "student" && response.data.UserDetails.role === "USER") {
        dispatch(addAdmin(response.data.UserDetails));
        localStorage.setItem("studentDetails", JSON.stringify(response.data));

        console.log(response.data.UserDetails, "Details");
        if (response.status === 200) {
          Cookies.set("jwt_token", response.data.access_token);
          setLoading(false);
          navigate(`/${role}`, { state: response.data });
        }
      } else if (
        role === "admin" &&
        response.data.UserDetails.role === "ADMIN"
      ) {
        dispatch(addAdmin(response.data.UserDetails));
        Cookies.set("jwt_token", response.data.access_token);
        setLoading(false);
        localStorage.setItem("userDetails", JSON.stringify(response.data));

        if (response.status === 200) {
          navigate(`/${role}`, { state: response.data });
        }
      } else {
        toast.error("Please Check Role Again ");
      }
    } catch (e: any) {
      setLoading(false);
      console.log(e);
      toast.error("Please Check For The Credentials");
    }
  };

  const validateTheUser = (e: FormEvent) => {
    e.preventDefault();
    checkingIsValidUser();
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="login-container">
          <div className="image-container">
            <img
              className="login-image"
              src="https://res.cloudinary.com/dymvamc30/image/upload/v1723035328/7973703_3807931_ayjwee.jpg"
              alt="login-image"
            />
          </div>
          <form onSubmit={validateTheUser} className="user-details-container">
            <div>
              <label className="label" htmlFor="phone">
                User Name
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

            <div className="password-con">
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="password-icon">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="login-inputs"
                  type={hide ? "text" : "password"}
                  placeholder="Please Enter Password"
                />

                {hide ? (
                  <FaRegEye className="eye-icon" onClick={showPassword} />
                ) : (
                  <FaEyeSlash className="eye-icon" onClick={showPassword} />
                )}
              </div>
            </div>
            <div>
              <label className="label">Role</label>
              <br />
              <select
                value={role}
                className="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <button className="login-btn" type="submit" disabled={loading}>
                Login
              </button>
              <Link to="/register">
                <button className="login-btn" type="button" disabled={loading}>
                  Register
                </button>
              </Link>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Login;
