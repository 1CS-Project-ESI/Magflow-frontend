"use client";

import React from "react";
import Link from "next/link";
import { Inventaire } from "@/types";
import Converter from "@/dateConverter";

interface Props {
  inventaires: Inventaire[];
}

const InventairesTable: React.FC<Props> = ({ inventaires }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Num°</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Date
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Statuts
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {inventaires?.map((inv, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">
                {inv.num}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <Converter date={inv.date}/>
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {inv.statuts}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 md:table-cell flex items-center justify-center">
              <Link
                  href={{
                    pathname: "/inventaireDetails",
                    query: { id: inv.id },
                  }}
                  className="text-gray-500"
                >
                  Details de la commande {">>"}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventairesTable;
