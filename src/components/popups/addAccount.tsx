"use client";

import React, { useState } from "react";
import { USERS } from "@/constants";
import { User } from "@/types";

const PopupContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState<User>({
    firstname: "",
    lastname: "",
    email: "",
    isActive: true,
    role: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add the new user to the USERS array
    const newUser: User = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      isActive: formData.isActive,
      role: formData.role
    };
    USERS.push(newUser);
    // Close the popup
    onClose();
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
            name="password"
            placeholder="Password"
            className="input-field h-9 w-full"
            // Add any other necessary input fields
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            className="input-field h-9 w-full"
            // Add any other necessary input fields
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
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Consommateur">Consommateur</option>
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
