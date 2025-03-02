import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "../styles/Dashboard.module.css";
import logo from "../assets/bomma.png";
import YourComponent from "./YourComponent";
import ShopComponent from "./ShopComponent";
import UpdateLink from "./Update"; // Adjust path if needed
import UpdateShop from "./UpdateShop"; // Adjust path if needed
import link from "../assets/link.png";
import ana from "../assets/ana.png";
import apperance from "../assets/apperance.png";
import settings from "../assets/settings.png";
import { SlPencil } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoShareOutline } from "react-icons/io5";
import flip from "../assets/Flipkart.png";
import amazon from "../assets/amazon.png";
import ebay from "../assets/ebay.png";
import walmart from "../assets/walmart.png";
import insta from "../assets/instagram.png";
import you from "../assets/youtube.png";
import face from "../assets/facebook.png";
import X from "../assets/twitter.png";
import logout from "../assets/logout.png";
import { LuEye } from "react-icons/lu";
import { GoShareAndroid } from "react-icons/go";



function Dashboard() {
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("Add Link"); // Default active button
  const [activeButton2, setActiveButton2] = useState("Add Link"); // Default active button
  const [bgColor, setBgColor] = useState("#2d221b"); // Default color
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customColor, setCustomColor] = useState(""); // Store user-inputted color
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
  const [selectedCard, setSelectedCard] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleEditClick = (card) => {
    setSelectedCard(card);
    setIsUpdateModalOpen(true);
  };

  const updateCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card._id === updatedCard._id ? updatedCard : card
      )
    );
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value, // Dynamically update based on input name
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove user token
    navigate("/login"); // Redirect to login page
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const addCard = (newCard) => {
    setCards((prevCards) => [...prevCards, newCard]); // Add new card to the list
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

      // Update state with fetched data
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
      }
    } catch (error) {
      console.error("Error fetching saved data:", error);
    }
  };

  const getTextColor = (bgColor) => {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Luminance formula

    return brightness > 128 ? "#000000" : "#FFFFFF"; // Light background → Black text, Dark background → White text
  };

  const handleCustomColorChange = (e) => {
    const value = e.target.value;
    setCustomColor(value);

    // Validate hex color before applying
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      setBgColor(value);
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

  // Handle file upload
  const handleUpload = async (event) => {
    const file = event.target.files[0];

    if (!file || !userDetails?.email) return; // Ensure email exists

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", userDetails.email); // Send email

    try {
      setLoading(true);
      const response = await fetch("https://spark-back.onrender.com/api/link/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setImage(data.imageUrl);
      console.log("Image uploaded for:", data.email);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!userDetails?.email) {
      alert("User email not found. Cannot delete image.");
      return;
    }

    console.log("Deleting image for email:", userDetails.email); // Debug log

    try {
      const response = await fetch(
        `https://spark-back.onrender.com/api/link/${userDetails.email}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to delete image");

      setImage(null); // Clear image from UI
      alert("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  const handleSaveDashboard = async () => {
    if (!userDetails?.email) {
      alert("User email not found.");
      return;
    }

    try {
      const response = await fetch(
        "https://spark-back.onrender.com/api/linkdata/save-data",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userDetails.email,
            title: profileData.title,
            bio: profileData.bio,
            bgColor, // ✅ Dashboard-relevant field
            cards, // ✅ Dashboard-relevant field
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to save dashboard data");

      alert("Dashboard settings saved successfully!");
    } catch (error) {
      console.error("Error saving dashboard data:", error);
      alert("Error saving dashboard data. Please try again.");
    }
  };

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

  const handleDeleteCard = async (cardId) => {
    try {
      const response = await fetch(
        `https://spark-back.onrender.com/api/linkdata/delete-card/${userDetails.email}/${cardId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setCards((prevCards) =>
          prevCards.filter((card) => card._id !== cardId)
        );
      } else {
        console.error("Failed to delete card:", result.message);
      }
    } catch (error) {
      console.error("❌ Error deleting card:", error);
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
                <li className={style.sideactive}>
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

        <div className={style.Preview} onClick={()=>navigate('/preview')}>
          <button><LuEye /> &nbsp;preview</button>
        </div>
        <div className={style.mobDown}>
          <nav>
            <ul>
            <li className={style.sideactive}>
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
          <button className={style.share} onClick={handleShare}><GoShareAndroid />share</button>


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

                {/* ✅ Button Controls */}
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

                {/* ✅ Mini Cards inside Phone Frame */}
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
                        className={style.miniCard}
                        style={{ backgroundColor: bgColor3 }} // ✅ Change MiniCard background dynamically
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

                <button className={style.button}>Get Connected</button>
              </div>

              <div className={style.forMob}>
                <div className={style.wrapper}>
                  {/* Profile Title - Placed Outside .con */}
                  <h3 className={style.title}>Profile</h3>

                  <div className={style.con}>
                    <div className={style.pro}>
                      {image ? (
                        <img
                          src={image}
                          alt="Uploaded"
                          className={style.image}
                        />
                      ) : (
                        <div className={style.placeholder}>No Image</div>
                      )}
                      <div className={style.uploadSection}>
                        <label
                          htmlFor="fileUpload"
                          className={style.uploadButton}
                        >
                          {loading ? "Uploading..." : "Pick an image"}
                        </label>
                        <input
                          type="file"
                          id="fileUpload"
                          className={style.hiddenInput}
                          onChange={handleUpload}
                          accept="image/*"
                        />
                        <button
                          onClick={handleDelete}
                          disabled={!image}
                          className={`${style.removeButton} ${
                            !image ? style.disabled : ""
                          }`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className={style.info}>
                      <div className={style.field}>
                        <p className={style.label}>Profile Title</p>
                        <input
                          type="text"
                          name="title"
                          placeholder="Your title"
                          value={profileData.title}
                          onChange={handleProfileInputChange}
                        />
                      </div>
                      <div className={style.field}>
                        <p className={style.label}>Bio</p>
                        <input
                          type="text"
                          name="bio"
                          placeholder="Your Bio"
                          value={profileData.bio}
                          onChange={handleProfileInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={style.wrapper}>
                    <div className={style.con}>
                      <div className={style.bot}>
                        <div className={style.two}>
                          <button
                            className={
                              activeButton === "Add Link" ? style.active : ""
                            }
                            onClick={() => setActiveButton("Add Link")}
                          >
                            Add Link
                          </button>
                          &nbsp;
                          <button
                            className={
                              activeButton === "Add Shop" ? style.active : ""
                            }
                            onClick={() => setActiveButton("Add Shop")}
                          >
                            Add Shop
                          </button>
                        </div>
                        <div className={style.plus}>
                          <button onClick={handleAddClick}>Add</button>
                        </div>

                        <div className={style.cardContainer}>
                          {cards
                            .filter(
                              (card) =>
                                card.type ===
                                (activeButton === "Add Link" ? "link" : "shop")
                            )
                            .map((card) => (
                              <div key={card._id} className={style.card}>
                                <p>
                                  <button onClick={() => handleEditClick(card)}>
                                    {card.selectedApp || "None"}&nbsp;
                                    <SlPencil />
                                  </button>
                                </p>
                                <div className={style.toggleContainer}>
                                  <div
                                    className={`${style.toggleSwitch} ${
                                      style.on ? style.on : ""
                                    }`}
                                  >
                                    <div className={style.toggleCircle}></div>
                                  </div>
                                  <button
                                    onClick={() => handleDeleteCard(card._id)}
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </div>
                                <p>
                                  <button>
                                    {card.link}&nbsp;
                                    <SlPencil />
                                  </button>
                                </p>
                                <p style={{ display: "none" }}>{card.title}</p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {isModalOpen && (
                      <div
                        className="modal-overlay"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <div className="modal">
                          {activeButton === "Add Link" && (
                            <YourComponent
                              setIsModalOpen={setIsModalOpen}
                              addCard={addCard}
                            />
                          )}
                          {activeButton === "Add Shop" && (
                            <ShopComponent
                              setIsModalOpen={setIsModalOpen}
                              addCard={addCard}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {isUpdateModalOpen && selectedCard && (
                      <div
                        className="modal-overlay"
                        onClick={() => setIsUpdateModalOpen(false)}
                      >
                        <div className="modal">
                          {selectedCard.type === "link" ? (
                            <UpdateLink
                              setIsModalOpen={setIsUpdateModalOpen}
                              selectedCard={selectedCard}
                              updateCard={updateCard} // ✅ Pass update function correctly
                            />
                          ) : (
                            <UpdateShop
                              setIsModalOpen={setIsUpdateModalOpen}
                              selectedCard={selectedCard}
                              updateCard={updateCard} // ✅ Pass update function correctly
                            />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={style.wrapper}>
                    <h3 className={style.title}>Banner</h3>

                    <div className={style.con}>
                      {/* Background Choice */}
                      <div
                        className={style.bg_choice}
                        style={{ backgroundColor: bgColor }}
                      >
                        <div className={style.bg_pro}>
                          {image ? (
                            <img
                              src={image}
                              alt="Uploaded"
                              className={style.image}
                            />
                          ) : (
                            <div className={style.placeholder}>No Image</div>
                          )}
                          <h5
                            style={{
                              color: getTextColor(bgColor),
                              fontSize: "20px",
                            }}
                          >
                            @{profileData.title || "username"}
                          </h5>
                        </div>
                      </div>

                      {/* Background Color Options */}
                      <div className={style.info}>
                        <h5 className={style.label}>Custom Background Color</h5>
                        <div className={style.colorOptions}>
                          <button
                            className={style.colorBtn}
                            style={{ backgroundColor: "#3D2C23" }}
                            onClick={() => setBgColor("#3D2C23")}
                          ></button>
                          <button
                            className={style.colorBtn}
                            style={{
                              backgroundColor: "#FFFFFF",
                              border: "1px solid #ccc",
                            }}
                            onClick={() => setBgColor("#FFFFFF")}
                          ></button>
                          <button
                            className={style.colorBtn}
                            style={{ backgroundColor: "#000000" }}
                            onClick={() => setBgColor("#000000")}
                          ></button>
                        </div>
                        <input
                          type="text"
                          className={style.colorInput}
                          placeholder="#000000"
                          value={customColor}
                          onChange={handleCustomColorChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button className={style.save} onClick={handleSaveDashboard}>
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

export default Dashboard;
