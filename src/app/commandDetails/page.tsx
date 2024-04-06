"use client";
import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AgentLayout from "../agentLayout";
import { Commande } from "@/types";
import { Product } from "@/types";
import CommandDetailsTable from "@/components/tables/commandDetailsTable";
import Converter from "@/dateConverter";
import CommandDetailsPDF from "@/components/pdf/CommandPDF";
import getToken from "@/utils/getToken";
interface Props {
  commands: Commande[];
  products: Product[];
}

// link product artcile

const CommandDetails: React.FC = () => {
  const [command, setCommand] = useState<Commande>();
  const [products, setProducts] = useState<Product[]>([]);

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
        console.log("Response data:", data); // Log the response data
        setCommand(data.command);
        setProducts(data.products); // Assuming the response structure matches { products: [...] }
      } else {
        console.error("Failed to fetch command products:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching command products:", error);
    }
  };

  return (
    <AgentLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Commande numero : <span className="font-bold">{command?.number}</span>
        </div>
        <div className="text-xl mb-4">
          Etat : <span className="font-bold">{command?.status}</span>
        </div>
        <div className="text-xl mb-4">
          Date :{" "}
          <span className="font-bold">
            <Converter date={command?.orderdate} />
          </span>
        </div>
        <div className="text-xl mb-4">
          Date de livraison :{" "}
          <span className="font-bold">
            <Converter date={command?.deliverydate} />
          </span>
        </div>
        <div className="text-xl mb-4">
          Specifications :{" "}
          <span className="font-bold">{command?.orderspecifications}</span>
        </div>
        <div className="text-xl mb-4">
          Total TTC : <span className="font-bold">{command?.total_ttc}</span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
        </div>
        <CommandDetailsTable products={products} />
        {/* <CommandDetailsPDF command={command} products={products} /> */}
        {/* PDF download link */}
        <div className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg">
          <PDFDownloadLink
            document={
              <CommandDetailsPDF command={command} products={products} />
            }
            fileName="table.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download PDF"
            }
          </PDFDownloadLink>
        </div>
      </div>
    </AgentLayout>
  );
};

export default CommandDetails;
