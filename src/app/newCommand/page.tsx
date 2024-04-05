"use client";

import React, { useState } from "react";
import AgentLayout from "../agentLayout";
import { Product, Article } from "@/types";
import OptionSelection from "@/components/commands/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";


// Sample data for articles
const articles: Article[] = [
  {
    id: 1,
    name: "Article 1",
    description: "Description 1",
    tva: 20,
    chapter_id: 1,
  },
  {
    id: 2,
    name: "Article 2",
    description: "Description 2",
    tva: 15,
    chapter_id: 2,
  },
  {
    id: 3,
    name: "Article 3",
    description: "Description 3",
    tva: 10,
    chapter_id: 3,
  },
];

// Sample data for products
const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    caracteristics: "Caracteristics 1",
    price: 100,
    article_id: 1,
  },
  {
    id: 2,
    name: "Product 2",
    caracteristics: "Caracteristics 2",
    price: 150,
    article_id: 2,
  },
  {
    id: 3,
    name: "Product 3",
    caracteristics: "Caracteristics 3",
    price: 200,
    article_id: 3,
  },
];

const Page = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    { article: Article | null; product: Product | null; quantity: number }[]
  >([]);

  const handleSave = () => {
    // Perform save operation with selected options
    console.log("Selected options:", selectedOptions);
  };

  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-2xl mx-8">Nouvelle Commande Externe</h1>
        <OptionSelection
          articles={articles}
          products={products}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className="w-full flex justify-end" >
          <button
            className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg"
            onClick={handleSave}
          >
            <div className="flex items-center space-x-2">
              <img
                src={save.src}
                width="18"
                height="18"
                style={{ filter: "invert(100%)" }}
              />{" "}
              <span>Enregistrer</span>
            </div>
          </button>
        </div>{" "}
      </div>
    </AgentLayout>
  );
};

export default Page;
