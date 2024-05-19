"use client";

import React, { useState } from "react";
import { Product } from "@/types";

interface Props {
  observations: {
    id_produit: number;
    id_inventaire: number;
    physicalQuantity: number;
    observation: string;
    Produit: {
      name: string;
      caracteristics: string | null;
      quantity: number;
      seuil: number;
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
              Quantité minimale
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantité logique
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantité physique
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Observation
            </th>
          </tr>
        </thead>
        <tbody>
          {observations?.map((Product, productIndex) => (
            <tr
              key={productIndex}
              className="border-b text-[#2C2D41] border-gray-200"
            >
              <td className="border-t bg-white text-center px-4 py-4">
                {Product.Produit.name}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {Product.Produit.seuil}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {Product.Produit.quantity}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <div>
                  {Product.physicalQuantity}
                </div>
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <div>
                  {Product.observation}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvDetailsTable;
