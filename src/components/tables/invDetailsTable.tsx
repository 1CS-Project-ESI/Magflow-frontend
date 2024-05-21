"use client";

import React from "react";

interface Props {
  observations: {
    designation: string;
    n_inventaire: number;
    reste: number;
    entree: number;
    sortie: number;
    quantity_logique: number;
    physicalquantity: number;
    ecart: number;
    obs: string;
    produit: {
      caracteristics: string | null;
      stock_mini: number;
    };
  }[];
}

const InvDetailsTable: React.FC<Props> = ({ observations }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom Produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              N° Inventaire
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Reste</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Entrée
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Sortie
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantité minimale
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantité logique
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantité physique
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Ecart</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Observation
            </th>
          </tr>
        </thead>
        <tbody>
          {observations?.map((observation, index) => (
            <tr key={index} className="border-b text-[#2C2D41] border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">
                {observation.designation}
              </td>
              <td className="border-t bg-white text-center px-4 py-4">
                {observation.n_inventaire}
              </td>
              <td className="border-t bg-white text-center px-4 py-4">
                {observation.reste}
              </td>
              <td className="border-t bg-white text-center px-4 py-4">
                {observation.entree}
              </td>
              <td className="border-t bg-white text-center px-4 py-4">
                {observation.sortie}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {observation.produit.stock_mini}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {observation.quantity_logique}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {observation.physicalquantity}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <div>{observation.ecart}</div>
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <div>{observation.obs}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvDetailsTable;
