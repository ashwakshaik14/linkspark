import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/Dashboard.module.css";
import { IoShareOutline } from "react-icons/io5";
import flip from "../assets/Flipkart.png";
import amazon from "../assets/amazon.png";
import ebay from "../assets/ebay.png";
import walmart from "../assets/walmart.png";
import insta from "../assets/instagram.png";
import you from "../assets/youtube.png";
import face from "../assets/facebook.png";
import X from "../assets/twitter.png";

function Share() {
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
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("#000000");
  const [selectedButtonStyle, setSelectedButtonStyle] = useState(""); // Store the selected style
  const [buttonColor, setButtonColor] = useState("#ffffff");
  const [buttonFontColor, setButtonFontColor] = useState("#888888");

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.setProperty("--selected-font", fontFamily);
  }, [fontFamily]);

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

  // const handleCardClick = async (card) => {
  //   try {
  //     const userEmail = "user@example.com"; // Replace with actual user email (dynamic if needed)

  //     const payload = {
  //       email: userEmail,
  //       app: card.selectedApp,
  //       type: activeButton2 === "Add Link" ? "link" : "shop",
  //     };

  //     console.log("Sending click data:", payload);

  //     const response = await fetch("http://localhost:3000/api/analytics/track", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();
  //     console.log("Response from server:", data);
  //   } catch (error) {
  //     console.error("Error tracking click:", error);
  //   }
  // };

  const handleCardClick = async (card) => {
    try {
      await fetch("https://spark-back.onrender.com/api/ana", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userDetails.email, // Ensure this is defined
          app: card.selectedApp,
          type: card.type,
          url: card.title, // ✅ Include the URL clicked
        }),
      });
    } catch (error) {
      console.error("Error logging click:", error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={style.phone}
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
          <button>
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
                card.type === (activeButton2 === "Add Link" ? "link" : "shop")
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
                onMouseDown={() => handleCardClick(card)} // ✅ Ensures API is called before navigation
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
        <button
          className={style.button}
          onClick={async () => {
            try {
              await fetch("http://localhost:3000/api/get-connected", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: userDetails.email, // ✅ Send user email
                }),
              });

              // ✅ Redirect to homepage after API call
              window.location.href = "/";
            } catch (error) {
              console.error("Error logging Get Connected click:", error);
            }
          }}
        >
          Get Connected
        </button>
      </div>
    </>
  );
}

export default Share;
