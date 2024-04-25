"use client";

import React, { useEffect, useState } from "react";
import Receptiontable from "@/components/tables/receptionsTable";
import RootLayout from "../rootLayout";

import AddCommandButton from "@/components/buttons/addCommandButton";


const Receptionspage: React.FC = () => {
  const [receptions, setReceptions] = useState([]);

  useEffect(() => {
    const fetchReceptions = async () => {
      try {

        const response = await fetch(
          "http://localhost:4000/api/bons/allreceptions"
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${data.message}`);
        }

        setReceptions(data.receptions);
      } catch (error) {
        console.error("Error fetching articles:", error);

      }
    };

    fetchReceptions();
  }, []);


  return (
    <RootLayout> 
      <div className="flex items-center justify-between mr-8">
        <div className="text-3xl font-bold text-[#2C2D41] ml-10 mb-8 mt-4">
          Les Bons de reception
        </div>
        <AddCommandButton path={"/newReception"} />
      </div>
      <div className="m-8 mt-8">
        <Receptiontable BonReçus={receptions} />
      </div>
    </RootLayout>
  );
};

export default Receptionspage;
