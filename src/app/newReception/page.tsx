
"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { ProductReception } from "@/types";
import OptionSelection from "@/components/receptions/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import getToken from "@/utils/getToken";
import UserID from "@/utils/getID";

const Page = () => {
  const [remainingProducts, setRemainingProducts] = useState<ProductReception[]>([]);
  const [receivedQuantities, setReceivedQuantities] = useState<number[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<
    { product: ProductReception | null; deliveredQuantity: number }[]
  >([]);

  useEffect(() => {
    fetchRemainingProducts();
  }, []);

  // const fetchRemainingProducts = async () => {
  //   try {
  //     const accessToken = await getToken();
  //     const url = new URL(window.location.href);
  //     const idString = url.searchParams.get("id");
  //     if (!idString) return;

  //     const id = parseInt(idString, 10);
  //     const response = await fetch(`http://localhost:4000/api/bons/remaining-products/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setRemainingProducts(data.remainingProducts);
  //     } else {
  //       console.error("Failed to fetch remaining products:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching remaining products:", error);
  //   }
  // };

  const fetchRemainingProducts = async () => {
    try {
      const accessToken = await getToken();
      const url = new URL(window.location.href);
      const idString = url.searchParams.get("id");
      if (!idString) return;
  
      const id = parseInt(idString, 10);
      const response = await fetch(`http://localhost:4000/api/bons/remaining-products/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("this is data",data);
        console.log("this is data remainingProducts",data.remainingProducts);
     
        setRemainingProducts(data.remainingProducts);
        // Initialize received quantities with 0 for each remaining product
        setReceivedQuantities(Array(data.remainingProducts.length).fill(0));
      } else {
        console.error("Failed to fetch remaining products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching remaining products:", error);
    }
  };
  

  const handleDeliveryQuantityChange = (index: number, value: number) => {
    setReceivedQuantities(prevQuantities => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value;
      return newQuantities;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const accessToken = await getToken();
      const id_magasinier = await UserID();

      const url = new URL(window.location.href);
      const idString = url.searchParams.get("id");
      if (!idString) return;

      const id = parseInt(idString, 10);

      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
      const number = `${randomNumber}`;

      const now = new Date();
      const deliverydate = now.toISOString().substring(0, 10);

      const products = selectedOptions
        .filter(option => option.product !== null)
        .map(option => option.product!.productId);

      const formData = {
        number,
        deliverydate,
        products,
        receivedQuantities,
        id_magasinier,
      };

      const response = await fetch(`http://localhost:4000/api/bons/create-bon-reception/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Bon reception added successfully");
      } else {
        console.error("Error adding bon reception:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding bon de reception:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-2xl mx-8">Nouvelle Reception</h1>
        <OptionSelection
          remainingProducts={remainingProducts}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
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
              />
              <span>Enregistrer</span>
            </div>
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default Page;
