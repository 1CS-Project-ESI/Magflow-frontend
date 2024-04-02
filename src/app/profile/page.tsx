"use client";

import React, { useState } from "react";
import RootLayout from "../rootLayout";
import Password from "@/components/fields/password";
import Image from "next/image";
import Link from "next/link";
import Addphoto from "../../../public/assets/icons/Add photo.svg";
import Passw from "../../../public/assets/icons/edit.svg";
import getToken from "@/utils/getToken";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
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

  const handleLogout = async () => {
    const accessToken = await getToken();
    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // Logout successful, handle redirect or other actions
      console.log("Logout successful!");
      window.location.href = "/login"; // Redirect to login page (example)
    } catch (error) {
      console.error("Error during logout:", error);
      // Handle errors (e.g., display error message)
    }
  };

  return (
    <RootLayout>
      <div className="flex items-center mx-12 my-8">
        <Link
          href="/settings"
          className="mr-5 hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Parametres Générals
        </Link>
        <Link
          href=""
          className="hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Modifier Profile
        </Link>
      </div>
      <div className="p-4 m-8 overflow-x-auto bg-white border border-gray-300 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="m-4">
            <label htmlFor="nom" className="block font-bold m-2">
              Nom
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
          <div className="m-4">
            <label htmlFor="prenom" className="block font-bold m-2">
              Prenom
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prenom"
              className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.prenom}
              onChange={handleInputChange}
            />
          </div>
          <div className="mx-4 mb-6">
            <label htmlFor="email" className="block font-bold m-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center justify-between mb-6 mx-6">
            <span className="font-bold">Photo de Profile</span>
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
        </div>
        <div className="text-center">
          <button
            onClick={handleButtonClicked}
            className="m-4 px-4 py-2 bg-purple-950 text-white rounded-md hover:bg-black"
          >
            Mettre a jour profile
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 m-4">
          <Password />
          <button onClick={handleLogout}>
            <div className="flex items-center justify-between mx-6 my-4">
              <span className="font-bold text-red-700">Deconnecter</span>
              <Image src={Passw.src} alt="Changer" width={25} height={25} />
            </div>
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default ProfilePage;
