"use client";

import React, { useState } from "react";
import { Article } from "@/types";

interface Props {
    articles: Article[];
  }
  
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default ChapterDetailsTable;
