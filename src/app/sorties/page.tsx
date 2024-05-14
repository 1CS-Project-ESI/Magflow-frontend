"use client";

import React, { useEffect, useState } from "react";
import BonTable from "@/components/tables/sortiesTable";;
import RootLayout from "../rootLayout";
import { Sortie } from "@/types";

const CommandsPage: React.FC = () => {
  const [sorties, setCommands] = useState<Sortie[]>([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/bons/allbonsortie'); 
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching commandes internes : ${data.message}`);
        }

        setCommands(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        
      }
    };

    fetchCommands();
  }, []);

  return (
    <RootLayout>
    <div className="flex items-center  text-[#2C2D41] justify-between">
      <div className="text-4xl text-[#2C2D41] font-bold m-8">Bons de Sorties</div>
    </div>
    <div className="m-8 mt-8">
      <BonTable bons={sorties} />
    </div>
  </RootLayout>
  );
};

export default CommandsPage;
