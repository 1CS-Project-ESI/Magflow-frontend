"use client";

import React from "react";
import Link from "next/link";
import { CommandeIn } from "@/types";
import Converter from "@/dateConverter";
import dlt from "../../../public/assets/icons/delete.svg"

interface Props {
    commandes: CommandeIn[];
  }
  
const CommandesTable: React.FC<Props> = ({ commandes }) => {
    return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light"> </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Demandeur</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Etat</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Number</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Date</th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {commandes?.map((commande, index) => (
            <tr key={index} className="border-b border-gray-200">
            <td className="border-t bg-white text-center px-2 py-2">
              {commande.id}
            </td>
            <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
              {commande.id_consommateur}
            </td>
            <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
              {commande.validation}
            </td>
            <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
              {commande.number}
            </td>
            <td className="border-t bg-white text-center px-2 py-1 hidden md:table-cell">
              <Converter date={commande.date} />
            </td>
            <td className="border-t bg-white text-center px-2 py-1 md:table-cell flex items-center justify-center">
              <button className="w-32 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-1 px-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <img src={dlt.src} width="16" height="13" />
                  <span className="text-sm">Supprimer</span>
                </div>
              </button>
            </td>
            <td className="border-t bg-white text-center px-2 py-1 md:table-cell flex items-center justify-center">
              <Link
                href={{
                  // pathname: "/commandDetails",
                  // query: { id: commande.id },
                }}
                className="text-gray-500 font-bold"
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
