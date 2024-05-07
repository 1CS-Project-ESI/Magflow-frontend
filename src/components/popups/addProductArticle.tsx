// PopupContent.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Product } from "@/types";
import getToken from "@/utils/getToken";

interface PopupAddProps {
  onClose: () => void;
}

const PopupAddProduct: React.FC<PopupAddProps> = ({ onClose }) => {
  const [products, setProducts] = useState<Product[]>();
  const [productId, setProductId] = useState<number>();

  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setProductId(parseInt(value));  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    // getting the id from url
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");

    let id: number | null = null;


    if (idString !== null) {
      id = parseInt(idString, 10);
    }
    console.log("this id the ", id);
    console.log("this id hhh the ", productId);

    try {
      const response = await fetch(
        `http://localhost:4000/api/store/addProductByartcileId/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({productId}),
        }
      );
      if (response.ok) {
        onClose();
      } else {
        console.error("Error adding product :", response.statusText);
      }
    } catch (error) {
      console.error("Error adding prduct :", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">
        Ajouter Produit
      </h2>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="mb-4 w-full">
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={handleInputChange}
          >
            <option value="">Produit</option>
            {products?.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        

        {/* Buttons */}
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
            Annuler
          </button>
          <span className="w-2"></span>
          <button
            type="submit"
            className="bg-purple-950 hover:bg-black text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupAddProduct;
