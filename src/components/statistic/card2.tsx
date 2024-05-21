import React from "react";

interface Props {
  title: string;
  count: number;
}

const Card1: React.FC<Props> = ({ title, count }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md p-4 flex justify-between items-center shadow-sm h-[99px]">
      <div className="flex flex-col space-y-2">
        <p className="text-gray-500 text-[10px]">{title}</p>
        <div className="flex justify-between items-center">
          <div></div> {/* Empty div to keep space */}
          <div className="text-xl font-bold text-black">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default Card1;