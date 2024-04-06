"use client";

import React from "react";
import { Product } from "@/types";
import getToken from "@/utils/getToken";

interface Props {
  products: Product[];
}

// link to delete a product 



const CommandDetailsTable: React.FC<Props> = ({ products }) => {




  return (
    //Table des produits de cette commande
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom Produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Caracteristiques
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Prix</th>
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
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {product.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommandDetailsTable;
