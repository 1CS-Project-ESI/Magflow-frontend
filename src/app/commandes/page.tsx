"use client";

import React, { useEffect, useState } from "react";
import AddCommandeButton from "@/components/buttons/addCommandeButton";
import CommandesTable from "@/components/tables/commandesTable";
import AgentLayout from "../agentLayout";


const CommandesPage: React.FC = () => {

  const [commandes, setArticles] = useState([]);
return (
  <AgentLayout>
   <div className="flex items-center justify-between">
  <div className="text-4xl font-bold ml-10">
    BCE
  </div>
  <div className="flex m-8 justify-end">
    <AddCommandeButton />
  </div>
</div>
      <div className="m-8 mt-8">
        <CommandesTable commandes={commandes} />
      </div>
  </AgentLayout>

)
};

export default CommandesPage;