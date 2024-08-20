// import { Link } from "react-router-dom";
// import axios from "axios";
// import { FormEvent, useState } from "react";
// import "./index.css";
// import { FaRegEye } from "react-icons/fa";
// import { FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const Register = () => {
//   const [hidePassword, setHidePassword] = useState<boolean>(false);
//   const [userName, setUserName] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [phonenumber, setPhoneNumber] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const showPassword = () => {
//     setHidePassword((hidePassword) => !hidePassword);
//   };

//   // const registerTheUserToDatabase = async () => {
//   //   const url = "https://lmsbackend-fhsd.onrender.com/register";
//   //   const data = {
//   //     studentName: userName,
//   //     phoneNumber: phonenumber,
//   //     email: email,
//   //     password: password,
//   //   };
//   //   try {
//   //     const response = await axios.post(url, data);
//   //     if (response.status == 200) {
//   //       toast.success("Student Registerd Successfully Please Login");
//   //       setEmail("");
//   //       setPassword("");
//   //       setPhoneNumber("");
//   //       setUserName("");
//   //     }
//   //   } catch (e: any) {
//   //     console.log("HEllo");
//   //     if (e.response) {
//   //       // Server responded with an error
//   //       toast.error(e.response.data || "An error occurred. Please try again.");
//   //     } else {
//   //       // Network or other errors
//   //       toast.error("An error occurred. Please try again.");
//   //     }
//   //     console.log("Error:", e);
//   //   }
//   // };

//   const validateTheUser = (e: FormEvent) => {
//     console.log("AKND");
//     e.preventDefault();
//     console.log("JIII");
//     // registerTheUserToDatabase();
//   };

//   const buttonClicked = () => {
//     console.log("Hello");
//   };
//   return (
//     <div className="login-container">
//       <div>
//         <img
//           className="login-image"
//           src="https://res.cloudinary.com/dymvamc30/image/upload/v1723035330/rag-doll-with-blue-cap-checklist_imhfwd.jpg"
//           alt="login-image"
//         />
//       </div>
//       <form onSubmit={validateTheUser} className="user-details-container">
//         <div>
//           <div>
//             <label className="label" htmlFor="username">
//               User name
//             </label>
//             <br />
//             <input
//               required
//               className="login-inputs"
//               id="username"
//               onChange={(e) => {
//                 setUserName(e.target.value);
//               }}
//               value={userName}
//               type="text"
//               placeholder="username..."
//             />
//           </div>
//           <br />
//           <div>
//             <label className="label" htmlFor="email">
//               Email
//             </label>
//             <br />
//             <input
//               required
//               className="login-inputs"
//               value={email}
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               id="email"
//               type="email"
//               placeholder="userofall@use.com"
//             />
//           </div>
//           <br />
//           <div>
//             <label className="label" htmlFor="phone">
//               Phone Number
//             </label>
//             <br />
//             <input
//               required
//               className="login-inputs"
//               value={phonenumber}
//               onChange={(e) => {
//                 setPhoneNumber(e.target.value);
//               }}
//               id="phone"
//               type="text"
//               placeholder="Please Enter Phonenumber"
//             />
//           </div>
//           <br />
//           <div>
//             <label className="label" htmlFor="password">
//               Password
//             </label>
//             <div className="password-icon">
//               <input
//                 required
//                 className="login-inputs"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//                 type={hidePassword ? "text" : "password"}
//                 placeholder="Please Enter Password"
//               />
//               <div>
//                 {hidePassword ? (
//                   <FaRegEye className="eye-icon" onClick={showPassword} />
//                 ) : (
//                   <FaEyeSlash className="eye-icon" onClick={showPassword} />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <p style={{ textAlign: "center", fontWeight: "bold" }}>{message}</p> */}
//         <br />
//         <div className="login-btn-container">
//           <button className="login-btn" type="submit">
//             Register
//           </button>
//           <Link to="/login">
//             <button className="login-btn" type="button">
//               Login
//             </button>
//           </Link>
//           <button onClick={buttonClicked}>BBBB</button>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Register;
