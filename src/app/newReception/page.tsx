"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { Product, Commande } from "@/types";
import OptionSelection from "@/components/receptions/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import getToken from "@/utils/getToken";
import UserID from "@/utils/getID";

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [deliveryQuantities, setDeliveryQuantities] = useState<number[]>([]);

  const [selectedOptions, setSelectedOptions] = useState<
    {
      product: Product | null;
      deliveredQuantity: number;
    }[]
  >([]);

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
        `http://localhost:4000/api/bons/commandproducts/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("this is the data.products", data.products);
        setProducts(data.products);
      } else {
        console.error("Failed to fetch command products:", response.statusText);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
      setProducts([]);
      setDeliveryQuantities([]);
    }
  };

  const handleDeliveryQuantityChange = (index: number, value: number) => {
    setDeliveryQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value;
      return newQuantities;
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    const id_magasinier = await UserID();

    const now = new Date();
    const orderdate = now.toISOString().substring(0, 10);

    const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    const number = `${randomNumber}`;

    const DeliveryDate = new Date(now);
    DeliveryDate.setDate(DeliveryDate.getDate());
    const deliverydate = DeliveryDate.toISOString().substring(0, 10);

    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id_boncommande = null;

    if (idString !== null) {
      id_boncommande = parseInt(idString, 10);

      const products = selectedOptions
        .filter(
          (option) => option.product !== undefined && option.product !== null
        )
        .map((option) => option.product?.id);

      console.log("the user with is has a magatiner role", id_magasinier);
      console.log("this is the products array ", products);
      console.log("this is receivedQuantities", deliveryQuantities);

      const formData = {
        id_magasinier,
        number,
        deliverydate,
        products,
        deliveryQuantities,
      };

      console.log("thhis is the formData", formData);
      try {
        const response = await fetch(
          `http://localhost:4000/api/bons/create-bon-reception/${id_boncommande}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          console.log("bon reception  added successfully");
        } else {
          console.error("Error adding bon reception :", response.statusText);
        }
      } catch (error) {
        console.error("Error adding bon de reception :", error);
      }
    }
  };
  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-2xl mx-8">Nouvelle Reception</h1>
        <OptionSelection
          products={products}
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
