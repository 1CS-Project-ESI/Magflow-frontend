"use client";
import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RootLayout from "../rootLayout";
import { Inventaire, Product, Reception } from "@/types";
import InvDetailsTable from "@/components/tables/invDetailsTable";
import Receptiontable from "@/components/tables/receptionsTable";
import Converter from "@/dateConverter";
import CommandDetailsPDF from "@/components/pdf/CommandPDF";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import AddCommandButton from "@/components/buttons/addCommandButton";
import getToken from "@/utils/getToken";

// link product artcile

const CommandDetails: React.FC = () => {
  const [inventaire, setInventaire] = useState<Inventaire>();
const [products, setProducts] = useState<Product[]>([]);
const [observations, setObservations] = useState<
  {
    id_produit: number;
    physicalQuantity: number;
    observation: string;
    id_inventaire: number;
    Produit: {
      name: string;
      caracteristics: string | null;
      quantity: number;
      seuil: number;
    }
  }[]
>([]);
const role = localStorage.getItem("role");
console.log(role);

useEffect(() => {
  fetchInventaireDetails();
}, []);

const fetchInventaireDetails = async () => {
  const accessToken = await getToken();
  const url = new URL(window.location.href);
  const idString = url.searchParams.get("id");
  let id = null;

  if (idString !== null) {
    id = parseInt(idString, 10);
  }

  try {
    const response = await fetch(
      `http://localhost:4000/api/inventaire/details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Response data:", data); // Log the response data
      // setInventaire(data.inventaire);
      // setProducts(data.produits);
      // Map the observations to match the expected structure
      const mappedObservations = data.etatInventaires.map((observation: any) => ({
        id_produit: observation.id_produit,
        physicalQuantity: observation.physicalquantity,
        observation: observation.observation,
        Produit: {
          name: observation.Produit.name,
          caracteristics: observation.Produit.caracteristics,
          quantity: observation.Produit.quantity,
          seuil: observation.Produit.seuil,
        },
      }));
      setObservations(mappedObservations);
      setInventaire(data.inventaire);
      console.log("haha data:", mappedObservations);
      console.log("haha data:", inventaire);
    } else {
      console.error("Failed to fetch command products:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching command products:", error);
  }
};

  const validateEtat = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/inventaire/validate/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("state validated successfully");
      } else {
        console.error("Failed to validate state:", response.statusText);
      }
    } catch (error) {
      console.error("Error validating state:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Numero : <span className="font-bold">{inventaire?.number}</span>
        </div>
        <div className="text-xl mb-4">
          Date :{" "}
          <span className="font-bold">
            {" "}
            <Converter date={inventaire?.date} />
          </span>
        </div>
        <>
          {(() => {
            switch (inventaire?.validation) {
              case 0:
                return (
                  <div className="text-xl mb-4">
                    Etat : <span className="font-bold">Non Validée</span>
                  </div>
                );
              case 1:
                return (
                  <div className="text-xl mb-4">
                    Etat : <span className="font-bold">Validée</span>
                  </div>
                );
              default:
                return null;
            }
          })()}
        </>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
        </div>
        <InvDetailsTable observations={observations} />
        {role === "director" && inventaire?.validation === 0 && (
          <div>
            <button
              className="bg-purple-950 text-white hover:bg-black font-medium mt-8 py-2 px-4 rounded-lg"
              onClick={validateEtat}
            >
              Valider
            </button>
          </div>
        )}
      </div>
    </RootLayout>
  );
};

export default CommandDetails;
