// buttonblanc.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonBlanc: React.FC<ButtonProps> = ({ children, className = '' }) => (
  <button
  // className={`bg-purple-950 py-2 px-4 rounded border border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full mr-4 ml-4 ${className}`}
  className="bg-purple-950 hover:bg-black text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline w-full"
  style={{ backgroundColor: "#510A6D",fontSize: '0.8' }}
  
  >
    {children}
  </button>
);


export default ButtonBlanc;