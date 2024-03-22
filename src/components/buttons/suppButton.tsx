"use client";

import React from 'react';

import dlt from "../../../public/assets/icons/delete.svg";

const SuppButton: React.FC = () => {
  return (
    <button className="bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg">
      <div className="flex items-center space-x-2">
        <img src={dlt.src} width="18" height="15" />
        <span>Supprimer</span>
      </div>
    </button>
  );
};

export default SuppButton;