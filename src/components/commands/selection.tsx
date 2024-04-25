"use client";

import React, { useState } from "react";
import { Chapter, Product, Article, Fournisseur } from "@/types";
import ajt from "../../../public/assets/icons/Add.svg";
import dlt from "../../../public/assets/icons/delete.svg";

interface OptionSelectionProps {
  chapters: Chapter[];
  articles: Article[];
  products: Product[];
  selectedOptions: {
    chapter: Chapter | null;
    article: Article | null;
    product: Product | null;
    price: number;
    quantity: number;
  }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<
      {
        chapter: Chapter | null;
        article: Article | null;
        product: Product | null;
        price: number;
        quantity: number;
      }[]
    >
  >;
  onSelectChapter: (chapter: Chapter | null) => void;
  setSelectedChapterId: React.Dispatch<React.SetStateAction<string | null>>;
  onSelectArticle: (article: Article | null) => void;
  setSelectedArticleId: React.Dispatch<React.SetStateAction<string | null>>;
}

const OptionSelection: React.FC<OptionSelectionProps> = ({
  chapters,
  articles,
  products,
  selectedOptions,
  setSelectedOptions,
  onSelectChapter,
  onSelectArticle,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [selectedArticleId, setSelectedArticleId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const handleSelectChapter = (chapter: Chapter | null) => {
    setSelectedOptions([]); // Reset selected options when a new chapter is selected
    onSelectChapter(chapter); // This calls the prop function to update the selected chapter in the parent component
  };

  const handleSelectArticle = (article: Article | null) => {
    setSelectedOptions([]); // Reset selected options when a new article is selected
    onSelectArticle(article); // This calls the prop function to update the selected article in the parent component
  };

  const handleAddOption = () => {
    if (selectedChapterId && selectedArticleId && selectedProductId) {
      const chapter = chapters.find(
        (chapter) => chapter.id?.toString() === selectedChapterId
      );
      const article = articles.find(
        (article) => article.id?.toString() === selectedArticleId
      );
      const product = products.find(
        (product) => product.id?.toString() === selectedProductId
      );
      if (chapter && article && product) {
        const isProductSelected = selectedOptions.some(
          (option) => option.product?.id === product.id
        );
        if (!isProductSelected) {
          setSelectedOptions((prevOptions) => [
            ...prevOptions,
            { chapter, article, product, price, quantity },
          ]);
        } else {
          console.log("Product already selected");
        }
        setSelectedProductId("");
      }
    }
  };

  const handleDeleteOption = (index: number) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions.splice(index, 1);
      return newOptions;
    });
  };

  return (
    <div className="bg-white border border-gray-300 p-8 m-8 rounded-md">
      <div className=" grid grid-cols-1">
        <h1 className="text-2xl mx-8">Ajouter des produits :</h1>
        <div className="text-lg mx-8 mt-4 mb-2">
          Séléctionner un chapitre et un article :
        </div>
        <div className="flex items-center mx-8 mb-4">
          <div className="flex-1 mr-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full"
              value={selectedChapterId || ""}
              onChange={(e) => {
                const selectedChapter = chapters.find(
                  (chapter) => chapter.id?.toString() === e.target.value
                );
                handleSelectChapter(selectedChapter || null);
                setSelectedChapterId(e.target.value);
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
              onChange={(e) => {
                const selectedArticle = articles.find(
                  (article) => article.id?.toString() === e.target.value
                );
                handleSelectArticle(selectedArticle || null);
                setSelectedArticleId(e.target.value);
              }}
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
        <div className="flex items-center mx-8 mb-8">
          <div className="text-lg">Séléctionner des produits :</div>
          <div className="w-full flex-1 flex items-center justify-center">
            <select
              className="border border-gray-300 rounded-md p-2 w-2/3"
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Produit</option>
              {products.map((product) => (
                <option key={product.id} value={product.id?.toString()}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex-1 flex items-center justify-center">
            <button
              className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 rounded-lg"
              onClick={handleAddOption}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={ajt.src}
                  width="18"
                  height="18"
                  style={{ filter: "invert(100%)" }}
                />{" "}
                <span>Ajouter</span>
              </div>
            </button>
          </div>
        </div>
        <h1 className="text-2xl mx-8">Produits :</h1>
        <div className="overflow-x-auto border border-gray-300 rounded-xl mx-8 mb-8 mt-4">
          <table className="table-auto w-full overflow-hidden">
            <thead>
              <tr className="bg-white text-zinc-400">
                <th className="px-4 py-2 font-light hidden md:table-cell">
                  Produit
                </th>
                <th className="px-4 py-2 font-light hidden md:table-cell">
                  Prix
                </th>
                <th className="px-4 py-2 font-light hidden md:table-cell">
                  Quantité
                </th>
                <th className="px-4 py-2 font-light hidden md:table-cell"></th>
              </tr>
            </thead>
            <tbody>
              {selectedOptions.map((option, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="border-t bg-white text-center px-4 py-4">
                    {option.product?.name}
                  </td>
                  <td className="border-t bg-white text-center px-4 py-4">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={option.price}
                      onChange={(e) => {
                        const newPrice = parseFloat(e.target.value);
                        if (!isNaN(newPrice) && newPrice >= 0) {
                          const updatedOptions = [...selectedOptions];
                          updatedOptions[index].price = newPrice;
                          setSelectedOptions(updatedOptions);
                        }
                      }}
                    />
                  </td>
                  <td className="border-t bg-white text-center px-4 py-4">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={option.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (!isNaN(newQuantity) && newQuantity >= 0) {
                          const updatedOptions = [...selectedOptions];
                          updatedOptions[index].quantity = newQuantity;
                          setSelectedOptions(updatedOptions);
                        }
                      }}
                    />
                  </td>
                  <td className="border-t bg-white text-center px-4 py-4">
                    <button
                      className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                      onClick={() => handleDeleteOption(index)}
                    >
                      <div className="flex items-center space-x-2">
                        <img src={dlt.src} width="18" height="15" />
                        <span>Supprimer</span>
                      </div>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h1 className="text-2xl mx-8">Fournisseur :</h1>
        <div className="flex items-center mx-8">
          <div className="text-lg">Séléctionner un fournisseur :</div>
          <div className="w-full flex-1 flex items-center justify-center">
            <select
              className="border border-gray-300 rounded-md p-2 w-1/3"
              // value={selectedFournisseurId}
              // onChange={(e) => setSelectedFournisseurId(e.target.value)}
            >
              {/* <option value="">Sélectionner Fournisseur</option>
          {fournisseurs.map((fournisseur) => (
            <option key={fournisseur.id} value={fournisseur.id.toString()}>
              {fournisseur.name}
            </option>
          ))} */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionSelection;
