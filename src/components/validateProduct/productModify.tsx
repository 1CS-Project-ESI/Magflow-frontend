"use client";

// ProduitServie component
import React, { useState } from "react";
import { ProductCommandeIn } from "@/types";

interface Props {
  ProduitsBCI: ProductCommandeIn[];
  observations: { id_produit: number; observation: string }[];
  setObservations: React.Dispatch<
    React.SetStateAction<{ id_produit: number; observation: string }[]>
  >;
}

const ProduitServie: React.FC<Props> = ({ ProduitsBCI }) => {
  const [observations, setObservations] = useState<
    { id_produit: number; observation: string }[]
  >([]);

  const handleObservationChange = (id_produit: number, observation: string) => {
    setObservations((prevObservations) => {
      const existingIndex = prevObservations.findIndex(
        (q) => q.id_produit === id_produit
      );
      if (existingIndex !== -1) {
        const updatedObservations = [...prevObservations];
        updatedObservations[existingIndex].observation = observation;
        return updatedObservations;
      } else {
        return [...prevObservations, { id_produit, observation }];
      }
    });
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom Produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantitee accordée
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Observation
            </th>
          </tr>
        </thead>
        <tbody>
          {ProduitsBCI.map((Product, productIndex) => (
            <tr
              key={productIndex}
              className="border-b text-[#2C2D41] border-gray-200"
            >
              <td className="border-t bg-white text-center px-4 py-4">
                {Product.name}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {Product.accordedQuantity}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <input
                  type="text"
                  value={
                    observations.find(
                      (q) => q.id_produit === Product.id_produit
                    )?.observation || ""
                  }
                  onChange={(e) =>
                    handleObservationChange(
                      Product?.id_produit,
                      e.target.value
                    )
                  }
                  className="border border-[#c4c4c4] mx-2 rounded-lg w-18 h-10"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProduitServie;
