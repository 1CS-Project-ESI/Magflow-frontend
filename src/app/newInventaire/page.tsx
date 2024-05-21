"use client";

import React, { useEffect, useState } from "react";
import AddCommandButton from "@/components/buttons/addCommandButton";
import Produits from "@/components/validateProduct/inventaireValidation";
import RootLayout from "../rootLayout";
import getToken from "@/utils/getToken";
import { Inventaire, Product, Chapter, Article } from "@/types";

const EtatInventaire: React.FC = () => {
  const [produits, setProduits] = useState<Product[]>([]);
  const [products, setProducts] = useState<
    {
      produitId: number;
      physicalQuantity: number;
      observation: string;
    }[]
  >([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [chapterId, setChapterId] = useState<string>("");
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [articleId, setArticleId] = useState<string>("");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const initialObservations = products.map(({ produitId }) => ({
      produitId,
      physicalQuantity: 0,
      observation: "",
    }));
    setProducts(initialObservations);
  }, [produits]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch("http://localhost:4000/api/store/product/all");
  //       const data = await response.json();
  //       console.log(data);
  //       if (!response.ok) {
  //         throw new Error(`Error fetching products: ${data.message}`);
  //       }
  //       setProduits(data.products);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/store/chapter/all"
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching chapters: ${data.message}`);
        }

        setChapters(data.chapters);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      }
    };

    fetchChapters();
  }, []);

  const handleSelectdChapter = (chapter: Chapter | null) => {
    setSelectedChapter(chapter);
    if (chapter) {
      setChapterId(chapter.id?.toString() || "");
      setSelectedChapterId(chapter.id?.toString() || null);
    } else {
      setChapterId("");
      setSelectedChapterId(null);
    }
  };

  useEffect(() => {
    if (selectedChapterId !== null) {
      console.log("final consol of  id chapter ", selectedChapterId);
      fetchChapterArticles(selectedChapterId);
    }
  }, [selectedChapterId]);

  const fetchChapterArticles = async (chapterId: string) => {
    const accessToken = await getToken();
    console.log("id of chapter selected ", chapterId);

    try {
      const response = await fetch(
        `http://localhost:4000/api/store/chapter/articles/${chapterId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const articles = data;
        console.log(articles);
        setArticles(articles);
      } else {
        console.error("Failed to fetch chapter articles:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching chapter articles:", error);
    }
  };

  const handleSelectedArticle = (article: Article | null) => {
    setSelectedArticle(article);
    if (article) {
      setArticleId(article.id?.toString() || "");
      setSelectedArticleId(article.id?.toString() || null);
    } else {
      setArticleId("");
      setSelectedArticleId(null);
    }
  };

  useEffect(() => {
    if (selectedArticleId !== null) {
      console.log("final consol of  id article ", selectedArticleId);
      fetchArticleProducts(selectedArticleId);
    }
  }, [selectedArticleId]);

  const fetchArticleProducts = async (articleId: string) => {
    const accessToken = await getToken();
    console.log("id of article selected ", articleId);

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
        const products = data;
        console.log(products);
        setProduits(products);
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
    const now = new Date();
    const date = now.toISOString().substring(0, 10);
    const randomNumber = Math.floor(Math.random() * 100000) + 100000;
    const number = `${randomNumber}`;
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    const product = products.map(
      ({ produitId, physicalQuantity, observation }) => ({
        produitId,
        physicalQuantity,
        observation,
      })
    );
    console.log("this is the observations ", product);

    const articleId = selectedArticleId; 

    try {
      const response = await fetch(
        `http://localhost:4000/api/inventaire/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleId,
            number,
            products,
            date,
          }),
        }
      );

      // Handle successful response
    } catch (error) {
      console.error("Error creating bon de sortie:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-4xl text-center mb-8">Etat d'Inventaire</h1>
        <div className="text-lg mx-8 mt-4 mb-2">
          Séléctionner un chapitre et un article :
        </div>
        <div className="flex items-center mx-8 mb-4">
          <div className="flex-1 mr-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedChapterId || ""}
              onChange={(e) => {
                setSelectedChapterId(e.target.value);
                setSelectedArticleId(null); // Reset article selection when chapter changes
              }}
            >
              <option value="">Chapitre</option>
              {chapters.map((chapter) => (
                <option key={chapter.id} value={chapter.id?.toString()}>
                  {chapter.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 mr-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedArticleId || ""}
              onChange={(e) => setSelectedArticleId(e.target.value)}
              disabled={!selectedChapterId}
            >
              <option value="">Article</option>
              {articles.map((article) => (
                <option key={article.id} value={article.id?.toString()}>
                  {article.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Produits
          Produits={produits}
          observations={products}
          setObservations={setProducts}
        ></Produits>
        <div className="w-full flex justify-end">
          <button
            className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 m-8 rounded-lg"
            onClick={handleSubmit}
          >
            <div className="flex items-center space-x-2">
              <span>Enregistrer l'etat</span>
            </div>
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default EtatInventaire;
