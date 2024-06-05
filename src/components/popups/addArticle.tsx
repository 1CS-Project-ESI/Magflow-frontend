// PopupContent.tsx
"use client";
import React, { useState } from "react";
import { Article } from "@/types";
import getToken from "@/utils/getToken";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
     // getting the id from url
     const url = new URL(window.location.href);
     const idString = url.searchParams.get("id");
 
     let id: number | null = null;
 
     if (idString !== null) {
      id = parseInt(idString, 10);
     }
     console.log("this id the ", id);
    try {
      const response = await fetch(`http://localhost:4000/api/store/article/create/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      console.log(formData)
      if (response.ok) {
        
        onClose();
      } else {
   
        console.error('Error adding artcile :', response.statusText);
      }
    } catch (error) {
      console.error('Error adding artcile :', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">
        Ajouter Article
      </h2>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Nom Article"
            className="input-field h-9 w-full"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Description Article"
            className="input-field h-9 w-full"
            value={formData.description}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
