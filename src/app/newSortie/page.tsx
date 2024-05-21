"use client";

import React, { useEffect, useState } from "react";
import AddCommandButton from "@/components/buttons/addCommandButton";
import ProduitServie from "@/components/validateProduct/productModify";
import RootLayout from "../rootLayout";
import getToken from "@/utils/getToken";
import { CommandeIn, ProductCommandeIn } from "@/types";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import { Underdog } from "next/font/google";
import UserID from "@/utils/getID";
import Converter from "@/dateConverter";

const BonDeSortie: React.FC = () => {
  const [command, setCommand] = useState<CommandeIn>();
  const [products, setProducts] = useState<ProductCommandeIn[]>([]);
  const [observations, setObservations] = useState<
    { id_produit: number; observation: string }[]
  >([]);

  useEffect(() => {
    fetchCommandProduct();
  }, []);

  useEffect(() => {
    // Initialize the servedQuantities state with default values based on products
    const initialObservations = products.map(({ id_produit }) => ({
      id_produit,
      observation: "",
    }));
    setObservations(initialObservations);
  }, [products]);

  const fetchCommandProduct = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/commandinterne/details/${id}`,
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
        setCommand(data.command);
        setProducts(data.products);

        // Assuming the response structure matches { products: [...] }
      } else {
        console.error("Failed to fetch command products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    const id_magasinier = await UserID();

    const now = new Date();
    const date = now.toISOString().substring(0, 10);
    // const observation = "testing";
    // const service = "testing";
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    const observation = observations.map(({ id_produit, observation }) => ({
      id_produit,
      observation,
    }));
    console.log("this is the observations ", observation);

    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/create-bon-sortie/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observations,
            date,
          }),
        }
      );

      if (response.ok) {
        // generating the pdf
        const bonSortieData = await response.json();
        const bonSortieId = bonSortieData.bonSortie.id;

        // Make a request to generate the PDF for the created bon de sortie
        const url = new URL(
          `http://localhost:4000/api/pdf/pdfbonsortie/${bonSortieId}`
        );
        const pdfResponse = await fetch(url.toString());

        if (pdfResponse.ok) {
          console.log("pdf gegenrated succ ");
        } else {
          console.error(
            "Failed to generate PDF for bon de sortie:",
            pdfResponse.statusText
          );
        }
        // Handle successful response
      } else {
        console.error("Error creating bon de sortie:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating bon de sortie:", error);
    }
  };

  const handleSubmitDecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    const id_magasinier = await UserID();

    const now = new Date();
    const date = now.toISOString().substring(0, 10);
    // const observation = "testing";
    // const service = "testing";
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    const observation = observations.map(({ id_produit, observation }) => ({
      id_produit,
      observation,
    }));
    console.log("this is the observations ", observation);

    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/createBonDecharge/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            observations,
            date,
          }),
        }
      );

      if (response.ok) {
        // generating the pdf
        const bonSortieData = await response.json();
        const bonSortieId = bonSortieData.bonSortie.id;

        // Make a request to generate the PDF for the created bon de sortie
        const url = new URL(
          `http://localhost:4000/api/pdf/pdfbonsortie/${bonSortieId}`
        );
        const pdfResponse = await fetch(url.toString());

        if (pdfResponse.ok) {
          console.log("pdf gegenrated succ ");
        } else {
          console.error(
            "Failed to generate PDF for bon de sortie:",
            pdfResponse.statusText
          );
        }
        // Handle successful response
      } else {
        console.error("Error creating bon de sortie:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating bon de sortie:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <>
          {(() => {
            switch (command?.typecommande) {
              case "Commande Interne":
                return <h1 className="text-3xl mb-8">Nouvelle Sortie</h1>;
              case "Commande Decharges":
                return <h1 className="text-3xl mb-8">Nouvelle Decharge</h1>;
              default:
                return null;
            }
          })()}
        </>
        <div className="text-xl mb-4">
          Commande Interne numero :{" "}
          <span className="font-bold">{command?.number}</span>
        </div>
        <div className="text-xl mb-4">
          Consommateur :{" "}
          <span className="font-bold">{command?.id_consommateur}</span>
        </div>
        <div className="text-xl mb-4">
          Date du commande interne :{" "}
          <span className="font-bold">
            <Converter date={command?.date} />
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
        </div>
        <ProduitServie
          ProduitsBCI={products}
          observations={observations}
          setObservations={setObservations}
        ></ProduitServie>
        <div className="w-full flex justify-end">
          <>
            {(() => {
              switch (command?.typecommande) {
                case "Commande Interne":
                  return (
                    <button
                      className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 m-8 rounded-lg"
                      onClick={handleSubmit}
                    >
                      <div className="flex items-center space-x-2">
                        {/* <img
                          src={save.src}
                          width="18"
                          height="18"
                          style={{ filter: "invert(100%)" }}
                          alt="Save"
                        />{" "} */}
                        <span>Enregistrer bon de sortie</span>
                      </div>
                    </button>
                  );
                case "Commande Decharges":
                  return (
                    <button
                      className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 m-8 rounded-lg"
                      onClick={handleSubmitDecharge}
                    >
                      <div className="flex items-center space-x-2">
                        {/* <img
                          src={save.src}
                          width="18"
                          height="18"
                          style={{ filter: "invert(100%)" }}
                          alt="Save"
                        />{" "} */}
                        <span>Enregistrer bon de decharge</span>
                      </div>
                    </button>
                  );
                default:
                  return null;
              }
            })()}
          </>
        </div>
      </div>
    </RootLayout>
  );
};

export default BonDeSortie;
