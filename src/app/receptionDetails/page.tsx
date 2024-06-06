
"use client";
import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import ReceptionDetailsTable from "@/components/tables/receptionDetailsTable";
import { ProductReception, Reception } from "@/types";
import Converter from "@/dateConverter";
import getToken from "@/utils/getToken";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReceptionDetails: React.FC = () => {
  const [reception, setReception] = useState<Reception>();
  const [products, setProducts] = useState<ProductReception[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchReceptionProduct();
  }, []);

  const fetchReceptionProduct = async () => {
    const accessToken = await getToken();
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let id = null;

    if (idString !== null) {
      id = parseInt(idString, 10);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/receptionDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReception(data.reception);
        setProducts(data.produitsDelivres);
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
        `http://localhost:4000/api/pdf/pdfbonreception/${id}`
      );
      const pdfResponse = await fetch(pdfUrl.toString());

      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `bon-reception-${id}.pdf`;
        link.click();
        URL.revokeObjectURL(link.href); // Clean up memory leak
        toast.success('PDF generated successfully and downloaded.', { autoClose: 3000 });
      } else {
        toast.error('Failed to generate PDF.');
      }
    } catch (error) {
      console.error("Error fetching bonSortie data or generating PDF:", error);
      toast.error('Error generating PDF.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadPDF = async () => {
    if (!selectedFile) {
      toast.error('Please select a PDF file to upload.');
      return;
    }

    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    if (!idString) return;

    const bonReceptionId = parseInt(idString, 10);

    const formData = new FormData();
    formData.append('bonlivraison', selectedFile);

    try {
      const accessToken = await getToken();
      const response = await fetch(`http://localhost:4000/api/upload/bonlivraison/${bonReceptionId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        toast.success('PDF livraison uploaded successfully.', { autoClose: 3000 });
        setSelectedFile(null); // Clear the file input
      } else {
        const errorText = await response.text();
        console.error("Failed to upload PDF livraison:", errorText);
        toast.error(`Failed to upload PDF livraison: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error uploading PDF livraison:", error);
      toast.error('Error uploading PDF livraison.');
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <h1 className="text-4xl font-bold flex justify-center">Bon de Reception</h1>
        <div className="text-xl mb-4">
          Reception numero : <span className="font-bold">{reception?.number}</span>
        </div>
        <div className="text-xl mb-4">
          Date :{" "}
          <span className="font-bold">
            <Converter date={reception?.deliverydate} />
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-xl">Produits :</div>
        </div>
        <ReceptionDetailsTable products={products} />
        <div className="flex justify-end my-4 mx-10">
          <div className="grid grid-cols-1">
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
            <div className="my-4">
              <input
                type="file"
                accept="application/pdf"
                className="border border-gray-300 rounded-md m-2 p-2"
                onChange={handleFileChange}
              />
              <button
                className="bg-purple-950 text-white hover:black font-medium py-2 px-4 rounded-lg"
                onClick={handleUploadPDF}
              >
                Upload Bon Livraison
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </RootLayout>
  );
};

export default ReceptionDetails;