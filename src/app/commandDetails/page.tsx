"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RootLayout from "../rootLayout";
import { Commande, ProductCommande, Reception } from "@/types";
import { Product } from "@/types";
import CommandDetailsTable from "@/components/tables/commandDetailsTable";
import Receptiontable from "@/components/tables/receptionsTable";
import Converter from "@/dateConverter";
import CommandDetailsPDF from "@/components/pdf/CommandPDF";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import AddCommandButton from "@/components/buttons/addCommandButton";
import getToken from "@/utils/getToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withAuth from "@/utils/withAuth";

interface Props {
  commands: Commande[];
  products: ProductCommande[];
}

const CommandDetails: React.FC = () => {
  const [command, setCommand] = useState<Commande>();
  const [products, setProducts] = useState<ProductCommande[]>([]);
  const [AllBonRecepttions, setReceptions] = useState<Reception[]>([]);
  const role = localStorage.getItem("role");
  console.log(role);

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
        `http://localhost:4000/api/bons/command/details/${id}`,
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
        setReceptions(data.AllBonRecepttions);
      } else {
        console.error("Failed to fetch command products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
    }
  };

  const handleSavePDF = async () => {
    try {
      const url = new URL(window.location.href);
      const idString = url.searchParams.get("id");
      let id = null;

      if (idString !== null) {
        id = parseInt(idString, 10);
      }
      const pdfUrl = new URL(
        `http://localhost:4000/api/pdf/pdfboncommande/${id}`
      );
      const pdfResponse = await fetch(pdfUrl.toString());

      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `bon-sortie-${id}.pdf`;
        link.click();
        URL.revokeObjectURL(link.href);
        toast.success('PDF generated and downloaded successfully!');
        console.log("PDF generated successfully and downloaded.");
      } else {
        console.error("Failed to generate PDF. Error:", pdfResponse.statusText);
        toast.error('Failed to generate PDF.');
      }
    } catch (error) {
      console.error("Error fetching bonSortie data or generating PDF:", error);
      toast.error('Error generating PDF.');
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <h1 className="text-4xl font-bold flex justify-center m-8">
          Commande Externe
        </h1>
        <div className="text-xl mb-4">
          Commande numero : <span className="font-bold">{command?.number}</span>
        </div>
        <div className="text-xl mb-4">
          Date :{" "}
          <span className="font-bold">
            <Converter date={command?.orderdate} />
          </span>
        </div>
        <div className="text-xl mb-4">
          Fournisseur :{" "}
          <span className="font-bold">{command?.fournisseur_name}</span>
        </div>
        <div className="text-xl mb-4">
          Etat : <span className="font-bold">{command?.status}</span>
        </div>
        <div className="text-xl mb-4">
          Specifications :{" "}
          <span className="font-bold">{command?.orderspecifications}</span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
        </div>
        <CommandDetailsTable products={products} />
        <div className="flex justify-end my-4 mx-10">
          <div className="grid grid-cols-1">
            <div className="text-xl my-4 flex justify-start">
              Total HT : <span className="font-bold"> {command?.total_ht}</span>
            </div>
            <div className="text-xl mb-4 flex justify-start">
              {command && (
                <>
                  TVA <span className="font-bold"> {command.tva}%</span> :{" "}
                  <span className="font-bold">
                    {((command?.tva / 100) * (command?.total_ht || 0)).toFixed(
                      2
                    )}
                  </span>
                </>
              )}
            </div>
            <div className="text-xl mb-4 flex justify-start">
              Total TTC :{" "}
              <span className="font-bold">{command?.total_ttc}</span>
            </div>
            <button
              className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 m-8 rounded-lg"
              onClick={handleSavePDF}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={save.src}
                  width="18"
                  height="18"
                  style={{ filter: "invert(100%)" }}
                />{" "}
                <span>Enregistrer</span>
              </div>
            </button>
          </div>
        </div>
        {role === "magasinier" ? (
          <>
            <div className="flex justify-between">
              <div className="flex justify-between my-4">
                <div className="text-xl">Bons de receptions :</div>
              </div>
              <div className="my-4 rounded-lg flex justify-end">
                <AddCommandButton
                  label="Ajouter un bon de reception"
                  path={`/newReception?id=${command?.id}`}
                />
              </div>
            </div>
            <Receptiontable BonReçus={AllBonRecepttions} />
          </>
        ) : null}
      </div>
      <ToastContainer /> {/* Added line for ToastContainer */}
    </RootLayout>
  );
};

export default withAuth(CommandDetails);
