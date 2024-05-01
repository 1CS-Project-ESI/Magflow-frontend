"use client";

import React, { useState } from "react";

import ajt from "../../../public/assets/icons/Add.svg";

interface AddCommandButtonProps {
  label: string;
  path: string; 
}

const AddCommandButton: React.FC<AddCommandButtonProps> = ({ label, path }) => {
  
  const handleClick = () => {
    window.location.href = path;
  };

  return (
    <>
      <button
        className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 rounded-lg"
        onClick={handleClick}
      >
        <div className="flex items-center space-x-2">
          <img
            src={ajt.src}
            width="18"
            height="18"
            style={{ filter: "invert(100%)" }}
          />
          <span>{label}</span>
        </div>
      </button>
    </>
  );
};

export default AddCommandButton;

