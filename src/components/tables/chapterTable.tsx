"use client";

import React from "react";

import Link from "next/link";

import UpdateChapterButton from "../buttons/updateChapterButton";
import dlt from "../../../public/assets/icons/delete.svg";

interface Chapter {
  id: number;
  name: string;
  description: string;
  id_agentserviceachat: number;
}

interface ChaptersTableProps {
  chapters: Chapter[];
}

const ChaptersTable: React.FC<ChaptersTableProps> = ({ chapters }) => {
  return (
    <div>
      {chapters.map((chp) => (
        <div
          key={chp.id}
          className="bg-white border border-gray-300 flex justify-between p-6 mb-4 rounded-md"
        >
          <Link
            href=""
          >
            <div key={chp.id}>
              <span className="font-bold text-xl mb-8">{chp.name}</span>
            </div>
          </Link>
          <div className="flex items-center">
            <span className="mr-3">
              <UpdateChapterButton showPopup={true} />
            </span>
            <button className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <img src={dlt.src} width="18" height="15" />
                <span>Supprimer</span>
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChaptersTable;
