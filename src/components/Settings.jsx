import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Dashboard.module.css";
import logo from "../assets/bomma.png";
import link from "../assets/link.png";
import ana from "../assets/ana.png";
import apperance from "../assets/apperance.png";
import settings from "../assets/settings.png";
import logout from "../assets/logout.png";

function Settings() {
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user token
    navigate("/login"); // Redirect to login page
  };

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch user details
        const response = await fetch("https://spark-back.onrender.com/api/user/details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch user details");
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUserDetails(data);
        console.log("User Details:", data);

        // Fetch image & saved data
        fetchUserImage(data.email);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to log in first!");
      return;
    }

    // Build request body dynamically to avoid sending empty fields
    let updateData = {};
    if (data.firstname) updateData.firstname = data.firstname;
    if (data.lastname) updateData.lastname = data.lastname;
    if (data.email) updateData.email = data.email; // Allow email update
    if (data.password) updateData.password = data.password; // Only send if provided

    try {
      const response = await fetch("https://spark-back.onrender.com/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      alert("Profile updated successfully!");

      // 🔄 Update local token if email changed
      if (result.token) {
        localStorage.setItem("token", result.token);
      }
      navigate("/login");
      // 🔄 Refresh user details (assuming you have a function like fetchUserData)
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  // Fetch user image based on email
  const fetchUserImage = async (email) => {
    try {
      const response = await fetch(`https://spark-back.onrender.com/api/link/${email}`);
      if (!response.ok) {
        console.error("No image found for this email");
        return;
      }

      const data = await response.json();
      if (data.image) {
        setImage(`data:image/png;base64,${data.image}`);
        console.log("Fetched image for:", email);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={style.container}>
        {/* Sidebar */}
        <aside className={style.sidebar}>
          <div>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
            </div>
            <nav>
              <ul>
                <li>
                  <Link to="/dashboard">
                    <img src={link} />
                    Links
                  </Link>
                </li>
                <li>
                  <Link to="/appearance">
                    <img src={apperance} />
                    Appearance
                  </Link>
                </li>
                <li>
                  <Link to="/analytics">
                    <img src={ana} />
                    Analytics
                  </Link>
                </li>
                <li className={style.sideactive}>
                  <Link to="/settings">
                    <img src={settings} />
                    Settings
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {showPopup && (
            <div className={style.popup}>
              <button onClick={handleLogout}>
                <img src={logout} />
                Sign out
              </button>
            </div>
          )}
          <div
            className={style.profile}
            onClick={() => setShowPopup(!showPopup)}
          >
            {image ? (
              <img src={image} alt="Uploaded" className={style.small} />
            ) : (
              <div className={style.placeholder}>No Image</div>
            )}
            {userDetails.username}
          </div>
        </aside>
        <div className={style.mobDown}>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">
                  <img src={link} />
                  Links
                </Link>
              </li>
              <li>
                <Link to="/appearance">
                  <img src={apperance} />
                  Appearance
                </Link>
              </li>
              <li>
                <Link to="/analytics">
                  <img src={ana} />
                  Analytics
                </Link>
              </li>
              <li className={style.sideactive}>
                <Link to="/settings">
                  <img src={settings} />
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <main className={style.main}>
          <div className={style.mobUp}>
            <div className={style.logo}>
              <img src={logo} alt="logo" />
            </div>
            <div>
              {showPopup && (
                <div className={style.popup}>
                  <button onClick={handleLogout}>
                    <img src={logout} />
                    Sign out
                  </button>
                </div>
              )}
              <div
                className={style.profile}
                onClick={() => setShowPopup(!showPopup)}
              >
                {image ? (
                  <img src={image} alt="Uploaded" className={style.small} />
                ) : (
                  <div className={style.placeholder}>No Image</div>
                )}
              </div>
            </div>
          </div>
          <header>
            {/* <h2>Hi, {userDetails.username}!</h2>
            <p>
              Congratulations. You got a great response today.
            </p> */}
          </header>

          <section className={style.settings}>
            <div className={style.set}>
              <h5 style={{ color: "#29A263" }}>Edit profile</h5>
              <hr />
              <br />

              <form>
                <div className={style.setChange}>
                  <label htmlFor="firstname">First Name</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={data.firstname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={style.setChange}>
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={data.lastname}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={style.setChange}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={style.setChange}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div
                  className={style.setChange}
                  style={{ marginBottom: "30px" }}
                >
                  <label htmlFor="confirm_password">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    value={data.confirm_password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </form>
              <div className={style.setSaveContainer}>
                <button onClick={handleSave} className={style.setSave}>
                  Save
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Settings;
