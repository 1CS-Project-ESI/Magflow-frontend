"use client";

import React, { useState } from "react";
import { Product, Article } from "@/types";
import ajt from "../../../public/assets/icons/Add.svg";
import dlt from "../../../public/assets/icons/delete.svg";

interface OptionSelectionProps {
  articles: Article[];
  products: Product[];
  selectedOptions: {
    article: Article | null;
    product: Product | null;
    quantity: number;
  }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<
      { article: Article | null; product: Product | null; quantity: number }[]
    >
  >;
}

const OptionSelection: React.FC<OptionSelectionProps> = ({
  articles,
  products,
  selectedOptions,
  setSelectedOptions,
}) => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);

  const handleAddOption = () => {
    if (selectedArticleId && selectedProductId && quantity > 0) {
      const article = articles.find(
        (article) => article.id?.toString() === selectedArticleId
      );
      const product = products.find(
        (product) => product.id?.toString() === selectedProductId
      );
      if (article && product) {
        setSelectedOptions((prevOptions) => [
          ...prevOptions,
          { article, product, quantity },
        ]);
        setSelectedArticleId("");
        setSelectedProductId("");
        setQuantity(0);
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
        <div className="flex-1 mr-4">
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={selectedArticleId}
            onChange={(e) => setSelectedArticleId(e.target.value)}
          >
            <option value="">Article</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id?.toString()}>
                {article.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 mr-4">
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
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
        <div className="flex-1 mr-4">
          <input
            type="number"
            placeholder="Quantite"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
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

      <div className="w-full font-medium flex items-center justify-center">
        <tbody className="table-auto w-full overflow-hidden">
          {selectedOptions.map((option, index) => (
            <tr
              key={index}
              className="border-y border-gray-200 flex justify-evenly"
            >
              <th className="bg-white text-center px-4 py-4">
                {option.product?.name}
              </th>
              <th className="bg-white text-center px-4 py-4">
                {option.product?.price}
              </th>
              <th className="bg-white text-center px-4 py-4">
                {option.quantity}
              </th>
              <th className="bg-white text-center px-4 py-4">
                <button
                  className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                  onClick={() => handleDeleteOption(index)}
                >
                  <div className="flex items-center space-x-2">
                    <img src={dlt.src} width="18" height="15" />
                    <span>Supprimer</span>
                  </div>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};

export default OptionSelection;