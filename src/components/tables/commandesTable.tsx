"use client";


import React from "react";
import Link from "next/link";
import { Commande } from "@/types";
import dlt from "../../../public/assets/icons/delete.svg";
import Converter from "@/dateConverter";
import withAuth from "../../utils/withAuth";

interface Props {
  commandes: Commande[];
}

const CommandesTableTab: React.FC<Props> = ({ commandes }) => {
  // Sort the commandes array by commande.id
  const sortedCommandes = commandes.sort((a, b) => b.id - a.id);

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
          {sortedCommandes.map((commande, index) => (
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

const CommandesTable = withAuth(CommandesTableTab,["agentserviceachat","magasinier",]);

export default CommandesTable;
