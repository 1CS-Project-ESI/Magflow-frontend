"use client";

import React, { useEffect, useState } from "react";
import AddCommandButton from "@/components/buttons/addCommandButton";
import ProduitServie from "@/components/validateProduct/productModify";
import RootLayout from "../rootLayout";
import getToken from "@/utils/getToken";
import { CommandeIn, ProductCommandeIn } from "@/types";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import { Underdog } from "next/font/google";


const BonDeSortie: React.FC = () => {
  const [command, setCommand] = useState<CommandeIn>();
  const [products, setProducts] = useState<ProductCommandeIn[]>([]);

  // const role = localStorage.getItem("role");
  // var valid: boolean;

  useEffect(() => {
    fetchCommandProduct();
  }, []);

  const fetchCommandProduct = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/commandinterne/details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data); // Log the response data
        setCommand(data.command);
        setProducts(data.products); // Assuming the response structure matches { products: [...] }
      } else {
        console.error("Failed to fetch command products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
    }
  };

  return (
    <RootLayout>
    <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
      <h1 className="text-2xl mx-8">Nouvelle Sortie</h1>
      <ProduitServie  ProduitsBCI={products} >
      </ProduitServie>
      <div className="w-full flex justify-end">
        <button
          className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg"
          // onClick={handleSubmit}
        >
          <div className="flex items-center space-x-2">
            <img src={save.src} width="18" height="18" style={{ filter: "invert(100%)" }} alt="Save" />{" "}
            <span>Enregistrer</span>
          </div>
        </button>
      </div>
    </div>
  </RootLayout>
  );
};

export default BonDeSortie;
