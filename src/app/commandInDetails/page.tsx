"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RootLayout from "../rootLayout";
import { CommandeIn, ProductCommandeIn } from "@/types";
import CommandInDetailsTable from "@/components/tables/commandInDetailsTable";
import Converter from "@/dateConverter";
import CommandDetailsPDF from "@/components/pdf/CommandPDF";
import AddCommandButton from "@/components/buttons/addCommandButton";
import getToken from "@/utils/getToken";

const CommandInDetails: React.FC = () => {
  const [command, setCommand] = useState<CommandeIn>();
  const [products, setProducts] = useState<ProductCommandeIn[]>([]);
  const [validated, setValidated] = useState<boolean>(false); 
  var valid: boolean;
  const [updatedQuantities, setUpdatedQuantities] = useState<number[]>([]); 
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchCommandProduct();
  }, []);

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
        console.log("Response data:", data);
        setCommand(data.command);
        setProducts(data.products);
      } else {
        console.error("Failed to fetch command products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
    }
  };

  const validateCommand = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }
  
    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/validation/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            products: products.map((product, index) => ({
              id_produit:product.id_produit,
              accordedquantity:
                updatedQuantities[index] || product.accordedQuantity,
            })),
          }),
        }
      );

      if (response.ok) {
        
        console.log("Command validated successfully");
        setValidated(true);
      } else {
        console.error("Failed to validate command:", response.statusText);
      }
    } catch (error) {
      console.error("Error validating command:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
       
        <div className="text-xl mb-4">
          Commande numero : <span className="font-bold">{command?.number}</span>
        </div>
        <div className="text-xl mb-4">
          Consommateur :{" "}
          <span className="font-bold">{command?.id_consommateur}</span>
        </div>
        <div className="text-xl mb-4">
          Etat :{" "}
          <span className="font-bold">
            {command?.validation === 3 ? <p>Validee</p> : <p>En attente</p>}
          </span>
        </div>
        <div className="text-xl mb-4">
          Date :{" "}
          <span className="font-bold">
            <Converter date={command?.date} />
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
        </div>
        {(role === "structureresponsable" &&
          command &&
          command.validation === 0) ||
        (role === "magasinier" && command && command.validation === 2) ||
        (role === "director" && command && command.validation === 1)
          ? (valid = false)
          : (valid = true)}

       
        <CommandInDetailsTable
          valid={valid}
          products={products}
          updatedQuantities={updatedQuantities} 
          onQuantityChange={setUpdatedQuantities}
        />
      
        {!valid && (
          <div>
            <button
              className="bg-purple-950 text-white hover:bg-black font-medium mt-8 py-2 px-4 rounded-lg"
              onClick={validateCommand}
            >
              Valider
            </button>
          </div>
        )}
       
        {role === "magasinier" &&
          command &&
          command.validation === 3 &&
          valid && (
            <>
              {(() => {
                switch (command.typecommande) {
                  case "Commande Interne":
                    return (
                      <div className="m-8 rounded-lg w-1/3">
                        <AddCommandButton
                          label="Ajouter un bon de sortie"
                          path={`/newSortie?id=${command?.id}`}
                        />
                      </div>
                    );
                  case "Commande Decharges":
                    return (
                      <div className="m-8 rounded-lg w-1/3">
                        <AddCommandButton
                          label="Ajouter un bon de decharge"
                          path={`/newDecharge?id=${command?.id}`}
                        />
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </>
          )}
      </div>
    </RootLayout>
  );
};

export default CommandInDetails;