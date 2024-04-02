// ModifierButton.tsx
"use client";
import React, { useState } from "react";
import PopupUpdateChapter from "../popups/updateChapter";
import mdf from "../../../public/assets/icons/customers.svg";

interface UpdateButtonProps {
    showPopup: boolean;
}

const UpdateChapterButton: React.FC<UpdateButtonProps> = ({ showPopup }) => {
    const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <><button
      className="w-32 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
      onClick={togglePopup}
    >
      <div className="flex items-center space-x-2">
        <img src={mdf.src} width="18" height="18" />
        <span>Modifier</span>
      </div>
    </button>
    {showPopup && isPopupVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <PopupUpdateChapter onClose={togglePopup} />
        </div> )}
    </>
  );
};

export default UpdateChapterButton;
