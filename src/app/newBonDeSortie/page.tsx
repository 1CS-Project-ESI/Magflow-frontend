"use client";

import React, { useEffect, useState } from "react";
import AddCommandButton from "@/components/buttons/addCommandButton";
import ProduitServie from "@/components/validateProduct/productModify";
import RootLayout from "../rootLayout";
import { ProduitBCI } from "@/types";
import { Product } from "@/types";
import { BCI } from "@/types";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import { Underdog } from "next/font/google";

interface Props {
  BCIs: BCI[];
  ProduitsBCI: ProduitBCI[];
  Products: Product[];
}

const BCIs: BCI[] = [
  {
    id: 1,
    num: 123,
    date: new Date(), // Fill with actual date
    phone: 1234567890,
    Validation: 1,
  },
  {
    id: 2,
    num: 234,
    date: new Date(), // Fill with actual date
    phone: 1234567890,
    Validation: 1,
  },
  {
    id: 3,
    num: 345,
    date: new Date(), // Fill with actual date
    phone: 1234567890,
    Validation: 1,
  },
  // Add more BCI objects as needed
];

const produitsBCI: ProduitBCI[] = [
  {
    id_BCI: 1,
    id: 1,
    orderedQuantity: 10,
    accordeQuantity: 8,
  },
  {
    id_BCI: 1,
    id: 2,
    orderedQuantity: 9,
    accordeQuantity: 8,
  },
  {
    id_BCI: 1,
    id: 3,
    orderedQuantity: 11,
    accordeQuantity: 8,
  },
  // Add more ProduitBCI objects as needed
];

const products: Product[] = [
  {
    id: 1,
    name: "Product A",
    caracteristics: "Some characteristics of Product A",
    price: undefined,
    seuil: undefined,
    quantity:undefined,
  },
  {
    id: 2,
    name: "Product B",
    caracteristics: "Some characteristics of Product B",
    price: undefined,
    seuil: undefined,
    quantity:undefined,
  },
  {
    id: 3,
    name: "Product C",
    caracteristics: "Some characteristics of Product C",
    price: undefined,
    seuil: undefined,
    quantity:undefined,
  },
  // Add more Product objects as needed
];

const props: Props = {
  BCIs,
  ProduitsBCI: produitsBCI,
  Products: products,
};

const BonDeSortie: React.FC = () => {
  const [commands, setCommands] = useState([]);
  const currentDate: string = new Date().toLocaleDateString();

  return (
    <RootLayout>
      <div className="flex justify-center">
        <h2 className="text-[#2C2D41] text-[40px] font-weight: 900;">
          BON DE SORTIE
        </h2>
      </div>
      <div className="overflow-x-auto bg-[#fffffe] border border-gray-300 rounded-xl">
        <div className="text-[#2C2D41] m-8 mt-8">
          <p>La date : {currentDate}</p>
        </div>
        <div className="m-8 mt-8">
          <ProduitServie
            BCIs={BCIs}
            ProduitsBCI={produitsBCI}
            Products={products}
          />
        </div>
        <div className="my-8 w-full flex justify-end">
          <button className="bg-[#fffffe] text-[#2C2D41] hover:bg-black hover:text-[#fffffe] border border-[#510A6D] font-medium py-2 px-4 mx-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <span>Annuler</span>
            </div>
          </button>
          <button className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mr-8 rounded-lg">
            <div className="flex items-center space-x-2">
              <span>Valider</span>
            </div>
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default BonDeSortie;
