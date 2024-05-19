"use client";

import React from "react";
import { Product } from "@/types";

interface Props {
  Produits: Product[];
  observations: { produitId: number; physicalQuantity: number; observation: string }[];
  setObservations: React.Dispatch<
    React.SetStateAction<{ produitId: number; physicalQuantity: number; observation: string }[]>
  >;
}

const Produits: React.FC<Props> = ({ Produits, observations, setObservations }) => {
  const handleObservationChange = (produitId: number, physicalQuantity: number, observation: string) => {
    setObservations((prevObservations) => {
      const existingIndex = prevObservations.findIndex(
        (q) => q.produitId === produitId
      );
      if (existingIndex !== -1) {
        const updatedObservations = [...prevObservations];
        updatedObservations[existingIndex].physicalQuantity = physicalQuantity;
        updatedObservations[existingIndex].observation = observation;
        return updatedObservations;
      } else {
        return [...prevObservations, { produitId, physicalQuantity, observation }];
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
          {Produits.map((Product, productIndex) => (
            <tr key={productIndex} className="border-b text-[#2C2D41] border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">{Product.name}</td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">{Product.seuil}</td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">{Product.quantity}</td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <input
                  type="number"
                  value={observations.find((q) => q.produitId === Product.id)?.physicalQuantity || ""}
                  onChange={(e) => {
                    handleObservationChange(
                      Product.id,
                      e.target.value !== "" ? parseInt(e.target.value) : 0,
                      observations.find((q) => q.produitId === Product.id)?.observation || ""
                    );
                  }}
                  className="border border-[#c4c4c4] mx-2 rounded-lg w-18 h-10"
                />
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <input
                  type="text"
                  value={observations.find((q) => q.produitId === Product.id)?.observation || ""}
                  onChange={(e) => {
                    handleObservationChange(
                      Product.id,
                      observations.find((q) => q.produitId === Product.id)?.physicalQuantity || 0,
                      e.target.value
                    );
                  }}
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

export default Produits;
