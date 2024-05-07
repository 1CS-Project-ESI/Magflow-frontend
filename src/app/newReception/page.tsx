"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { Product, Commande, ProductReception } from "@/types";
import OptionSelection from "@/components/receptions/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import getToken from "@/utils/getToken";
import UserID from "@/utils/getID";

const Page = () => {
  const [remainingProducts, setProducts] = useState<ProductReception[]>([]);
  const [receivedQuantities, setReceivedQuantities] = useState<number[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    {
      product: ProductReception | null;
      deliveredQuantity: number;
    }[]
  >([]);

  // useEffect(() => {
  //   fetchCommands();
  // }, []);

  // const fetchCommands = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/bons/allcommands");
  //     const data = await response.json();
  //     if (response.ok) {
  //       setCommands(data.commands);
  //     } else {
  //       console.error("Error fetching commands:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching commands:", error);
  //   }
  // };

  // const handleSelectCommand = (command: Commande | null) => {
  //   if (command) {
  //     console.log("this is the selected commands  command.id",command.id);
  //     fetchCommandProducts(command.id.toString());
  //   } else {
  //     setProducts([]);
  //   }
  // };

  useEffect(() => {
    fetchCommandProducts();
  }, []);

  const fetchCommandProducts = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }
    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/remaining-products/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("this is the data.products", data.remainingProducts);
        setProducts(data.remainingProducts);
      } else {
        console.error("Failed to fetch command products:", response.statusText);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
      setProducts([]);
      setReceivedQuantities([]);
    }
  };

  const handleDeliveryQuantityChange = (index: number, value: number) => {
    setReceivedQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value; // Update quantity at specific index
      return newQuantities;
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    const id_magasinier = await UserID();

    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");

    let id: number | null = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }
    console.log("this id the ", id);

    const now = new Date();
    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const number = `${randomNumber}`;
    const DeliveryDate = new Date(now);
    DeliveryDate.setDate(DeliveryDate.getDate());
    const deliverydate = DeliveryDate.toISOString().substring(0, 10);

    // const products = selectedOptions.map((option) => option.product?.id);
    const products = selectedOptions
      .filter(
        (option) => option.product !== undefined && option.product !== null
      )
      .map((option) => option.product?.productId);
    //  const deliveryQuantities = selectedOptions.map((option) => option.deliveredQuantity);
    console.log("the user with is has a magatiner role", id);
    console.log("this is the products array ", products);
    console.log("this is receivedQuantities", receivedQuantities);

    const formData = {
      number,
      deliverydate,
      products,
      receivedQuantities,
      id_magasinier,
    };

    console.log("thhis is the formData", formData);
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
            deliverydate,
            products,
            receivedQuantities,
            id_magasinier,
          }), // Use formData here
        }
      );

      if (response.ok) {
        console.log("Commandes added successfully");
        // Add any additional success handling here
      } else {
        console.error("Error adding commandes:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding commandes:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-2xl mx-8">Nouvelle Reception</h1>
        <OptionSelection
          remainingProducts={remainingProducts}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions} // Pass the prop here
          onDeliveryQuantityChange={handleDeliveryQuantityChange}
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
                alt="Save"
              />{" "}
              <span>Enregistrer</span>
            </div>
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default Page;
