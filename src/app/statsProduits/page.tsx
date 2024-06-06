"use client";
import React, { useState, useEffect } from "react";
import { Product, Article } from "@/types";
import RootLayout from "../rootLayout";
import Card6 from "../../components/statistic/card6";
import "tailwindcss/tailwind.css";
import getToken from "@/utils/getToken";
import Converter from "@/dateConverter";

const StatisRS: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
  const [dateDebut, setDateDebut] = useState<Date>();
  const [dateFin, setDateFin] = useState<Date>();
  const [topConsumers, setTopConsumers] = useState<{ consumerName: string; quantity: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; totalQuantity: number }[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/store/article/all");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${data.message}`);
        }
        setArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    fetchArticleProducts(selectedArticleId);
  }, [selectedArticleId]);

  const fetchArticleProducts = async (articleId: string | null) => {
    const accessToken = await getToken();
    try {
      const response = await fetch(
        `http://localhost:4000/api/store/article/products/${articleId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch article products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "dateDebut") {
      setDateDebut(value ? new Date(value) : undefined);
    } else if (name === "dateFin") {
      setDateFin(value ? new Date(value) : undefined);
    }
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(product => product.id?.toString() === selectedProductId);
    setSelectedProductId(selectedProductId);
    setSelectedProductName(selectedProduct ? selectedProduct.name : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    if (selectedArticleId != "") {
      if (!dateDebut && !dateFin) {
        // If no dates are selected
        try {
          const response = await fetch(
            `http://localhost:4000/api/statistics/consumerproduct/${selectedProductId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setTopConsumers(data);
            console.log("Top consumers:", data);
          } else {
            console.error("Failed to fetch top consumers:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching top consumers:", error);
        }
      } else if (dateDebut && dateFin) {
        // If both start and end dates are selected
        try {
          const response = await fetch(
            `http://localhost:4000/api/statistics/consumerproductbydate/${selectedProductId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                startDate: dateDebut.toISOString().split("T")[0],
                endDate: dateFin.toISOString().split("T")[0],
              }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            setTopConsumers(data);
            console.log("Top consumers by date:", data);
          } else {
            console.error("Failed to fetch top consumers by date:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching top consumers by date:", error);
        }
      }
    }
  };

  const fetchMostConsumableProducts = async () => {
    const accessToken = await getToken();
    try {
      const response = await fetch(
        `http://localhost:4000/api/statistics/mostconsumableproducts`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const processedData = data.map((item: any) => ({
          name: item.product.name,
          totalQuantity: item.total_decharged + item.total_served,
        }));
        
        // Sort the processed data in descending order based on totalQuantity
        processedData.sort((a: { totalQuantity: number; }, b: { totalQuantity: number; }) => b.totalQuantity - a.totalQuantity);
  
        setTopProducts(processedData);
        console.log("Most consumable products:", processedData);
      } else {
        console.error("Failed to fetch most consumable products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching most consumable products:", error);
    }
  };
  

  useEffect(() => {
    fetchMostConsumableProducts();
  }, []);

  return (
    <RootLayout>
      <div className="">
        <div className="text-4xl text-[#2C2D41] font-bold m-8">Statistiques Produits</div>
        <div className="bg-white rounded-md p-4 m-8 grid grid-cols-1">
          <h1 className="text-3xl mx-8">Filtrer les resultats (consommateurs) :</h1>
          <div className="text-lg w-full mx-8 mt-4 mb-2">Séléctionner un article et puis un produit :</div>
          <div className="flex justify-center w-full">
            <div className="flex items-center w-2/3 mx-8 mb-4">
              <div className="flex-1 mr-4">
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={selectedArticleId || ""}
                  onChange={(e) => {
                    setSelectedArticleId(e.target.value);
                    setSelectedProductId(null); // Reset article selection when chapter changes
                  }}
                >
                  <option value="">Article</option>
                  {articles.map((article) => (
                    <option key={article.id} value={article.id?.toString()}>{article.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 mr-4">
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={selectedProductId || ""}
                  onChange={handleProductChange}
                  disabled={!selectedArticleId}
                >
                  <option value="">Produit</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id?.toString()}>{product.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="text-lg mx-8 mt-4 mb-2">Séléctionner les dates de debut et fin :</div>
          <div className="flex justify-center w-full">
            <div className="flex items-center w-2/3 mx-8 mb-4">
              <div className="flex-1 mr-4">
                <input
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  placeholder="Date Debut"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={dateDebut?.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1 mr-4">
                <input
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  placeholder="Date Fin"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={dateFin?.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-purple-950 hover:bg-black text-white py-2 px-4 rounded m-8 focus:outline-none focus:shadow-outline w-1/3"
              onClick={handleSubmit}
            >
              Appliquer
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md p-4 m-8 grid grid-cols-4 gap-4">
          <div className="col-span-1 m-4">
            <Card6 topProducts={topProducts} />
          </div>
          <div className="col-span-3 m-4">
            <h1 className="text-3xl mx-8">Resultats :</h1>
            <div className="grid grid-cols-1">
              <div className="text-lg w-full mx-8 mt-4 mb-2">
                Les consommateurs qui ont consommé le produit{" "}
                <b>{selectedProductName ? selectedProductName : ""}</b>
                <br />
                Du : <b><Converter date={dateDebut} /></b> Au : <b><Converter date={dateFin} /></b>
              </div>
              <div className="border border-purple-950 rounded-lg m-8">
                <table className="table-auto w-full overflow-hidden">
                  <thead>
                    <tr className="bg-white text-zinc-400">
                      <th className="px-4 py-4 font-light">Nom Consommateur</th>
                      <th className="px-4 py-2 font-light hidden md:table-cell">Quantite</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topConsumers.map((consumer, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                          {consumer.consumerName}
                        </td>
                        <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                          {consumer.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default StatisRS;
