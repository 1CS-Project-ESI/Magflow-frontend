
"use client";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
  count: number;
}

const Card1: React.FC<Props> = ({ title, subtitle, count }) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-gray-300 flex-row items-center justify-between max-width-[340px] ">
      <div className="flex flex-col space-y-2">
        <p className="text-gray-500 text-[13px] pl-1">{title}</p>
        <div className="flex justify-between">
          <div className="text-xl font-medium text-black">{subtitle}</div>
          <div className="text-xl font-bold text-black">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default Card1;

