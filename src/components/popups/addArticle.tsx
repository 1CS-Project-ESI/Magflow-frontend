// PopupContent.tsx
"use client";
import React, { useState } from "react";
import { Article } from "@/types";

interface PopupAddProps {
  onClose: () => void;
}

const PopupAddArticle: React.FC<PopupAddProps> = ({ onClose }) => {

  const [formData, setFormData] = useState<Article>({
    name: "",
    description: "",
    tva: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">
        Ajouter Article
      </h2>
      <form className="w-full">
        {/* Input fields */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom Article"
            className="input-field h-9 w-full"
            value={formData.name}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Description Article"
            className="input-field h-9 w-full"
            value={formData.description}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="number"
            id="tva"
            name="tva"
            placeholder="tva Article"
            className="input-field h-9 w-full"
            value={formData.tva}
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

export default PopupAddArticle;
