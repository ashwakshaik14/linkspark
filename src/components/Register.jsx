// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import style from "../styles/Log.module.css";
// import logo from "../assets/bomma.png";
// import pic from "../assets/ok.png";

// function Register() {
//   const [data, setData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   });
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const handleCheckboxChange = (e) => {
//     setAcceptedTerms(e.target.checked);
//   };

//   // Updated handleSubmit to send data to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       firstname: data.firstname,
//       lastname: data.lastname,
//       email: data.email,
//       password: data.password,
//       ConfirmPassword: data.confirm_password,
//     };

//     try {
//       const response = await fetch("http://localhost:3000/api/user/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("User registered successfully", result);
//         localStorage.setItem("email", data.email); // Store email temporarily
//         navigate("/tell");
//       }
//        else {
//         console.error("Registration error:", result.error);
//       }
//     } catch (error) {
//       console.error("Error connecting to backend:", error);
//     }
//   };

//   return (
//     <div className={style.container}>
//       <div className={style.leftside}>
//         <img src={logo} alt="Logo" className={style.logo} />
//         <div className={style.formContainer}>
//           <h1 className={style.heading}>Sign Up to your Spark</h1>
//           <div className={style.acc_top}>
//             <h5>Create an account</h5>
//             <Link to="/login" className={style.forgotPassword}>
//               sign in instead
//             </Link>
//           </div>
//           <form className={style.registerForm} onSubmit={handleSubmit}>
//             <label htmlFor="firstname">First Name</label>
//             <input
//               type="text"
//               id="firstname"
//               name="firstname"
//               value={data.firstname}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="lastname">Last Name</label>
//             <input
//               type="text"
//               id="lastname"
//               name="lastname"
//               value={data.lastname}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={data.email}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={data.password}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="confirm_password">Confirm Password</label>
//             <input
//               type="password"
//               id="confirm_password"
//               name="confirm_password"
//               value={data.confirm_password}
//               onChange={handleChange}
//               required
//             />
//             <div style={{ margin: "1rem 0" }}>
//               <input
//                 type="checkbox"
//                 id="terms"
//                 name="terms"
//                 checked={acceptedTerms}
//                 onChange={handleCheckboxChange}
//                 required
//               />
//               <label htmlFor="terms">
//                 {" "}
//                 By creating an account, I agree to our Terms of Use and Privacy Policy
//               </label>
//             </div>
//             <button
//               type="submit"
//               className={style.loginButton}
//               disabled={!acceptedTerms}
//               style={{
//                 backgroundColor: acceptedTerms ? "#28A263" : "#ccc",
//                 cursor: acceptedTerms ? "pointer" : "not-allowed",
//               }}
//             >
//               Create an account
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className={style.rightside}>
//         <img src={pic} alt="Illustration" className={style.image} />
//       </div>
//     </div>
//   );
// }

// export default Register;




















import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../styles/Log.module.css";
import logo from "../assets/bomma.png";
import pic from "../assets/ok.png";

function Register() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setAcceptedTerms(e.target.checked);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!data.firstname.trim()) {
      newErrors.firstname = "First name required*";
    }
    if (!data.lastname.trim()) {
      newErrors.lastname = "Last name required*";
    }
    if (!data.email.trim()) {
      newErrors.email = "Email is required*";
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(data.email)) {
        newErrors.email = "Invalid Email*";
      }
    }
    if (!data.password.trim()) {
      newErrors.password = "Password is required*";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters*";
    }
    if (data.confirm_password !== data.password) {
      newErrors.confirm_password = "Passwords do not match*";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    const payload = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      ConfirmPassword: data.confirm_password,
    };

    try {
      const response = await fetch("https://spark-back.onrender.com/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("User registered successfully", result);
        localStorage.setItem("email", data.email);
        navigate("/tell");
      } else {
        console.error("Registration error:", result.error);
        setErrors({ server: result.error });
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setErrors({ server: "Server error, please try again later" });
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftside}>
        <img src={logo} alt="Logo" className={style.logo} />
        <div className={style.formContainer}>
          <h1 className={style.heading}>Sign Up to your Spark</h1>
          <div className={style.acc_top}>
            <h5>Create an account</h5>
            <Link to="/login" className={style.forgotPassword}>
              sign in instead
            </Link>
          </div>
          <form className={style.registerForm} onSubmit={handleSubmit}>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={data.firstname}
              onChange={handleChange}
            />
            {errors.firstname && <p className={style.error}>{errors.firstname}</p>}<br/>

            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={data.lastname}
              onChange={handleChange}
            />
            {errors.lastname && <p className={style.error}>{errors.lastname}</p>}<br/>

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            {errors.email && <p className={style.error}>{errors.email}</p>}<br/>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {errors.password && <p className={style.error}>{errors.password}</p>}<br/>

            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={data.confirm_password}
              onChange={handleChange}
            />
            {errors.confirm_password && (
              <p className={style.error}>{errors.confirm_password}</p>
            )}
          
          
            <div style={{ margin: "1rem 0"}}>
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={acceptedTerms}
                onChange={handleCheckboxChange}
                required
              />
              <label htmlFor="terms">
                {" "}
                By creating an account, I agree to our Terms of Use and Privacy Policy
              </label>
            </div>
            <button
              type="submit"
              className={style.loginButton}
              disabled={!acceptedTerms}
              style={{
                backgroundColor: acceptedTerms ? "#28A263" : "#ccc",
                cursor: acceptedTerms ? "pointer" : "not-allowed",
              }}
            >
              Create an account
            </button>
          </form>
        </div>
      </div>
      <div className={style.rightside}>
        <img src={pic} alt="Illustration" className={style.image} />
      </div>
    </div>
  );
}

export default Register;
