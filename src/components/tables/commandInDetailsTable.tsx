"use client";

import React from "react";
import { ProductCommandeIn } from "@/types";
import getToken from "@/utils/getToken";

interface Props {
  products: ProductCommandeIn[];
  valid: boolean;
}

// link to delete a product

const CommandInDetailsTable: React.FC<Props> = ({ products, valid }) => {
  return (
    //Table des produits de cette commande
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom Produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantitee demandee
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantitee accordee
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">
                {product.name}
              </td>
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
                    value={product.accordedQuantity}
                    onChange={(e) => {
                    //   const newQuantity = parseInt(e.target.value);
                    //   if (!isNaN(newQuantity) && newQuantity >= 0) {
                    //     const updatedOptions = [...selectedOptions];
                    //     updatedOptions[index].quantity = newQuantity;
                    //     setSelectedOptions(updatedOptions);
                    //   }
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
