"use client";

import React from "react";
import { useRouter } from "next/router";

import mdf from "../../../public/assets/icons/customers.svg";

interface ModifButtonProps {
  path?: string;
}

const ModifButton: React.FC<ModifButtonProps> = ({ path = "" }) => {
  const handleClick = () => {
    if (path) {
      window.location.href = path;
    }
  };

  return (
    <button
      className="w-32 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
      onClick={handleClick}
    >
      <div className="flex items-center space-x-2">
        <img src={mdf.src} width="18" height="18" />
        <span>Modifier</span>
      </div>
    </button>
  );
};

export default ModifButton;
