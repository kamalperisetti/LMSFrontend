// import Cookies from "js-cookie";
// import { Outlet, Navigate } from "react-router-dom";
// const ProtectedRoute = () => {
//   const jwtToken = Cookies.get("jwt_token");
//   if (jwtToken === undefined) {
//     return <Navigate to="/login" />;
//   }
//   return <Outlet />;
// };

// export default ProtectedRoute;

import Cookies from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";

export const UserProtectedRoute = () => {
  const jwtToken = Cookies.get("jwt_token");
  const details: any = localStorage.getItem("studentDetails");
  const userDetails = JSON.parse(details);
  console.log(userDetails.UserDetails, "HIIIIJIIII");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  if (userDetails && userDetails.UserDetails.role === "USER") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export const AdminProtectedRoute = () => {
  const jwtToken = Cookies.get("jwt_token");
  const details: any = localStorage.getItem("userDetails");
  const userDetails = JSON.parse(details);
  console.log(userDetails.UserDetails, "ADMIn");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  if (userDetails && userDetails.UserDetails.role === "ADMIN") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
