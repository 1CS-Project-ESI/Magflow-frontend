// PopupContent.tsx
"use client";
import React, { useState } from "react";
import { ROLES } from "@/constants";
import { User } from "@/types";
import modifyIcon from "../../../public/assets/icons/modify.svg";
interface PopupUpdateProps {
  user: User;
  onClose: () => void;
  onModify: (user: User) => void; // new line 
}

const PopupUpdate: React.FC<PopupUpdateProps> = ({ user, onClose, onModify }) => {
  const [formData, setFormData] = useState<User>({
    ...user,
    password: "", // Initialize password as empty
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

    try {
      const response = await fetch(`http://localhost:4000/api/users/${user.email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        
      });
      if (response.ok) {
        console.log("sucsses");

          onModify(formData);
      } else {
       
        console.error('Error modify user:', response.statusText);
      // console.log(`email to be updated ${user.email}`);
      // console.log(formData)
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">Modifier Compte</h2>
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
            type="newEmail"
            id="newEmail"
            name="newEmail"
            placeholder="Email"
            className="input-field h-9 w-full"
            value={formData.newEmail}
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
            // onClick={onModify}
            className="bg-purple-950 hover:bg-black text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupUpdate;

