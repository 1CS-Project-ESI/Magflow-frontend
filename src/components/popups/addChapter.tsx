// PopupContent.tsx
"use client";
import React from "react";

interface PopupAddProps {
  onClose: () => void;
}

const PopupAddChapter: React.FC<PopupAddProps> = ({ onClose }) => {
  

  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">Ajouter Chapitre</h2>
      <form className="w-full">
        {/* Input fields */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Chapitre"
            className="input-field h-9 w-full"
            value="Chapitre"
          />
        </div>
        <div className="mb-4 w-full">
        <input
            type="text"
            id="code"
            name="code"
            placeholder="Code"
            className="input-field h-9 w-full"
            value="Code"
          />
        </div>
        
        {/* Buttons */}
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
            Annuler
          </button>
          <span className="w-2"></span>
          <button
            type="submit"
            className="bg-purple-950 hover:bg-black text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupAddChapter;

