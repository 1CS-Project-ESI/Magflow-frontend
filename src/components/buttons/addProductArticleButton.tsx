// ModifierButton.tsx
"use client";
import React, { useState } from "react";
import PopupAddProduct from "../popups/addProductArticle";
import ajt from "../../../public/assets/icons/Add.svg";

interface AddButtonProps {
  showPopup: boolean;
}

const AddProductButton: React.FC<AddButtonProps> = ({ showPopup }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <>
      <button
        className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 rounded-lg"
        onClick={togglePopup}
      >
        <div className="flex items-center space-x-2">
          <img
            src={ajt.src}
            width="18"
            height="18"
            style={{ filter: "invert(100%)" }}
          />{" "}
          <span>Ajouter</span>
        </div>
      </button>
      {showPopup && isPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <PopupAddProduct onClose={togglePopup} />
        </div>
      )}
    </>
  );
};

export default AddProductButton;
