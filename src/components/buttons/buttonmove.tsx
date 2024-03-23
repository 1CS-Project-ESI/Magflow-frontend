// buttonmove.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonMauve: React.FC<ButtonProps> = ({ children, className = '' }) => (
  <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-40 mr-4 ml-4 ${className}`} 
  style={{ backgroundColor: "#510A6D" ,fontSize:'0.8em' }}
  >

    {children}
  </button>
);

export default ButtonMauve;