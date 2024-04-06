"use client";
import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";
import { Commande } from "@/types";
import { Product } from "@/types";
import CommandDetailsTable from "@/components/tables/commandDetailsTable";
import getToken from "@/utils/getToken";
interface Props {
  commands: Commande[];
  products: Product[];


}

// link product artcile 


const CommandDetails: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  fetchCommandProduct();
}, []);

const fetchCommandProduct = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get('id');
    let id = null;
  
    if (idString !== null) {
      id = parseInt(idString, 10);
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/bons/commandproducts/${id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data); // Log the response data
        setProducts(data.products); // Assuming the response structure matches { products: [...] }
      } else {
        console.error("Failed to fetch command products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
    }
  };




  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          <span className="font-bold">Commande</span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
        </div>
        <CommandDetailsTable products={products} />
      </div>
    </AgentLayout>
  );
};

export default CommandDetails;
