"use client";
import { useState } from "react";

export default function Settva() {
  const [tvaValue, setTvaValue] = useState("0.19");

  const handleChange = () => {};

  return (
    <div className="flex items-center justify-between px-10 w-[629px] h-[60px] mx-[5px] my-[10px] bg-[#fffffe]">
      <label
        htmlFor="tvaInput"
        className="mr-2 font-['poppins'] text-[25px] text-[#2C2D41]"
      >
        TVA Value
      </label>
      <input
        type="text"
        id="tvaInput"
        value={tvaValue}
        onChange={handleChange}
        className="border-[#000000] w-[30px] h-[40px] text-[#2C2D41]"
      />
    </div>
  );
}
