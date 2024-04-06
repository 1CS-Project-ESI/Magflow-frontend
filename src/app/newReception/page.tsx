"use client";

import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";
import { Product, Commande } from "@/types";
import OptionSelection from "@/components/receptions/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import getToken from "@/utils/getToken";
import UserID from "@/utils/getID";

const Page = () => {
  const [commands, setCommands] = useState<Commande[]>([]);
  const [selectedCommandId, setSelectedCommandId] = useState<string | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    {
      command: Commande | null;
      product: Product | null;
      deliveredQuantity: number; // Include deliveredQuantity
    }[]
  >([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/bons/allcommands"
        );
        const data = await response.json();
        console.log("this is the article array", data);
        setCommands(data.commands);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchCommands();
  }, []);

  const handleSelectCommand = (command: Commande| null) => {
    setSelectedCommandId(command?.id?.toString() || null);
    fetchCommandProducts(command?.id?.toString() || "");
  };

  const fetchCommandProducts = async (commandId: string) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/commandproducts/${commandId}`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error("Failed to fetch article products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching article products:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    const id = await UserID();

    const now = new Date();
    const orderdate = now.toISOString().substring(0, 10); // Format date as YYYY-MM-DD

    const randomNumber = Math.floor(Math.random() * 100000) + 100000; // Generate a 6-digit number
    const number = `${randomNumber}`;

    const DeliveryDate = new Date(now);
    DeliveryDate.setDate(DeliveryDate.getDate() + 60);
    const deliverydate = DeliveryDate.toISOString().substring(0, 10);

    const status = "pending";
    const productDetails = selectedOptions.map((option) => ({
      productId: option.product?.id,
      deliveredQuantity: option.deliveredQuantity, // Include deliveredQuantity in product details
    }));
    const orderspecifications = "Example command for linking";
    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/create-bon-reception/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number,
            orderdate,
            deliverydate,
            orderspecifications,
            status,
            productDetails,
          }),
        }
      );
      if (response.ok) {
        // Handle success
      } else {
        console.error("Error adding commandes:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding commandes:", error);
    }
  };

  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-2xl mx-8">Nouvelle Reception</h1>
        <OptionSelection
          commands={commands}
          products={products}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          onSelectCommand={handleSelectCommand} //setSelectedArticleId={setSelectedArticleId} // Remove onSelectArticle prop
        />
        <div className="w-full flex justify-end">
          <button
            className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg"
            onClick={handleSubmit}
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
