import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Dashboard.module.css";
import logo from "../assets/bomma.png";
import link from "../assets/link.png";
import ana from "../assets/ana.png";
import apperance from "../assets/apperance.png";
import settings from "../assets/settings.png";
import { IoShareOutline } from "react-icons/io5";
import flip from "../assets/Flipkart.png";
import amazon from "../assets/amazon.png";
import ebay from "../assets/ebay.png";
import walmart from "../assets/walmart.png";
import insta from "../assets/instagram.png";
import you from "../assets/youtube.png";
import face from "../assets/facebook.png";
import X from "../assets/twitter.png";
import snow from "../assets/snow.png";
import grey from "../assets/grey.png";
import smoke from "../assets/smoke.png";
import black from "../assets/black.png";
import blue from "../assets/blue.png";
import green from "../assets/green.png";
import orange from "../assets/orange.png";
import yellow from "../assets/yellow.png";
import stack from "../assets/stack.png";
import grid from "../assets/grid.png";
import carousel from "../assets/carousel.png";
import logout from "../assets/logout.png";
import { LuEye } from "react-icons/lu";
import double from '../assets/double.png';

function Appearance() {
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [activeButton2, setActiveButton2] = useState("Add Link"); // Default active button
  const [bgColor, setBgColor] = useState("#2d221b"); // Default color
  const [cards, setCards] = useState([]);
  const [profileData, setProfileData] = useState({
    title: "",
    bio: "",
  });
  const [layout, setLayout] = useState("stack");
  const [bgColor2, setBgColor2] = useState("#ffffff"); // PhoneFrame background
  const [bgColor3, setBgColor3] = useState("#D9D9D9"); // MiniCard background
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [selectedButtonStyle, setSelectedButtonStyle] = useState(""); // Store the selected style
  const [buttonColor, setButtonColor] = useState("#ffffff");
  const [buttonFontColor, setButtonFontColor] = useState("#888888");

  const navigate = useNavigate();

  const handleButtonClick = (styleClass) => {
    setSelectedButtonStyle(styleClass); // Update state on button click
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--selected-font", fontFamily);
  }, [fontFamily]);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user token
    navigate("/login"); // Redirect to login page
  };

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
        fetchSavedData(data.email);
      } catch (error) {
        console.error("Error fetching user details:", error);
        navigate("/login");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const fetchSavedData = async (email) => {
    try {
      const response = await fetch(
        `https://spark-back.onrender.com/api/linkdata/user/${email}`
      );

      if (!response.ok) {
        console.error("No saved data found.");
        return;
      }

      const userData = await response.json();
      console.log("Fetched Saved Data:", userData);

      // ✅ Apply the fetched settings
      if (userData) {
        setProfileData({
          title: userData.title || "",
          bio: userData.bio || "",
        });
        setBgColor(userData.bgColor || "#2d221b");
        setBgColor2(userData.bgColor2 || "#ffffff"); // ✅ PhoneFrame background
        setBgColor3(userData.bgColor3 || "#D9D9D9"); // ✅ MiniCard background
        setFontFamily(userData.fontFamily || "Arial");
        setFontColor(userData.fontColor || "#000000");
        setLayout(userData.layout || "stack");
        setCards(userData.cards || []);

        // ✅ Newly added states
        setSelectedButtonStyle(userData.selectedButtonStyle || "");
        setButtonColor(userData.buttonColor || "#ffffff");
        setButtonFontColor(userData.buttonFontColor || "#888888");
      }
    } catch (error) {
      console.error("Error fetching saved data:", error);
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

  // const handleSaveAppearance = async () => {
  //   if (!userDetails?.email) {
  //     alert("User email not found.");
  //     return;
  //   }

  //   const requestBody = {
  //     email: userDetails.email,
  //     fontFamily,
  //     fontColor,
  //     layout,
  //     bgColor2,
  //     bgColor3,
  //   };

  //   console.log("📤 Sending request:", requestBody); // Debugging

  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/linkdata/save-data",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(requestBody),
  //       }
  //     );

  //     console.log("📥 Response received:", response); // Debugging

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(
  //         errorData.message || "Failed to save appearance settings"
  //       );
  //     }

  //     alert("✅ Appearance settings saved successfully!");

  //     // ✅ Fetch updated data to reflect changes immediately
  //     fetchSavedData(userDetails.email);
  //   } catch (error) {
  //     console.error("❌ Error saving appearance settings:", error);
  //     alert("❌ Error saving appearance settings. Please try again.");
  //   }
  // };

  const handleSaveAppearance = async () => {
    if (!userDetails?.email) {
      alert("User email not found.");
      return;
    }

    const requestBody = {
      email: userDetails.email,
      fontFamily,
      fontColor,
      layout,
      bgColor2,
      bgColor3,
      selectedButtonStyle, // Added field
      buttonColor, // Added field
      buttonFontColor, // Added field
    };

    console.log("📤 Sending request:", requestBody); // Debugging

    try {
      const response = await fetch(
        "https://spark-back.onrender.com/api/linkdata/save-data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("📥 Response received:", response); // Debugging

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to save appearance settings"
        );
      }

      alert("✅ Appearance settings saved successfully!");

      // ✅ Fetch updated data to reflect changes immediately
      fetchSavedData(userDetails.email);
    } catch (error) {
      console.error("❌ Error saving appearance settings:", error);
      alert("❌ Error saving appearance settings. Please try again.");
    }
  };

  // Handle file upload

  const getAppIcon = (appName) => {
    switch (appName) {
      case "flipkart":
        return flip;
      case "amazon":
        return amazon;
      case "ebay":
        return ebay;
      case "walmart":
        return walmart;
      case "instagram":
        return insta;
      case "YouTube":
        return you;
      case "facebook":
        return face;
      case "X":
        return X;
      default:
        return "";
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.origin + "/share"; // Adjust this if needed

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Link copied to clipboard!"); // ✅ Provide user feedback
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
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
                <li className={style.sideactive}>
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
                <li>
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
        <div className={style.Preview} onClick={() => navigate("/preview")}>
          <button>
            <LuEye /> &nbsp;preview
          </button>
        </div>
        <div className={style.mobDown}>
          <nav>
            <ul>
              <li>
                <Link to="/dashboard">
                  <img src={link} />
                  Links
                </Link>
              </li>
              <li className={style.sideactive}>
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
              <li>
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
            <h2>Hi, {userDetails.username}!</h2>
            <p>Congratulations. You got a great response today.</p>
          </header>

          <section className={style.content}>
            <div className={style.mobilePreview}>
              <div
                className={style.phoneFrame}
                style={{
                  backgroundColor: bgColor2,
                  color: fontColor,
                  fontFamily: fontFamily, // ✅ Ensure applied here
                }}
              >
                <div
                  className={style.profileSection}
                  style={{
                    backgroundColor: bgColor,
                    color: fontColor,
                    fontFamily: fontFamily, // ✅ Apply font here too
                  }}
                >
                  <button onClick={handleShare}>
                    <IoShareOutline />
                  </button>
                  {image ? (
                    <img src={image} alt="Uploaded" className={style.i} />
                  ) : (
                    <div className={style.placeholder}>No Image</div>
                  )}
                  <h3 style={{ fontFamily: fontFamily }}>
                    @{profileData.title || "username"}
                  </h3>
                  <p style={{ fontFamily: fontFamily }}>{profileData.bio}</p>
                </div>

                <br />

                <div className={style.two}>
                  <button
                    className={activeButton2 === "Add Link" ? style.active : ""}
                    onClick={() => setActiveButton2("Add Link")}
                    style={{ fontFamily: fontFamily }}
                  >
                    Add Link
                  </button>
                  &nbsp;
                  <button
                    className={activeButton2 === "Add Shop" ? style.active : ""}
                    onClick={() => setActiveButton2("Add Shop")}
                    style={{ fontFamily: fontFamily }}
                  >
                    Add Shop
                  </button>
                </div>

                {/* <div className={`${style.miniCardContainer} ${style[layout]}`}>
                  {cards
                    .filter(
                      (card) =>
                        card.type ===
                        (activeButton2 === "Add Link" ? "link" : "shop")
                    )
                    .map((card, index) => (
                      <a
                        key={index}
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={style.miniCard}
                        style={{ backgroundColor: bgColor3, color: fontColor }} // ✅ Change MiniCard background dynamically
                      >
                        <img
                          src={getAppIcon(card.selectedApp)}
                          alt={card.selectedApp}
                        />
                        <span style={{ fontFamily: fontFamily }}>
                          {card.title || "No Title"}
                        </span>
                      </a>
                    ))}
                </div>1 */}
                <div className={`${style.miniCardContainer} ${style[layout]}`}>
                  {cards
                    .filter(
                      (card) =>
                        card.type ===
                        (activeButton2 === "Add Link" ? "link" : "shop")
                    )
                    .map((card, index) => (
                      <a
                        key={index}
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${style.miniCard} ${selectedButtonStyle}`} // Apply selected button style
                        style={{
                          backgroundColor: buttonColor, // Apply selected button color
                          color: buttonFontColor, // Apply selected font color
                        }}
                      >
                        <img
                          src={getAppIcon(card.selectedApp)}
                          alt={card.selectedApp}
                        />
                        <span style={{ fontFamily: fontFamily }}>
                          {card.title || "No Title"}
                        </span>
                      </a>
                    ))}
                </div>

                {/* ✅ Scrollable Mini Cards (X-axis) */}

                <button className={style.button}>Get Connected</button>
              </div>

              <div className={style.forMob}>
                <div className={style.wrapper}>
                  {/* Profile Title - Placed Outside .con */}
                  <h3 className={style.title}>Layout</h3>

                  <div className={style.con}>
                    <div className={style.layout}>
                      <div>
                        <button
                          className={layout === "stack" ? style.active : ""}
                          onClick={() => setLayout("stack")}
                        >
                          <img src={stack} />
                        </button>
                        <p>Stack</p>
                      </div>
                      <div>
                        <button
                          className={layout === "grid" ? style.active : ""}
                          onClick={() => setLayout("grid")}
                        >
                          <img src={grid} />
                        </button>
                        <p>Grid</p>
                      </div>
                      <div>
                        <button
                          className={layout === "carousel" ? style.active : ""}
                          onClick={() => setLayout("carousel")}
                        >
                          <img src={carousel} />
                        </button>
                        <p>Carousel</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style.wrapper}>
                            <h3 className={style.title}>Buttons</h3>

                            <div className={style.con}>
                            <div className={style.but}>
                              <div className={style.fill}>
                              <p>Fill</p>
                              <div className={style.inline}>
                                <button
                                className={style.fill1}
                                onClick={() => handleButtonClick(style.fill1)}
                                ></button>
                                <button
                                className={style.fill2}
                                onClick={() => handleButtonClick(style.fill2)}
                                ></button>
                                <button
                                className={style.fill3}
                                onClick={() => handleButtonClick(style.fill3)}
                                ></button>
                              </div>
                              </div>

                              <div className={style.fill}>
                              <p>Outline</p>
                              <div className={style.inline}>
                                <button
                                className={style.outline1}
                                onClick={() => handleButtonClick(style.outline1)}
                                ></button>
                                <button
                                className={style.outline2}
                                onClick={() => handleButtonClick(style.outline2)}
                                ></button>
                                <button
                                className={style.outline3}
                                onClick={() => handleButtonClick(style.outline3)}
                                ></button>
                              </div>
                              </div>

                              <div className={style.fill}>
                              <p>Hard Shadow</p>
                              <div className={style.inline}>
                                <button
                                className={style.hs1}
                                onClick={() => handleButtonClick(style.hs1)}
                                ></button>
                                <button
                                className={style.hs2}
                                onClick={() => handleButtonClick(style.hs2)}
                                ></button>
                                <button
                                className={style.hs3}
                                onClick={() => handleButtonClick(style.hs3)}
                                ></button>
                              </div>
                              </div>

                              <div className={style.fill}>
                              <p>Soft Shadow</p>
                              <div className={style.inline}>
                                <button
                                className={style.ss1}
                                onClick={() => handleButtonClick(style.ss1)}
                                ></button>
                                <button
                                className={style.ss2}
                                onClick={() => handleButtonClick(style.ss2)}
                                ></button>
                                <button
                                className={style.ss3}
                                onClick={() => handleButtonClick(style.ss3)}
                                ></button>
                              </div>
                              </div>

                              <div className={style.fill}>
                              <p>Special</p>
                              <div className={style.inline}>
                                <button
                                className={style.spl1}
                                onClick={() => handleButtonClick(style.spl1)}
                                ></button>
                                <button
                                className={style.spl2}
                                onClick={() => handleButtonClick(style.spl2)}
                                ></button>
                                <button style={{border:"none" }} onClick={()=>handleButtonClick(style.spl3)}><img src={double} width="120px"/></button>
                                <button
                                className={style.spl4}
                                onClick={() => handleButtonClick(style.spl4)}
                                ></button>
                                <button
                                className={style.spl5}
                                onClick={() => handleButtonClick(style.spl5)}
                                ></button>
                                <button
                                className={style.spl6}
                                onClick={() => handleButtonClick(style.spl6)}
                                ></button>
                              </div>
                              </div>
                              <div className={style.layout_Cols}>
                              <div className={style.fill}>
                                <p>Button color</p>
                                <div
                                className={style.inline}
                                style={{ float: "left" }}
                                >
                                <div className={style.col_check}>
                                  {/* Color Picker */}
                              <input
                                type="color"
                                value={buttonColor}
                                className={style.colIp}
                                onChange={(e) => setButtonColor(e.target.value)} // ✅ Syncs color picker
                              />

                              {/* Text Input */}
                              <input
                                type="text"
                                className={style.colorInput}
                                placeholder="#ffffff"
                                value={buttonColor.toUpperCase()} // ✅ Ensures uppercase hex
                                onChange={(e) => setButtonColor(e.target.value)} // ✅ Syncs text input
                              />
                            </div>{" "}
                          </div>
                        </div>
                        <br />
                        <div className={style.fill}>
                          <p>Button font color</p>
                          <div
                            className={style.inline}
                            style={{ float: "left" }}
                          >
                            <div className={style.col_check}>
                              {/* Color Picker */}
                              <input
                                type="color"
                                value={buttonFontColor}
                                className={style.colIp}
                                onChange={(e) =>
                                  setButtonFontColor(e.target.value)
                                } // ✅ Syncs color picker
                              />

                              {/* Text Input */}
                              <input
                                type="text"
                                className={style.colorInput}
                                placeholder="#ffffff"
                                value={buttonFontColor.toUpperCase()} // ✅ Ensures uppercase hex
                                onChange={(e) =>
                                  setButtonFontColor(e.target.value)
                                } // ✅ Syncs text input
                              />
                            </div>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style.wrapper}>
                  {/* Profile Title - Placed Outside .con */}
                  <h3 className={style.title}>Fonts</h3>

                  <div className={style.con}>
                    <div className={style.fonts}>
                      <div>
                        <p>Font</p>
                        <select
                          className={style.fontSelect}
                          value={fontFamily}
                          onChange={(e) => setFontFamily(e.target.value)}
                        >
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">
                            Times New Roman
                          </option>
                          <option value="Courier New">Courier New</option>
                          <option value="Verdana">Verdana</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Comic Sans MS">Comic Sans MS</option>
                        </select>
                      </div>

                      <p>Color</p>
                      <div className={style.col_check}>
                        {/* Color Picker */}
                        <input
                          type="color"
                          value={fontColor}
                          className={style.colIp}
                          onChange={(e) => setFontColor(e.target.value)} // ✅ Syncs color picker
                        />

                        {/* Text Input */}
                        <input
                          type="text"
                          className={style.colorInput}
                          placeholder="#ffffff"
                          value={fontColor.toUpperCase()} // ✅ Ensures uppercase hex
                          onChange={(e) => setFontColor(e.target.value)} // ✅ Syncs text input
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={style.wrapper}>
                  {/* Profile Title - Placed Outside .con */}
                  <h3 className={style.title}>Theme</h3>

                  <div className={style.con}>
                    <div className={style.Theme}>
                      <button
                        onClick={() => {
                          setBgColor2("#FFFFFF");
                          setBgColor3("#EEEEEE");
                        }}
                      >
                        <img src={snow} />
                        <p>Air Snow</p>
                      </button>
                      <button
                        onClick={() => {
                          setBgColor2("#EBEEF1");
                          setBgColor3("#ffffff");
                        }}
                      >
                        <img src={grey} />
                        <p>Air Grey</p>
                      </button>
                      <button
                        onClick={() => {
                          setBgColor2("#2A3235");
                          setBgColor3("#ffffff");
                        }}
                      >
                        <img src={smoke} />
                        <p>Air Smoke</p>
                      </button>
                      <button
                        onClick={() => {
                          setBgColor2("#000000");
                          setBgColor3("#D9D9D9");
                        }}
                      >
                        <img src={black} />
                        <p>Air Black</p>
                      </button>
                      <button
                        onClick={() => {
                          setBgColor2("#E0F6FF");
                          setBgColor3("#E0F6FF");
                        }}
                      >
                        <img src={blue} />
                        <p>Mineral Blue</p>
                      </button>
                      <button
                        onClick={() => {
                          setBgColor2("#E0FAEE");
                          setBgColor3("#E0FAEE");
                        }}
                      >
                        <img src={green} />
                        <p>Mineral Green</p>
                      </button>
                      <button
                        onClick={() => {
                          setBgColor2("#FFEEE2");
                          setBgColor3("#FFEEE2");
                        }}
                      >
                        <img src={orange} />
                        <p>Mineral Orange</p>
                      </button>
                      <button
                        onClick={() => {
                          setBgColor2("#FFF8E0");
                          setBgColor3("#FFF8E0");
                        }}
                      >
                        <img src={yellow} />
                        <p>Mineral Yellow</p>
                      </button>
                    </div>
                  </div>
                  <button className={style.save} onClick={handleSaveAppearance}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Appearance;
