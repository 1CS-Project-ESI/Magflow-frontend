"use client";

import React, { useEffect, useState } from "react";
import CommandesTable from "@/components/tables/commandInTable";
import RootLayout from "../rootLayout";
import AddCommandButton from "@/components/buttons/addCommandButton";

const CommandsPage: React.FC = () => {
  const [commands, setCommands] = useState([]);
  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const role = localStorage.getItem("role");
        if (role !== null) {
          const url = new URL(
            "http://localhost:4000/api/bons/getAllBonCommandInterneFFordirectorMagazinier"
          );
          url.searchParams.append("role", role);

          const response = await fetch(url);

          const data = await response.json();
          console.log(data);

          if (!response.ok) {
            throw new Error(
              `Error fetching commandes internes : ${data.message}`
            );
          }

          setCommands(data);
        } else {
          console.error("Role is null");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchCommands();
  }, []);

  return (
    <RootLayout>
      <div className="flex items-center  text-[#2C2D41] justify-between">
        <div className="text-4xl text-[#2C2D41] font-bold m-10">
          Bons de Commandes Internes
        </div>
        <div className="flex m-8 text-[#2C2D41] justify-end">
          <AddCommandButton label="Ajouter une commande Interne" path="/newCommandIn" />
        </div>
      </div>
      <div className="m-8 mt-8">
        <CommandesTable commandes={commands} />
      </div>
    </RootLayout>
  );
};

export default CommandsPage;
