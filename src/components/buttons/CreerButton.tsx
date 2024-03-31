// src/components/buttons/CreerButton.tsx
"user client";
import React from 'react';

interface CreerButtonProps {
  onClick?: () => void;
}

const CreerButton: React.FC<CreerButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-purple-500 hover:bg-purple-700 text-white font py-3 px-5 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={onClick}
      style={{ backgroundColor: "#510A6D" ,fontSize:'0.8em' }}
    >
      +  Créer
    </button>
  );
};

export default CreerButton;