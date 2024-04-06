"use client";

import React, { useEffect, useState } from "react";
import Receptiontable from "@/components/tables/receptionsTable";
import AgentLayout from "../agentLayout";

const Receptionspage: React.FC = () => {
    const [BonReçus, setBons] = useState([]);

    return (
        <AgentLayout>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold ml-10 mb-8 mt-4">Les Bons de reception</div>
          </div>
          <div className="m-8 mt-8">
            <Receptiontable BonReçus={BonReçus} />
          </div>
        </AgentLayout>
      );
    };
    
    export default Receptionspage;
    