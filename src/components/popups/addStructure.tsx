"use client";
import React, { useState } from "react";
import { User } from "@/types";

interface PopupAddProps {
  onClose: () => void;
  onSubmit?: (data: { name: string; responsible: string }) => void; // Optional submit function
  Users: User[];
}

const PopupAddStructure: React.FC<PopupAddProps> = ({
  onClose,
  onSubmit,
  Users,
}) => {
  const [name, setName] = useState("");
  const [responsible, setResponsible] = useState("asdf");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "responsable":
        setResponsible(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit({ name, responsible });
    }
  };

  return (
    <div className="bg-white  text-[#2C2D41] p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">
        Ajouter Structure
      </h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="mb-4 w-full">
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Structure"
            className="input-field h-9 w-full"
            value={name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <select
            id="responsable"
            name="responsable"
            className="input-field  text-[#2C2D41] h-9 w-full"
            value={responsible}
            onChange={handleInputChange}
            // onChange={}
          >
            <option value="" disabled hidden>
              Responsable
            </option>
            {Users.map((User, idx) => (
              <option value={User.email} key={idx}>
                {User.email}
              </option>
            ))}
          </select>
        </div>

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
export default PopupAddStructure;