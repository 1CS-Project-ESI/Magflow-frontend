"use client"
import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";
import { Chapter } from "@/types";
import { Article } from "@/types";
import ChapterDetailsTable from "@/components/tables/chapterDetailsTable";

interface Props {
    chapters: Chapter[];
    articles: Article[];
  }

    const ChapterDetails: React.FC = () => {
      const [chapter, setChapter] = useState<Chapter>({
          name: "chap1",
          description: " simple description",
          id_agentserviceachat: 0,
        });
        const [articles, setArticles] = useState<Article[]>([]);


    return (
        <AgentLayout>
          <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
            <div className="text-xl mb-4">
              Code du chapitre :  <span className="font-bold"> {chapter.name}
                </span>
            </div>
            <div className="text-xl mb-4">
                Description : 
                <span className="font-bold">
                {chapter.description}
                
                </span>
              </div>
            <div className="text-xl mb-4">Articles :</div>
            <ChapterDetailsTable articles={articles} />
          </div>
          </AgentLayout>
      );

};

export default ChapterDetails;
