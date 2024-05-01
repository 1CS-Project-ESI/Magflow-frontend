"use client";

import React, { useEffect, useState } from "react";
import BonTable from "@/components/tables/bonSortiTable";;
import RootLayout from "../rootLayout";

const CommandsPage: React.FC = () => {
  const [bons, setCommands] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/bons/allcommandsinterne'); 
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
      <div className="text-4xl text-[#2C2D41] font-bold ml-10">Bons de Sorti</div>
    </div>
    <div className="m-8 mt-8">
      <BonTable Bons={bons} />
    </div>
  </RootLayout>
  );
};

export default CommandsPage;
