"use client";
import React, { useState, useEffect } from "react";
import AgentLayout from "../agentLayout";

import ReceptionDetailsTable from "@/components/tables/receptionDetailsTable";
import { Reception } from "@/types";
import { Product } from "@/types";

const ReceptionDetails: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [reception, setReception] = useState<Reception>({
    id: 0,
    id_magasinier: 0,
    number: 0,
    deleverydate: new Date(),
  });
  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md flex-col">
        <p className="text-[#2C2D41] my-3">La date : </p>
        <div className="flex justify-between text-[#2C2D41] my-3">
          <p>Numero du bon de commande : 00001</p>
          <p>Numero du bon de reception : {reception.id}</p>
          <p>Fournisseur : pc-stor</p>
        </div>
        <ReceptionDetailsTable products={products} />

      </div>
    </AgentLayout>
  );
};

export default ReceptionDetails;
