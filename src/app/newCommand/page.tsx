"use client";

import React, { useState } from "react";
import AgentLayout from "../agentLayout";
import { Product, Article, Fournisseur } from "@/types";
import OptionSelection from "@/components/commands/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";

const Page = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    { article: Article | null; product: Product | null; quantity: number }[]
  >([]);
  const [selectedFournisseurId, setSelectedFournisseurId] = useState<string>("");
  const [articles, setArticles] = useState<Article[]>([
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
    // Add more articles as needed
  ]);
  const [products, setProducts] = useState<Product[]>([
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
    // Add more products as needed
  ]);
  const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([
    {
      id: 1,
      name: "Fournisseur 1",
      email: "fournisseur1@example.com",
      phone: 1234567890,
      rc: "1234ABC",
      nif: 123456,
      rib: "ABC123",
    },
    {
      id: 2,
      name: "Fournisseur 2",
      email: "fournisseur2@example.com",
      phone: 9876543210,
      rc: "5678DEF",
      nif: 654321,
      rib: "DEF567",
    },
    // Add more fournisseurs as needed
  ]);

  const handleSave = () => {
    // Perform save operation with selected options and final select input value
    console.log("Selected options:", selectedOptions);
    console.log("Selected fournisseur ID:", selectedFournisseurId);
  };

  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-2xl mx-8">Nouvelle Commande Externe</h1>
        <OptionSelection
          articles={articles}
          products={products}
          fournisseurs={fournisseurs}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          selectedFournisseurId={selectedFournisseurId}
          setSelectedFournisseurId={setSelectedFournisseurId}
        />
        <div className="w-full flex justify-end">
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
        </div>
      </div>
    </AgentLayout>
  );
};

export default Page;
