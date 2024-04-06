"use client";

import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";
import { Product, Article, Fournisseur } from "@/types";
import OptionSelection from "@/components/commands/selection";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import getToken from "@/utils/getToken";
import UserID from "@/utils/getID";

const Page = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null); 
  const [articleId, setArticleId] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]); 
  const [selectedOptions, setSelectedOptions] = useState<
    { article: Article | null; product: Product | null; quantity: number }[]
  >([]);

 
 useEffect(() => {
  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/store/article/all');
      const data = await response.json();
      console.log("this is the article array",data)
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  fetchArticles();
}, []);

const handleSelectArticle = (article: Article | null) => {
  setSelectedArticle(article);
  if (article) {
    setArticleId(article.id?.toString() || '');
    setSelectedArticleId(article.id?.toString() || null);
  } else {
    setArticleId('');
    setSelectedArticleId(null);
  }
};

useEffect(() => {
  if (selectedArticleId !== null) {
    console.log("final consol of  id article ",selectedArticleId)
    fetchArticleProducts(selectedArticleId);
  }
}, [selectedArticleId]);

const fetchArticleProducts = async (articleId: string) => {
  const accessToken = await getToken();
  console.log("id of article selected ",articleId );

  try {
    const response = await fetch(`http://localhost:4000/api/store/article/products/${articleId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      const products = data;
      console.log(products);
      setProducts(products);
    } else {
      console.error("Failed to fetch article products:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching article products:", error);
  }
};


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const accessToken = await getToken();
  const id = await UserID();

  console.log("token is ",accessToken);
  console.log("id is ",id);

  const now = new Date();
  const orderdate = now.toISOString().substring(0, 10); // Format date as YYYY-MM-DD 

  const randomNumber = Math.floor(Math.random() * 100000) + 100000; // Generate a 6-digit number
  const number = `${randomNumber}`; 

  const DeliveryDate = new Date(now);
  DeliveryDate.setDate(DeliveryDate.getDate() + 60);
  const deliverydate = DeliveryDate.toISOString().substring(0, 10);


  const status =  "pending" ;
  const productDetails = selectedOptions.map((option) => ({
    productId: option.product?.id,
    orderedQuantity: option.quantity,
  }));
  const orderspecifications = "Example command for linking";
  try {
    const response = await fetch(`http://localhost:4000/api/bons/create/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number,
        orderdate,
        deliverydate,
        orderspecifications,
        status,
        productDetails,
      }),
      
    });
    console.log("this is the id of the slected article ",selectedArticle?.id)
    if (response.ok) {

      
   
    
    } else {
 
      console.error('Error adding commandes:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding commandes:', error);
  }
};


  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-2xl mx-8">Nouvelle Commande Externe</h1>
        <OptionSelection
            articles={articles}
            products={products}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            onSelectArticle={handleSelectArticle}
            setSelectedArticleId={setSelectedArticleId}
          />
        <div className="w-full flex justify-end">
          <button
            className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg"
           
          >
            <div className="flex items-center space-x-2"  onClick={handleSubmit}>
              <img
                src={save.src}
                width="18"
                height="18"
                style={{ filter: "invert(100%)" }}
              />{" "}
             <span>Enregistrer</span>  
            </div>
          </button>
        </div>
      </div>
    </AgentLayout>
  );
};

export default Page;
