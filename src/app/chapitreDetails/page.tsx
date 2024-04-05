"use client";
import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";
import { Chapter } from "@/types";
import { Article } from "@/types";
import AddArticleButton from "@/components/buttons/addArticleButton";
import ChapterDetailsTable from "@/components/tables/chapterDetailsTable";
import getToken from "@/utils/getToken";

interface Props {
  chapters: Chapter[];
  articles: Article[];
}

// link to getArtcile chapitre to be mapped in chapter details Tables 

const ChapterDetails: React.FC = () => {
  const [chapter, setChapter] = useState<Chapter>({
    name: "",
    description: "",
  });

  // link to getArtcile chapitre to be mapped in chapter details Tables 

  const [articlos, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    fetchChappArtciles();
  }, []);

  const fetchChappArtciles = async () => {
  
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
      const response = await fetch(`http://localhost:4000/api/store/chapter/articles/${id}`,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
       
      });
      if (response.ok) {
        const data = await response.json();
        const articlos = data;
        console.log(articlos);
      
        setArticles(articlos);
  
      } else {
        console.error("Failed to fetch chapp artciles :", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching arctiles:", error);
    }
  };


  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Code du chapitre : <span className="font-bold"> {chapter.name}</span>
        </div>
        <div className="text-xl mb-4">
          Description :<span className="font-bold">{chapter.description}</span>
        </div>
        <div className="flex justify-between mb-4">
        <div className="text-xl">Articles :</div>
        <AddArticleButton showPopup={true}/>
        </div>
        <ChapterDetailsTable articles={articlos} />
      </div>
    </AgentLayout>
  );
};

export default ChapterDetails;
