"use client";

import React from "react";

import rch from "../../../public/assets/icons/Search.svg";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Recherche par Nom ..."
        className="w-96 border border-gray-300 rounded-lg px-4 py-2 pl-10" // Add padding-left to accommodate the icon
        onChange={handleInputChange}
      />
      <img
        src={rch.src}
        alt="Search Icon"
        className="absolute left-3 top-3" // Adjust positioning as needed
        style={{ height: "20px", width: "20px" }} // Adjust size as needed
      />
    </div>
  );
};

export default SearchBar;
