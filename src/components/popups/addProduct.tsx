// PopupContent.tsx
"use client";
import React from "react";

interface PopupAddProps {
  onClose: () => void;
}

const PopupAddProduct: React.FC<PopupAddProps> = ({ onClose }) => {
  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">
        Ajouter Produit
      </h2>
      <form className="w-full">
        {/* Input fields */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom Produit"
            className="input-field h-9 w-full"
            value="Produit"
          />
        </div>
        <div className="mb-4 w-full">
          <select
            id="chapitre"
            name="chapitre"
            className="input-field h-9 w-full"
            value="chapitre"
          >
            <option value="">Selectionner un Chapitre</option>
            <option value="chapitre 1">Chapitre 1</option>
            <option value="chapitre 2">Chapitre 2</option>
            <option value="chapitre 3">Chapitre 3</option>
          </select>
        </div>
        <div className="mb-4 w-full">
          <select
            id="article"
            name="article"
            className="input-field h-9 w-full"
            value="article"
          >
            <option value="">Selectionner un Article</option>
            <option value="chapitre 1">Article 1</option>
            <option value="chapitre 2">Article 2</option>
            <option value="chapitre 3">Article 3</option>
          </select>
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

export default PopupAddProduct;
