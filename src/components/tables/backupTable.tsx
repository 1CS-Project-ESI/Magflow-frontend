"use client";
import React from "react";
import { Archive } from "@/types";

interface Props {
  Archives: Archive[];
}

const BackupTable: React.FC<Props> = ({ Archives }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Local</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Date de modification</th>
          </tr>
        </thead>
        <tbody>
          {Archives.map((backup, index) => (
            <tr key={index}>
              <td className="px-4 py-2">{backup.id}</td>
              <td className="px-4 py-2 hidden md:table-cell">{backup.filename}</td>
              <td className="px-4 py-2 hidden md:table-cell">{backup.filepath}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BackupTable;
