"use client";
import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";

import ReceptionDetailsTable from "@/components/tables/receptionDetailsTable";
import { Reception } from "@/types";
import { Product } from "@/types";
import getToken from "@/utils/getToken";

const ReceptionDetails: React.FC = () => {
 

  const [products, setProducts] = useState<Product[]>([]);
  const [reception, setReception] = useState<Reception>({
    id: 0,
    id_magasinier: 0,
    number: 0,
    deliverydate: new Date(),
  });


  useEffect(() => {
    fetchData();
  }, []);

    const fetchData = async () => {

      const url = new URL(window.location.href);
      const idString = url.searchParams.get('id');

      let id: number | null = null;

      if (idString !== null) {
        id = parseInt(idString, 10);
        
      }
      console.log("this id the ",id);

      try {
        const response = await fetch(`http://localhost:4000/api/bons/remaining-products/${id}`); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        
        setProducts(data.remainingProducts);
        console.log("this is the remiang " ,data);
        console.log(data.remainingProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle errors gracefully, e.g., display an error message
      }
    };

  // ... rest of your component


  // getting the id from url 

  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md flex-col">
        <p className="text-[#2C2D41] my-3">La date : </p>
        <div className="flex justify-between text-[#2C2D41] my-3">
          <p>Numero du bon de commande : 00001</p>
          <p>Numero du bon de reception : {reception.id}</p>
          <p>Fournisseur : pc-stor</p>
        </div>
        {/* Conditionally render table if products are available */}
        {products.length > 0 && (
          <ReceptionDetailsTable products={products} />
        )}
      </div>
    </AgentLayout>
  );
        };

export default ReceptionDetails;
