import PropTypes from "prop-types";
import style from "../styles/yourStyles.module.css";
import insta from "../assets/instagram.png";
import you from "../assets/youtube.png";
import face from "../assets/facebook.png";
import X from "../assets/twitter.png";
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const YourComponent = ({ setIsModalOpen, addCard }) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    selectedApp: null,
    isOn: false,
  });

  const handleCopy = () => {
    if (formData.link) {
      navigator.clipboard.writeText(formData.link)
        .then(() => console.log("Copied:", formData.link))
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  const handleDelete = () => {
    setFormData({ ...formData, link: "" });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelection = (appName) => {
    setFormData({ ...formData, selectedApp: appName });
  };

  const handleToggle = () => {
    setFormData((prev) => {
      const newFormData = { 
        ...prev, 
        isOn: !prev.isOn, 
        type: "link", 
        title: prev.title || "Untitled"  // ✅ Ensure title is added
      };
  
      if (!prev.isOn) {
        console.log("Form Data:", newFormData);
        addCard(newFormData); // ✅ Send the correct card type
      }
  
      return newFormData;
    });
  };
  

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains(style.modalOverlay)) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={style.modalOverlay} onClick={handleOverlayClick}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Enter URL</h3>

        <input
          type="text"
          name="title"
          placeholder="Link title"
          value={formData.title}
          onChange={handleInputChange}
        />

        &nbsp;&nbsp;&nbsp;&nbsp;

        <div className={style.toggleContainer} onClick={handleToggle}>
          <div className={`${style.toggleSwitch} ${formData.isOn ? style.on : ""}`}>
            <div className={style.toggleCircle}></div>
          </div>
        </div>

        <input
          type="text"
          name="link"
          placeholder="Link URL"
          value={formData.link}
          onChange={handleInputChange}
        />

        <button style={{ fontSize: "20px", padding: "5px" }} onClick={handleCopy}>
          <IoCopyOutline />
        </button>

        <button style={{ fontSize: "20px", padding: "5px" }} onClick={handleDelete}>
          <RiDeleteBin6Line />
        </button>

        <div className={style.applications}>
          <h4 style={{ textAlign: "left" }}>Application</h4>

          <button
            onClick={() => handleSelection("instagram")}
            className={formData.selectedApp === "instagram" ? style.selected : ""}
          >
            <img src={insta} alt="Instagram" />
          </button>

          <button
            onClick={() => handleSelection("facebook")}
            className={formData.selectedApp === "facebook" ? style.selected : ""}
          >
            <img src={face} alt="Facebook" />
          </button>

          <button
            onClick={() => handleSelection("YouTube")}
            className={formData.selectedApp === "YouTube" ? style.selected : ""}
          >
            <img src={you} alt="YouTube" />
          </button>

          <button
            onClick={() => handleSelection("X")}
            className={formData.selectedApp === "X" ? style.selected : ""}
          >
            <img src={X} alt="X (Twitter)" />
          </button>
        </div>
      </div>
    </div>
  );
};

YourComponent.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
};

export default YourComponent;
