// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  path?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean; // Add disabled prop here
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ path = '', type, onClick, children }) => {
  const handleClick = () => {
    if (path) {
      window.location.href = path;
    }
  };
  return (
  <button
    type={type}
    onClick={handleClick}
    className="bg-purple-950 hover:bg-black text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    style={{ backgroundColor: "#510A6D",fontSize: '0.8' }}
    
  >
    {children}
  </button>
  );
  };

export default Button;