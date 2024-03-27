"use client";
import { SetStateAction, useState } from "react";

export default function Langue() {
  const [language, setLanguage] = useState("Francais");
  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex items-center justify-between px-10 w-[629px] h-[60px] mx-[5px] my-[10px] bg-[#fffffe]">
      <label
        htmlFor="languageSelect"
        className="mr-2 font-['poppins'] text-[25px] text-[#2C2D41]"
      >
        Langue
      </label>
      <select
        id="languageSelect"
        value={language}
        onChange={handleChange}
        className=" w-[200px] h-[40px] text-[#2C2D41]"
      >
        <option value="">Select Language</option>
        <option value="english">English</option>
        <option value="french">Francais</option>
      </select>
    </div>
  );
}
