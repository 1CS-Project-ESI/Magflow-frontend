"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import dlt from "../../../public/assets/icons/delete.svg"
import getToken from "@/utils/getToken";

interface Props {
  products: Product[];
}

// link to delete a product 



const ArticleDetailsTable: React.FC<Props> = ({ products }) => {



const handleDeleteProducts = async (id?: number) => {
 
  const accessToken = await getToken();

  try {
    const response = await fetch(
      `http://localhost:4000/api/store/product/delete/${id}`,
      {
        method: "DELETE", // Set request method to DELETE
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting structure: ${await response.text()}`);
    }

    console.log("product deleted successfully!");
  
  } catch (error) {
    console.error("Error during deletion:", error);

  } finally {
   
  }
};
  return (
    //Table des articles de ce chapitre
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom Produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Caracteristiques
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantité
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
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
                {product.caracteristics}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {product.quantity}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                <button
                  className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                >
                  <div className="flex items-center space-x-2"
                   onClick={async () => {
                    await handleDeleteProducts(product.id);
                  }}>
                    <img
                      src={dlt.src}
                      alt="delete"
                      width="18"
                      height="15"
                    />
                    
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

export default ArticleDetailsTable;
