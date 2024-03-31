"use client";
import { useState } from "react";

export default function Settva() {
  const [tvaValue, setTvaValue] = useState("0.19");

  const handleChange = () => {};

  return (
    <div className="flex items-center justify-between w-full mx-4 mb-4 px-10">
      <span className="font-bold">
        Valeur TVA
      </span>
      <input
        type="text"
        id="tvaInput"
        value={tvaValue}
        onChange={handleChange}
        className="w-10"
      />
    </div>
  );
}
