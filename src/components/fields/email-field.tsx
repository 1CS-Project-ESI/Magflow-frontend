"use client";
import { useState } from "react";

// Custom toggle switch component
const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => {
  return (
    <div
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full bg-gray-300 flex items-center p-1 cursor-pointer transition-colors ${
        checked ? "bg-blue-500" : "bg-gray-300"
      }`}
      style={{ backgroundColor: checked ? "#4299e1 !important" : "#6b7280" }}
    >
      <div
        className={`w-5 h-5 rounded-full bg-white shadow-md transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default function Field_email() {
  const [emailNotification, setEmailNotification] = useState(false);

  return (
    <div className="flex items-center justify-between px-10 w-[629px] h-[60px] mx-[5px] my-[10px] bg-[#fffffe]">
      <label
        htmlFor="emailNotification"
        className="mr-2 font-['poppins'] text-[25px] text-[#2C2D41] "
      >
        Email Notification
      </label>
      <ToggleSwitch
        checked={emailNotification}
        onChange={setEmailNotification}
      />
    </div>
  );
}
