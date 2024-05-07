"use client";
import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { Article } from "@/types";
import { Product } from "@/types";
import ArticleDetailsTable from "@/components/tables/articleDetailsTable";
import getToken from "@/utils/getToken";
import AddProductButton from "@/components/buttons/addProductArticleButton";

interface Props {
  articles: Article[];
  products: Product[];


}

// link product artcile 


const ArticleDetails: React.FC = () => {
  const [article, setArticle] = useState<Article>();
  const [products, setProducts] = useState<Product[]>([]);

  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    fetchArticleInfo();
  }, []);

  const fetchArticleInfo = async () => {
    const accessToken = await getToken();
    // getting the id from url
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");

    let id: number | null = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }
    console.log("this id the ", id);
    try {
      const response = await fetch(
        `http://localhost:4000/api/store/article/infos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const infos = data.article;
        console.log(infos);

        setArticle(infos);
      } else {
        console.error("Failed to fetch chapp artciles :", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching arctiles:", error);
    }
  };

useEffect(() => {
  fetchArtcileProduct();
}, []);

const fetchArtcileProduct = async () => {
  const accessToken = await getToken();
  // getting the id from url 
  const url = new URL(window.location.href);
      const idString = url.searchParams.get('id');

      let id: number | null = null;

      if (idString !== null) {
        id = parseInt(idString, 10);
        
      }
      console.log("this id the ",id);
  try {
    const response = await fetch(`http://localhost:4000/api/store/article/products/${id}`,{
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
      console.error("Failed to fetch chapp artciles :", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching arctiles:", error);
  }
};




  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Nom d'Article : <span className="font-bold"> {article?.name}</span>
        </div>
        <div className="text-xl mb-4">
          Description :<span className="font-bold">{article?.description}</span>
        </div>
        <div className="text-xl mb-4">
          TVA :<span className="font-bold"> {article?.tva} %</span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
          {role === "agentserviceachat" ? (<AddProductButton showPopup={true} />) : null}
        </div>
        <ArticleDetailsTable products={products} />
      </div>
    </RootLayout>
  );
};

export default ArticleDetails;
