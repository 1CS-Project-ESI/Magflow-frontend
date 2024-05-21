import React from "react";

interface Props {
  title: string;
  subtitle: string;
  count: number;
}

const Card1: React.FC<Props> = ({ title, subtitle, count }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md p-4 flex justify-between items-center shadow-sm h-[99px]">
                    
         <div className="flex flex-col space-y-2">
      <p className="text-gray-500 text-[10px] max-w-[250px] ml-1">{title}</p>
      <div className="flex justify-between">
        <div className="text-xl font-medium text-black">{subtitle}</div>
        <div className="text-xl font-bold text-black">{count}</div>
      </div>
      </div>
    </div>
  );
};

export default Card1;