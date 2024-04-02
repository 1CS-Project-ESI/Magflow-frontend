"use client";

import React, { useEffect, useState } from "react";

import AgentLayout from "../agentLayout";

import AddChapterButton from "@/components/buttons/addChapterButton";
import ChaptersTable from "@/components/tables/chapterTable";

const ChaptersPage: React.FC = () => {

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/store/chapter/all'); 
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

  return (
    <AgentLayout>
      <div className="flex m-8 justify-end">
        <AddChapterButton showPopup={true} />
      </div>
      <div className="m-8 mt-8">
        <ChaptersTable chapters={chapters} />
      </div>
    </AgentLayout>
  );
};

export default ChaptersPage;
