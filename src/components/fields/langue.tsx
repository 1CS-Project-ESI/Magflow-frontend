"use client";
import { SetStateAction, useState } from "react";

export default function Langue() {
  const [language, setLanguage] = useState("Francais");
  const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex items-center justify-between w-full m-4 px-10">
      <span className="font-bold">
        Langue
      </span>
      <select
        id="languageSelect"
        value={language}
        onChange={handleChange}
      >
        <option value="french">Francais</option>
        <option value="english">English</option>
      </select>
    </div>
  );
}
