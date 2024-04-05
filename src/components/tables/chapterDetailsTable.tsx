"use client";

import React, { useState } from "react";
import { Article } from "@/types";
import UpdateChapterButton from "../buttons/updateChapterButton";
import deleteIcon from "../../../public/assets/icons/delete.svg";
import getToken from "@/utils/getToken";


interface artcile {
  id: number;
  name: string;
  description: string;
  id_agentserviceachat: number;
}

interface Props {
    articles: Article[];
  }

 // delete artcile if empty
 const handleDeleteArctile = async (id?: number) => {
 
  const accessToken = await getToken();

  try {
    const response = await fetch(
      `http://localhost:4000/api/store/article/delete/${id}`,
      {
        method: "DELETE", // Set request method to DELETE
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error deleting structure: ${await response.text()}`);
    }

    console.log("chapter deleted successfully!");
  
  } catch (error) {
    console.error("Error during deletion:", error);

  } finally {
   
  }
};


  
  const ChapterDetailsTable: React.FC<Props> = ({ articles }) => {
    return (     //Table des articles de ce chapitre
        <div className="overflow-x-auto border border-gray-300 rounded-xl">
          <table className="table-auto w-full overflow-hidden">
            <thead>
              <tr className="bg-white text-zinc-400">
                <th className="px-4 py-4 font-light">Nom de L article</th>
                <th className="px-4 py-2 font-light hidden md:table-cell">Description</th>
                <th className="px-4 py-2 font-light hidden md:table-cell">Tva</th>
                <th className="px-4 py-2 font-light hidden md:table-cell">chapter_id</th>
              </tr> 
            </thead>
            <tbody>
              {articles.map((article, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="border-t bg-white text-center px-4 py-4">
                    {article.name} 
                  </td>
                  <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                    {article.description}
                  </td>
                  <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                    {article.tva}
                  </td>
                  <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                    {article.chapter_id}
                  </td>
                  <td>
                  <button
                className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                onClick={async () => {
                 await handleDeleteArctile(article.id);
                }}
              >
              <div className="flex items-center space-x-2">
                <img src={deleteIcon.src} alt="delete" width="18" height="15" />
                <span>Supprimer</span>
              </div>
            </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default ChapterDetailsTable;
