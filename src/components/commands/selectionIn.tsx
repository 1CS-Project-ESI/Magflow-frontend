"use client";

import React, { useState } from "react";
import { Chapter, Product, Article, Fournisseur } from "@/types";
import ajt from "../../../public/assets/icons/Add.svg";
import dlt from "../../../public/assets/icons/delete.svg";

interface OptionSelectionProps {
  products: Product[];
  selectedOptions: {
    product: Product | null;
    quantity: number;
  }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<
      {
        product: Product | null;
        quantity: number;
      }[]
    >
  >;
}

const OptionSelection: React.FC<OptionSelectionProps> = ({
  products,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);


  const handleAddOption = () => {
    if (selectedProductId) {
      const product = products.find(
        (product) => product.id?.toString() === selectedProductId
      );
      if (product) {
        const isProductSelected = selectedOptions.some(
          (option) => option.product?.id === product.id
        );
        if (!isProductSelected) {
          setSelectedOptions((prevOptions) => [
            ...prevOptions,
            { product, quantity },
          ]);
        } else {
          console.log("Product already selected");
        }
        setSelectedProductId("");
      }
    }
  };

  const handleDeleteOption = (index: number) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions.splice(index, 1);
      return newOptions;
    });
  };

  return (
    <div className="bg-white border border-gray-300 p-8 m-8 rounded-md">
      <div className=" grid grid-cols-1">
        <h1 className="text-2xl mx-8">Ajouter des produits :</h1>
        <div className="flex items-center mx-8 mb-8">
          <div className="text-lg">Séléctionner des produits :</div>
          <div className="w-full flex-1 flex items-center justify-center">
            <select
              className="border border-gray-300 rounded-md p-2 w-2/3"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Produit</option>
              {products.map((product) => (
                <option key={product.id} value={product.id?.toString()}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex-1 flex items-center justify-center">
            <button
              className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 rounded-lg"
              onClick={handleAddOption}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={ajt.src}
                  width="18"
                  height="18"
                  style={{ filter: "invert(100%)" }}
                />{" "}
                <span>Ajouter</span>
              </div>
            </button>
          </div>
        </div>
        <h1 className="text-2xl mx-8">Produits :</h1>
        <div className="overflow-x-auto border border-gray-300 rounded-xl mx-8 mb-8 mt-4">
          <table className="table-auto w-full overflow-hidden">
            <thead>
              <tr className="bg-white text-zinc-400">
                <th className="px-4 py-2 font-light hidden md:table-cell">
                  Produit
                </th>
                <th className="px-4 py-2 font-light hidden md:table-cell">
                  Quantité
                </th>
                <th className="px-4 py-2 font-light hidden md:table-cell"></th>
              </tr>
            </thead>
            <tbody>
              {selectedOptions.map((option, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="border-t bg-white text-center px-4 py-4">
                    {option.product?.name}
                  </td>
                  <td className="border-t bg-white text-center px-4 py-4">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={option.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (!isNaN(newQuantity) && newQuantity >= 0) {
                          const updatedOptions = [...selectedOptions];
                          updatedOptions[index].quantity = newQuantity;
                          setSelectedOptions(updatedOptions);
                        }
                      }}
                    />
                  </td>
                  <td className="border-t bg-white text-center px-4 py-4">
                    <button
                      className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                      onClick={() => handleDeleteOption(index)}
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
      </div>
    </div>
  );
};

export default OptionSelection;
