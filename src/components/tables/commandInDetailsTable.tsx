"use client";


import React, { Dispatch, SetStateAction } from "react";
import { ProductCommandeIn } from "@/types";

interface Props {
  products: ProductCommandeIn[];
  valid: boolean;
  updatedQuantities: number[]; // New prop for updated quantities
  onQuantityChange: Dispatch<SetStateAction<number[]>>; // Corrected type for onQuantityChange
}

const CommandInDetailsTable: React.FC<Props> = ({ products, valid, updatedQuantities, onQuantityChange }) => {
  const handleQuantityChange = (index: number, newValue: number) => {
    const newQuantities = [...updatedQuantities];
    newQuantities[index] = newValue;
    onQuantityChange(newQuantities); // Update the entire updatedQuantities array
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom Produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Quantitee demandee</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Quantitee accordee</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">{product.name}</td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {product.orderedQuantity}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {valid ? (
                  <span>{product.accordedQuantity}</span>
                ) : (
                  <input
                    type="number"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={updatedQuantities[index] || product.accordedQuantity}
                    placeholder="Quantite accordee"
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      if (!isNaN(newValue) && newValue >= 0) {
                        handleQuantityChange(index, newValue);
                      }
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommandInDetailsTable;
