import PropTypes from "prop-types";
import style from "../styles/yourStyles.module.css";
import flip from '../assets/Flipkart.png';
import amazon from '../assets/amazon.png';
import ebay from '../assets/ebay.png';
import walmart from '../assets/walmart.png';
import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const ShopComponent = ({ setIsModalOpen, addCard }) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    selectedApp: null,
    isOn: false,
  });

  const handleSelection = (appName) => {
    setFormData({ ...formData, selectedApp: appName });
  };

  const handleToggle = () => {
    setFormData((prev) => {
      const newFormData = { ...prev, isOn: !prev.isOn, type: "shop" , title: prev.title || "Untitled"}; // ✅ Add type: "shop"
  
      if (!prev.isOn) {
        console.log("Form Data:", newFormData);
        addCard(newFormData); // ✅ Send the correct card type
      }
  
      return newFormData;
    });
  };
  

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
          placeholder="Shop URL"
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
            onClick={() => handleSelection("flipkart")}
            className={formData.selectedApp === "flipkart" ? style.selected : ""}
          >
            <img src={flip} alt="flipkart" />
          </button>

          <button
            onClick={() => handleSelection("amazon")}
            className={formData.selectedApp === "amazon" ? style.selected : ""}
          >
            <img src={amazon} alt="amazon" />
          </button>

          <button
            onClick={() => handleSelection("ebay")}
            className={formData.selectedApp === "ebay" ? style.selected : ""}
          >
            <img src={ebay} alt="ebay" />
          </button>

          <button
            onClick={() => handleSelection("walmart")}
            className={formData.selectedApp === "walmart" ? style.selected : ""}
          >
            <img src={walmart} alt="walmart" />
          </button>
        </div>
      </div>
    </div>
  );
};

ShopComponent.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
};

export default ShopComponent;
