"use client";
import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";


import ReceptionDetailsTable from "@/components/tables/receptionDetailsTable";
import { Product } from "@/types";
import getToken from "@/utils/getToken";

const ReceptionDetails: React.FC = () => {
 

  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetchReceptionProduct();
  }, []);

  const fetchReceptionProduct = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/command/received/${id}`,
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
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md flex-col">
        <p className="text-[#2C2D41] my-3">La date : </p>
        <div className="flex justify-between text-[#2C2D41] my-3">
          <p>Numero du bon de commande : 00001</p>
          {/* <p>Numero du bon de reception : {reception.id}</p> */}
        </div>
        {/* Conditionally render table if products are available */}
        {products.length > 0 && (
          <ReceptionDetailsTable products={products} />
        )}
      </div>
    </RootLayout>
  );
        };

export default ReceptionDetails;
