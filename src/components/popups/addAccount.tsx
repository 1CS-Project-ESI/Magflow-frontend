"use client";
import React, { useState } from "react";
import { ROLES } from "@/constants";
import { User } from "@/types";
import getToken from "../../utils/getToken.js";
interface ExtendedUser extends User {
  phone: string; // Ensure phone is interpreted as a string
}



const PopupContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<ExtendedUser>({
    firstname: "",
    lastname: "",
    email: "",
    newEmail:"",
    isActive: true,
    role: "",
    phone: "" // Initialize phone as an empty string
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
    
    try {
      const response = await fetch('http://localhost:4000/api/users/createuser', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      if (response.ok) {
        // Successfully added user, close the popup
        onClose();
      } else {
        // Handle error response from server
        console.error('Error adding user:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">New Account</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="firstName"
            name="firstname"
            placeholder="First Name"
            className="input-field h-9 w-full"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="text"
            id="lastName"
            name="lastname"
            placeholder="Last Name"
            className="input-field h-9 w-full"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="input-field h-9 w-full"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
          type="password"
          id="password"
          name="password" // Ensure the name attribute is set to "password"
          placeholder="Password"
          className="input-field h-9 w-full"
          value={formData.password}
          onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            className="input-field h-9 w-full"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <select
            id="role"
            name="role"
            className="input-field h-9 w-full"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="" disabled hidden>
              Select Role
            </option>
            {ROLES.map((role, idx) => (
              <option value={role} key={idx}>{role}</option>
            ))}
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

export default PopupContent;