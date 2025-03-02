// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import style from "../styles/Log.module.css";
// import logo from "../assets/bomma.png";
// import pic from "../assets/ok.png";

// function Login() {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3000/api/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         // If the response is not OK, log the error text
//         const errorText = await response.text();
//         console.error("Error logging in:", errorText);
//         return;
//       }
//       const result = await response.json();
//       console.log("Logged in successfully", result);
//       // Save token and email in localStorage for later use
//       localStorage.setItem("token", result.token);
//       localStorage.setItem("email", data.email);
//       // Navigate to dashboard or Tell page, depending on your app flow
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Error connecting to backend:", error);
//     }
//   };

//   return (
//     <div className={style.container}>
//       {/* Left Side */}
//       <div className={style.leftside}>
//         <img src={logo} alt="Logo" className={style.logo} />
//         <div className={style.formContainer}>
//           <h1 className={style.heading}>Sign in to your Spark</h1>
//           <form className={style.registerForm} onSubmit={handleSubmit}>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Spark/ Username"
//               value={data.email}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Password"
//               value={data.password}
//               onChange={handleChange}
//               required
//             />
//             <button type="submit" className={style.loginButton}>
//               Log in
//             </button>
//           </form>
//           <Link to="/" className={style.forgotPassword}>
//             Forgot Password?
//           </Link>
//           <p className={style.signupText}>
//             Don’t have an account?{" "}
//             <Link to="/register" className={style.signupLink}>
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className={style.rightside}>
//         <img src={pic} alt="Illustration" className={style.image} />
//       </div>
//     </div>
//   );
// }

// export default Login;














import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Log.module.css";
import logo from "../assets/bomma.png";
import pic from "../assets/ok.png";

function Login() {
  const [data, setData] = useState({
    emailOrUsername: "", // ✅ Updated field name
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://spark-back.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error logging in:", errorText);
        return;
      }

      const result = await response.json();
      console.log("Logged in successfully", result);

      // ✅ Store token, username, and email in localStorage
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.email);
      localStorage.setItem("username", result.username);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error connecting to backend:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftside}>
        <img src={logo} alt="Logo" className={style.logo} />
        <div className={style.formContainer}>
          <h1 className={style.heading}>Sign in to your Spark</h1>
          <form className={style.registerForm} onSubmit={handleSubmit}>
            <input
              type="text" // ✅ Changed from email to text
              id="emailOrUsername"
              name="emailOrUsername"
              placeholder="Spark/ Username"
              value={data.emailOrUsername}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className={style.loginButton}>Log in</button>
          </form>
          <Link to="/" className={style.forgotPassword}>Forgot Password?</Link>
          <p className={style.signupText}>
            Don’t have an account?{" "}
            <Link to="/register" className={style.signupLink}>Sign up</Link>
          </p>
        </div>
      </div>
      <div className={style.rightside}>
        <img src={pic} alt="Illustration" className={style.image} />
      </div>
    </div>
  );
}

export default Login;
