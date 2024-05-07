"use client";

import React from "react";
import Link from "next/link";
import { CommandeIn } from "@/types";
import Converter from "@/dateConverter";

interface Props {
  commandes: CommandeIn[];
}

const CommandesInTable: React.FC<Props> = ({ commandes }) => {
  const sortedCommandes = commandes.sort((a, b) => b.id - a.id);

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light"> </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Demandeur
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Number
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Type</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Etat</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Date</th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {sortedCommandes.map((commande, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-2 py-2">
                {commande.id}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {commande.id_consommateur}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {commande.number}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {commande.typecommande}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                {commande.validation >= 0 && commande.validation <= 2 ? (
                  <span className="text-red-500">non validé</span>
                ) : commande.validation === 3 ? (
                  <span className="text-green-500">validé</span>
                ) : (
                  commande.validation
                )}
              </td>
              <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
                <Converter date={commande.date} />
              </td>
              <td className="border-t bg-white text-center px-2 py-1 md:table-cell flex items-center justify-center">
                <Link
                  href={{
                    pathname: "/commandInDetails",
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

export default CommandesInTable;
