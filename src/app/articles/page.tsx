"use client";

import React, { useEffect, useState } from "react";

import AgentLayout from "../agentLayout";

import AddArticleButton from "@/components/buttons/addArticleButton";
import ArticlesTable from "@/components/tables/articlesTable";

const ArticlesPage: React.FC = () => {

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/store/article/all'); 
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
    <AgentLayout>
      <div className="flex m-8 justify-end">
        <AddArticleButton showPopup={true} />
      </div>
      <div className="m-8 mt-8">
        <ArticlesTable articles={articles} />
      </div>
    </AgentLayout>
  );
};

export default ArticlesPage;
