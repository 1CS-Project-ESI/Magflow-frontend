"use client";

import React, { useEffect, useState } from "react";
import AddCommandButton from "@/components/buttons/addCommandButton";
import CommandesTable from "@/components/tables/commandesTable";
import RootLayout from "../rootLayout";
import getRole from "../../utils/getRole";
import withAuth from "@/utils/withAuth";

const CommandsPage: React.FC = () => {
  const [commands, setCommands] = useState([]);
  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    const fetchCommands = async () => {
      const role = await getRole();
      console.log(role);
      try {
        const response = await fetch(
          "http://localhost:4000/api/bons/allcommands"
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching articles: ${data.message}`);
        }

        setCommands(data.commands);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchCommands();
  }, []);
  return (
    <RootLayout>
      <div className="flex items-center  text-[#2C2D41] justify-between">
        <div className="text-4xl text-[#2C2D41] font-bold m-8">
          Bons de Commandes Externes
        </div>
        {role === "agentserviceachat" ? (
          <div className="flex m-8 text-[#2C2D41] justify-end">
            <AddCommandButton
              label="Ajouter une commande externe"
              path="/newCommand"
            />
          </div>
        ) : null}
      </div>
      <div className="m-8 mt-8">
        <CommandesTable commandes={commands} />
      </div>
    </RootLayout>
  );
};

export default withAuth(CommandsPage);
