"use client";

import React from "react";
import { Product } from "@/types";
import dlt from "../../../public/assets/icons/delete.svg"

interface Props {
  products: Product[];
}

const ProductsTable: React.FC<Props> = ({ products }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom de Produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Caractéristiques
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">
                {product.name}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {product.caracteristics}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 md:table-cell flex items-center justify-center">
                <button
                  className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <img src={dlt.src} width="18" height="15" />
                    <span>Supprimer</span>
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
