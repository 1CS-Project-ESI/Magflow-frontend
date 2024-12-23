"use client";

import React, { useEffect, useState } from "react";

import RootLayout from "../rootLayout";

import AddArticleButton from "@/components/buttons/addArticleButton";
import ArticlesTable from "@/components/tables/articlesTable";
import withAuth from "@/utils/withAuth";

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/store/article/all"
        );
        const data = await response.json();
        console.log(data);
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

  return (
    <RootLayout>
      <div className="text-4xl text-[#2C2D41] font-bold m-8">Articles</div>
      <div className="m-8 mt-8">
        <ArticlesTable articles={articles} />
      </div>
    </RootLayout>
  );
};

export default withAuth(ArticlesPage);
