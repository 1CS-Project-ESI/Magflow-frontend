"use client";

import React, { useEffect, useState } from "react";

import RootLayout from "../rootLayout";

import AddProductButton from "@/components/buttons/addProductButton";
import ProductsTable from "@/components/tables/productsTable";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/store/product/all"
        );
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
    <RootLayout>
      <div className="flex items-center  text-[#2C2D41] justify-between">
        <div className="text-4xl text-[#2C2D41] font-bold m-8">Produits</div>
        {role === "agentserviceachat" ? (
          <div className="flex m-8 justify-end">
            {role === 'agentserviceachat' && <AddProductButton showPopup={true} />}
          </div>
        ) : null}
      </div>
      <div className="m-8 mt-8">
        <ProductsTable products={products} />
      </div>
    </RootLayout>
  );
};

export default ProductsPage;
