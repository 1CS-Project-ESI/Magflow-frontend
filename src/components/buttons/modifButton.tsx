"use client";

import React from "react";

import mdf from "../../../public/assets/icons/customers.svg";

const ModifButton: React.FC = () => {
  return (
    <button className="bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg">
      <div className="flex items-center space-x-2">
        <img src={mdf.src} width="18" height="18" />
        <span>Modifier</span>
      </div>
    </button>
  );
};

export default ModifButton;
