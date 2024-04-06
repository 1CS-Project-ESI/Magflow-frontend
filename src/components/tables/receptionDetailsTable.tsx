"use client";

import React from "react";
import { Product } from "@/types";
import getToken from "@/utils/getToken";

interface Props {
  products: Product[];
}

const ReceptionDetailsTable: React.FC<Props> = ({ products }) => {
  return (
    // table t3 produit w reste a livrer
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom Produit</th>
            <th className="px-4 py-4 font-light">Quantite comandee</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantite livree
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantite reste a livrer
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
                {" "}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {" "}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceptionDetailsTable;
