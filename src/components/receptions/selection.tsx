"use client";

import React, { useState } from "react";
import { Product, Commande, ProductReception } from "@/types";
import ajt from "../../../public/assets/icons/Add.svg";
import dlt from "../../../public/assets/icons/delete.svg";

interface OptionSelectionProps {
  remainingProducts: ProductReception[];
  selectedOptions: {
    product: ProductReception | null;
    deliveredQuantity: number;
  }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<
      {
        product: ProductReception | null;
        deliveredQuantity: number;
      }[]
    >
  >;
  onDeliveryQuantityChange: (index: number, value: number) => void;
}

const OptionSelection: React.FC<OptionSelectionProps> = ({
  remainingProducts,
  selectedOptions,
  setSelectedOptions,
  onDeliveryQuantityChange,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [deliveredQuantity, setDeliveredQuantity] = useState<number>(0);

  const handleQuantityChange = (index: number, value: number) => {
    // Validate quantity (optional)
    if (value >= 0) {
      onDeliveryQuantityChange(index, value); // Call the prop function
      // setDeliveredQuantity(value); // Update local state for table display
    }
  };

  // const handleQuantityChange = (index: number, value: number) => {
  //   // Call the prop function to update the delivery quantity
  //   onDeliveryQuantityChange(index, value);
  // };

  const handleAddOption = () => {
    if (selectedProductId) {
      const product = remainingProducts.find(
        (product) => product.productId?.toString() === selectedProductId
      );
      if (product) {
        setSelectedOptions((prevOptions) => [
          ...prevOptions,
          { product, deliveredQuantity },
        ]);
        setSelectedProductId("");
        setDeliveredQuantity(0); // Reset deliveredQuantity
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
      <div className="flex items-center m-8">
        <div className="text-lg">Séléctionner des produits :</div>
        <div className="flex-1 ml-10">
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">Produit</option>
            {remainingProducts?.map((product) => (
              <option
                key={product.productId}
                value={product.productId?.toString()}
              >
                {product.productId?.toString()}
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

      <div className="overflow-x-auto border border-gray-300 rounded-xl mx-8 mb-8 mt-4">
        <table className="table-auto w-full overflow-hidden">
          <thead>
            <tr className="bg-white text-zinc-400">
              <th className="px-4 py-2 font-light hidden md:table-cell">
                Produit
              </th>
              <th className="px-4 py-2 font-light hidden md:table-cell">
                Quantité demandée
              </th>
              <th className="px-4 py-2 font-light hidden md:table-cell">
                Quantité restée
              </th>
              <th className="px-4 py-2 font-light hidden md:table-cell">
                Quantité recevée
              </th>
              <th className="px-4 py-2 font-light hidden md:table-cell"></th>
            </tr>
          </thead>
          <tbody className="table-auto w-full overflow-hidden">
            {selectedOptions.map((option, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="border-t bg-white text-center px-4 py-4">
                  {option.product?.name}
                </td>
                <td className="border-t bg-white text-center px-4 py-4">
                  {option.product?.orderedQuantity}
                </td>
                <td className="border-t bg-white text-center px-4 py-4">
                  {option.product?.remainingQuantity}
                </td>
                <td className="border-t bg-white text-center px-4 py-4">
                  <input
                    type="number"
                    placeholder="Quantite Livrée"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={option.deliveredQuantity || ""}
                    onChange={(e) => {
                      let value = parseInt(e.target.value);
                      const maxValue = option.product?.remainingQuantity; 
                      if (maxValue && value > maxValue) {
                        value = maxValue; 
                      }
                      handleQuantityChange(index, value);
                      setSelectedOptions((prevOptions) => {
                        const newOptions = [...prevOptions];
                        newOptions[index] = {
                          ...newOptions[index],
                          deliveredQuantity: value,
                        };
                        return newOptions;
                      });
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
  );
};

export default OptionSelection;
