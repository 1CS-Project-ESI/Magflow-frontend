"use client";
import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";
import { Article } from "@/types";
import { Product } from "@/types";
import ArticleDetailsTable from "@/components/tables/articleDetailsTable";

interface Props {
  articles: Article[];
  products: Product[];
}

const ArticleDetails: React.FC = () => {
  const [article, Article] = useState<Article>({
    name: "art1",
    description: " simple description",
    tva: 0,
    chapter_id: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Nom d'Article <span className="font-bold"> {article.name}</span>
        </div>
        <div className="text-xl mb-4">
          Description :<span className="font-bold">{article.description}</span>
        </div>
        <div className="text-xl mb-4">Articles :</div>
        <ArticleDetailsTable products={products} />
      </div>
    </AgentLayout>
  );
};

export default ArticleDetails;
