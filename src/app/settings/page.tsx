"use client";

import React, { useState } from "react";
import RootLayout from "../rootLayout";
import Image from "next/image";
import Link from "next/link";
import Addphoto from "../../../public/assets/icons/Add photo.svg";

const SettingsPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    tva: 0.19,
  });

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleButtonClicked = () => {
    console.log("User Information: ", formData);
    // Perform further actions with the gathered information
  };

  return (
    <RootLayout>
      <div className="flex items-center mx-12 my-8">
        <Link
          href=""
          className="mr-5 hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Parametres Générals
        </Link>
        <Link
          href="/profile"
          className="hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Modifier Profile
        </Link>
      </div>
      <div className="p-4 m-8 overflow-x-auto bg-white border border-gray-300 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="m-4">
            <label htmlFor="nom" className="block font-bold m-2">
              Nom de l'application
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom"
              className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.nom}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between mb-6 mx-6">
            <span className="font-bold">Logo de l'application</span>
            <div>
              <label htmlFor="profilePhotoInput" className="cursor-pointer">
                <Image src={Addphoto} alt="add logo" width={25} height={25} />
                <input
                  type="file"
                  id="profilePhotoInput"
                  accept="image/*"
                  className="hidden"
                  onChange={handleInputChange}
                />
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between w-full mx-4 mb-4 px-10">
            <span className="font-bold">Valeur TVA</span>
            <input
              type="text"
              id="tvaInput"
              value={formData.tva}
              onChange={handleInputChange}
              className="w-10"
            />
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={handleButtonClicked}
            className="m-4 px-4 py-2 bg-purple-950 text-white rounded-md hover:bg-black"
          >
            Mettre a jour parametres
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default SettingsPage;
