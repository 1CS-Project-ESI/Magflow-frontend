"use client";

import React, { useEffect, useState } from "react";

import RootLayout from "../rootLayout";

import AddCommandButton from "@/components/buttons/addCommandButton";
import InventairesTable from "@/components/tables/inventaireTable";

const InventairePage: React.FC = () => {
  const [inventaires, setInventaires] = useState([]);
  const role = localStorage.getItem("role");
  console.log(role);

  useEffect(() => {
    const fetchInventaires = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/store/product/all"
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching products: ${data.message}`);
        }

        setInventaires(data.inventaires);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchInventaires();
  }, []);

  return (
    <RootLayout>
      <div className="flex items-center  text-[#2C2D41] justify-between">
        <div className="text-4xl text-[#2C2D41] font-bold m-8">Etat d'Inventaire</div>
        {role === "magasinier" ? (
          <div className="flex m-8 justify-end">
            <AddCommandButton
              label="Ajouter un état d'inventaire"
              path="/newInventaire"
            />
          </div>
        ) : null}
      </div>
      <div className="m-8 mt-8">
        <InventairesTable inventaires={inventaires} />
      </div>
    </RootLayout>
  );
};

export default InventairePage;
