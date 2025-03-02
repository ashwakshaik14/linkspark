import { useState } from "react";
import style from "../styles/Log.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/bomma.png";
import pic from "../assets/ok.png";

function Tell() {
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  // Categories defined inline
  const categories = [
    { id: "business", label: "Business", icon: "💼" },
    { id: "creative", label: "Creative", icon: "🎨" },
    { id: "education", label: "Education", icon: "📚" },
    { id: "entertainment", label: "Entertainment", icon: "🎶" },
    { id: "fashion", label: "Fashion & Beauty", icon: "💄" },
    { id: "food", label: "Food & Beverage", icon: "🍔" },
    { id: "government", label: "Government & Politics", icon: "🏛️" },
    { id: "health", label: "Health & Wellness", icon: "🍎" },
    { id: "nonprofit", label: "Non-Profit", icon: "💖" },
    { id: "other", label: "Other", icon: "❓" },
    { id: "tech", label: "Tech", icon: "💻" },
    { id: "travel", label: "Travel & Tourism", icon: "✈️" },
  ];

  // Retrieve email from localStorage (set during registration)
  const email = localStorage.getItem("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, username, category: selectedCategory };

    try {
      const response = await fetch("https://spark-back.onrender.com/api/user/tell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Server returned an error");
      }

      const result = await response.json();
      console.log("Profile updated successfully", result);
      // Navigate to next page or dashboard
      navigate("/login");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.leftside} style={{ paddingLeft: "10%" }}>
        <img
          src={logo}
          alt="Logo"
          className={style.logo}
          style={{ marginBottom: "10px" }}
        />
        <div className={style.formContainer}>
          <h1
            className={style.heading}
            style={{ textAlign: "left", marginTop: "20px",fontSize:'36px' }}
          >
            Tell us about yourself
          </h1>
          <div className={style.acc_top} style={{ textAlign: "left" }}>
            <h5>For a personalized Spark experience</h5>
          </div>
          <form className={style.registerForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Tell us your name"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <div className={style.categorySelector}>
              <h5 style={{ textAlign: "justify", fontWeight: "600" }}>
                Select one category that best describes your Linktree:
              </h5>
              <br />
              <div className={style.categoryContainer}>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`${style.categoryPill} ${
                      selectedCategory === cat.id ? style.selected : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    <span className={style.pillIcon}>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className={style.loginButton}>
              Continue
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

export default Tell;
