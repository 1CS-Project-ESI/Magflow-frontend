"use client";

import React from "react";
import Link from "next/link";
import { Commande } from "@/types";
import dlt from "../../../public/assets/icons/delete.svg";
import Converter from "@/dateConverter";

interface Props {
  commandes: Commande[];
}

const CommandesTable: React.FC<Props> = ({ commandes }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">ID du bon</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Date</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Etat</th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((commande, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">
                {commande.id}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <Converter date={commande.orderdate} />
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {commande.status}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 md:table-cell flex items-center justify-center">
                <Link
                  href={{
                    pathname: "/commandDetails",
                    query: { id: commande.id },
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

export default CommandesTable;
