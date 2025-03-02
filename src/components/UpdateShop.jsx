import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import style from "../styles/yourStyles.module.css";
import flip from "../assets/Flipkart.png";
import amazon from "../assets/amazon.png";
import ebay from "../assets/ebay.png";
import walmart from "../assets/walmart.png";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

const UpdateShop = ({ setIsModalOpen, selectedCard, updateCard }) => {
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    selectedApp: null,
    isOn: false,
  });

  useEffect(() => {
    if (selectedCard) {
      setFormData({
        title: selectedCard.title || "",
        link: selectedCard.link || "",
        selectedApp: selectedCard.selectedApp || null,
        isOn: selectedCard.isOn || false,
      });
    }
  }, [selectedCard]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  

  const handleSelection = (appName) => {
    setFormData({ ...formData, selectedApp: appName });
  };

  const handleSave = async () => {
    if (!formData.link) {
      alert("Link cannot be empty.");
      return;
    }
  
    const updatedCard = { ...selectedCard, ...formData }; // Merge new data
  
    try {
      updateCard(updatedCard); // Update card state
      setIsModalOpen(false); // Close modal only if update is successful
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };
  

  return (
    <div className={style.modalOverlay} onClick={() => setIsModalOpen(false)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Update Shop Link</h3>

        <input
          type="text"
          name="title"
          placeholder="Shop title"
          value={formData.title}
          onChange={handleInputChange}
        />

        &nbsp;&nbsp;&nbsp;&nbsp;

        <button onClick={handleSave}>Update</button>


        <input
          type="text"
          name="link"
          placeholder="Shop URL"
          value={formData.link}
          onChange={handleInputChange}
        />
<button 
  style={{ fontSize: "20px", padding: "5px" }} 
  onClick={() => navigator.clipboard.writeText(formData.link)}
>
  <IoCopyOutline />
</button>

<button 
  style={{ fontSize: "20px", padding: "5px" }} 
  onClick={() => setFormData({ ...formData, link: "" })}
>
  <RiDeleteBin6Line />
</button>


        <div className={style.applications}>
          <h4 style={{ textAlign: "left" }}>Application</h4>

          <button
            onClick={() => handleSelection("flipkart")}
            className={formData.selectedApp === "flipkart" ? style.selected : ""}
          >
            <img src={flip} alt="Flipkart" />
          </button>

          <button
            onClick={() => handleSelection("amazon")}
            className={formData.selectedApp === "amazon" ? style.selected : ""}
          >
            <img src={amazon} alt="Amazon" />
          </button>

          <button
            onClick={() => handleSelection("ebay")}
            className={formData.selectedApp === "ebay" ? style.selected : ""}
          >
            <img src={ebay} alt="eBay" />
          </button>

          <button
            onClick={() => handleSelection("walmart")}
            className={formData.selectedApp === "walmart" ? style.selected : ""}
          >
            <img src={walmart} alt="Walmart" />
          </button>
        </div>
      </div>
    </div>
  );
};

UpdateShop.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  selectedCard: PropTypes.object.isRequired,
  updateCard: PropTypes.func.isRequired,
};

export default UpdateShop;