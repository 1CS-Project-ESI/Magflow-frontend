// buttonblanc.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonBlanc: React.FC<ButtonProps> = ({ children, className = '' }) => (
  <button
  className={`bg-white py-2 px-4 rounded border border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 w-full mr-4 ml-4 ${className}`}
  >
    {children}
  </button>
);


export default ButtonBlanc;