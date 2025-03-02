import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import style from "../styles/yourStyles.module.css";
import { IoCopyOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import insta from "../assets/instagram.png";
import you from "../assets/youtube.png";
import face from "../assets/facebook.png";
import X from "../assets/twitter.png";

const Update = ({ setIsModalOpen, selectedCard, updateCard }) => {
  // Pre-fill form with existing card data
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
        <h3>Update Link</h3>

        <input
          type="text"
          name="title"
          placeholder="Link title"
          value={formData.title}
          onChange={handleInputChange}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;

        <button onClick={handleSave} style={{padding:'8px',backgroundColor:'#28A263',borderRadius:'18px',color:"#ffffff"}}>Update</button>

        <input
          type="text"
          name="link"
          placeholder="Link URL"
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

Update.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  selectedCard: PropTypes.object.isRequired,
  updateCard: PropTypes.func.isRequired,
};

export default Update;

