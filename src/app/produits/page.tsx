"use client";

import React, { useEffect, useState } from "react";

import AgentLayout from "../agentLayout";

import AddProductButton from "@/components/buttons/addProductButton";
import ProductsTable from "@/components/tables/productsTable";

const ProductsPage: React.FC = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/store/product/all'); 
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching products: ${data.message}`);
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        
      }
    };

    fetchProducts();
  }, []);

  return (
    <AgentLayout>
      <div className="flex m-8 justify-end">
        <AddProductButton showPopup={true} />
      </div>
      <div className="m-8 mt-8">
        <ProductsTable products={products} />
      </div>
    </AgentLayout>
  );
};

export default ProductsPage;
