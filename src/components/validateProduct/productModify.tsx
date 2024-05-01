"use client";

import React from "react";
import Link from "next/link";
import { Commande } from "@/types";
import dlt from "../../../public/assets/icons/delete.svg";
import Converter from "@/dateConverter";
import { ProduitBCI } from "@/types";
import { Product } from "@/types";
import { BCI } from "@/types";
import QuantityServie from "../fields/quantityservie";
import { useState } from "react";

interface Props {
  BCIs: BCI[];
  ProduitsBCI: ProduitBCI[];
  Products: Product[];
}

const ProduitServie: React.FC<Props> = ({ BCIs, ProduitsBCI, Products }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400 ">
            <th className="px-4 py-4 font-light">Nom de produit</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantite demandee
            </th>
            <th className="px-4 py-2 font-light hidden md:table-cell">
              Quantite servie
            </th>
          </tr>
        </thead>
        <tbody>
          {Products.map((Product, productIndex) => (
            <tr
              key={productIndex}
              className="border-b text-[#2C2D41] border-gray-200"
            >
              <td className="border-t bg-white text-center px-4 py-4">
                {Product.name}
              </td>
              {ProduitsBCI.map((ProduitBCI, produitIndex) => {
                if (ProduitBCI.id === Product.id) {
                  const [observation, setObservation] = useState("");

                  const handleObservationChange = (event: {
                    target: { value: React.SetStateAction<string> };
                  }) => {
                    setObservation(event.target.value);
                  };
                  return (
                    <React.Fragment key={produitIndex}>
                      <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                        {ProduitBCI.orderedQuantity}
                      </td>
                      <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                        <QuantityServie ProduitBCI={ProduitBCI} />
                      </td>
                      <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                        <div className="items-center justify-center">
                          <input
                            type="text"
                            value={observation}
                            onChange={handleObservationChange}
                            placeholder="Observation"
                            className="border border-[#c4c4c4] mx-2 rounded-lg w-18 h-10"
                          />
                        </div>
                      </td>
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProduitServie;