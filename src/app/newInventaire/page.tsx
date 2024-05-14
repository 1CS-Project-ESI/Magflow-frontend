"use client";

import React, { useEffect, useState } from "react";
import AddCommandButton from "@/components/buttons/addCommandButton";
import Produits from "@/components/validateProduct/inventaireValidation";
import RootLayout from "../rootLayout";
import getToken from "@/utils/getToken";
import { Inventaire, Product } from "@/types";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import { Underdog } from "next/font/google";
import UserID from "@/utils/getID";
import Converter from "@/dateConverter";

const EtatInventaire: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [observations, setObservations] = useState<
    {
      id: number;
      physicalQuantity: number;
      observation: string;
    }[]
  >([]);

  useEffect(() => {
    // Initialize the servedQuantities state with default values based on products
    const initialObservations = products.map(({ id }) => ({
      id,
      physicalQuantity: 0,
      observation: "",
    }));
    setObservations(initialObservations);
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/store/product/all"
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching products: ${data.message}`);
        }

        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();

    const now = new Date();
    const date = now.toISOString().substring(0, 10);
    const randomNumber = Math.floor(Math.random() * 100000) + 100000; // Generate a 6-digit number
    const number = `${randomNumber}`;
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    const observation = observations.map(
      ({ id, physicalQuantity, observation }) => ({
        id,
        physicalQuantity,
        observation,
      })
    );
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
            number,
            observations,
            date,
          }),
        }
      );

      //   if (response.ok) {
      //     // generating the pdf
      //     const bonSortieData = await response.json();
      //     const bonSortieId = bonSortieData.bonSortie.id;

      //     // Make a request to generate the PDF for the created bon de sortie
      //     const url = new URL(
      //       `http://localhost:4000/api/pdf/pdfbonsortie/${bonSortieId}`
      //     );
      //     const pdfResponse = await fetch(url.toString());

      //     if (pdfResponse.ok) {
      //       console.log("pdf gegenrated succ ");
      //     } else {
      //       console.error(
      //         "Failed to generate PDF for bon de sortie:",
      //         pdfResponse.statusText
      //       );
      //     }
      //     // Handle successful response
      //   } else {
      //     console.error("Error creating bon de sortie:", response.statusText);
      //   }
    } catch (error) {
      console.error("Error creating bon de sortie:", error);
    }
  };

  //   const handleSubmitDecharge = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     const accessToken = await getToken();
  //     const id_magasinier = await UserID();

  //     const now = new Date();
  //     const date = now.toISOString().substring(0, 10);
  //     // const observation = "testing";
  //     // const service = "testing";
  //     const url = new URL(window.location.href);
  //     const idString = url.searchParams.get("id");
  //     let id = null;

  //     if (idString !== null) {
  //       id = parseInt(idString, 10);
  //     }

  //     const observation = observations.map(({ id_produit, observation }) => ({
  //       id_produit,
  //       observation,
  //     }));
  //     console.log("this is the observations ", observation);

  //     try {
  //       const response = await fetch(
  //         `http://localhost:4000/api/bons/createBonDecharge/${id}`,
  //         {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             observations,
  //             date,
  //           }),
  //         }
  //       );

  //       if (response.ok) {
  //         // generating the pdf
  //         const bonSortieData = await response.json();
  //         const bonSortieId = bonSortieData.bonSortie.id;

  //         // Make a request to generate the PDF for the created bon de sortie
  //         const url = new URL(
  //           `http://localhost:4000/api/pdf/pdfbonsortie/${bonSortieId}`
  //         );
  //         const pdfResponse = await fetch(url.toString());

  //         if (pdfResponse.ok) {
  //           console.log("pdf gegenrated succ ");
  //         } else {
  //           console.error(
  //             "Failed to generate PDF for bon de sortie:",
  //             pdfResponse.statusText
  //           );
  //         }
  //         // Handle successful response
  //       } else {
  //         console.error("Error creating bon de sortie:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error creating bon de sortie:", error);
  //     }
  //   };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-4xl text-center mb-8">Etat d'Inventaire</h1>
        <Produits
          Produits={products}
          observations={observations}
          setObservations={setObservations}
        ></Produits>
        <div className="w-full flex justify-end">
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
              <span>Enregistrer l'etat</span>
            </div>
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default EtatInventaire;
