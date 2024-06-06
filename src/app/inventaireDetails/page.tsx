// "use client";
// import React, { useState, useEffect } from "react";
// import RootLayout from "../rootLayout";
// import InvDetailsTable from "@/components/tables/invDetailsTable";
// import { Product, Inventaire } from "@/types";
// import Converter from "@/dateConverter";
// import getToken from "@/utils/getToken";

// const CommandDetails: React.FC = () => {
//   const [inventaire, setInventaire] = useState<Inventaire>();
//   const [chapter, setChapter] = useState<string>();
//   const [article, setArticle] = useState<string>();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [observations, setObservations] = useState<any[]>([]);
//   const role = localStorage.getItem("role");
//   console.log(role);

//   useEffect(() => {
//     fetchInventaireDetails();
//   }, []);

//   const fetchInventaireDetails = async () => {
//     const accessToken = await getToken();
//     const url = new URL(window.location.href);
//     const idString = url.searchParams.get("id");
//     let id = null;

//     if (idString !== null) {
//       id = parseInt(idString, 10);
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/inventaire/details/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Response data:", data);
        
//         // Adjust mapping to match backend response
//         const mappedObservations = data.products.map((product: any) => ({
//           id_produit: product.id_produit,
//           designation: product.designation,
//           n_inventaire: product.n_inventaire,
//           reste: product.reste,
//           entree: product.entree,
//           sortie: product.sortie,
//           quantity_logique: product.quantity_logique,
//           physicalquantity: product.physicalquantity,
//           ecart: product.ecart,
//           obs: product.obs,
//           produit: {
//             caracteristics: product.produit.caracteristics,
//             stock_mini: product.produit.stock_mini,
//           },
//         }));
//         setObservations(mappedObservations);
//         setInventaire(data.inventaire);
//         setChapter(data.chapitre);
//         setArticle(data.article);
//       } else {
//         console.error("Failed to fetch command products:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error fetching command products:", error);
//     }
//   };

//   const validateEtat = async () => {
//     const accessToken = await getToken();
//     const url = new URL(window.location.href);
//     const idString = url.searchParams.get("id");
//     let id = null;

//     if (idString !== null) {
//       id = parseInt(idString, 10);
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/inventaire/validate/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.ok) {
//         console.log("State validated successfully");
//       } else {
//         console.error("Failed to validate state:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error validating state:", error);
//     }
//   };

//   return (
//     <RootLayout>
//       <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
//         <div className="text-xl mb-4">
//           Numero : <span className="font-bold">{inventaire?.number}</span>
//         </div>
//         <div className="text-xl mb-4">
//           Date :{" "}
//           <span className="font-bold">
//             {" "}
//             <Converter date={inventaire?.date} />
//           </span>
//         </div>
//         <div className="text-xl mb-4">
//           Chapitre : <span className="font-bold">{chapter}</span>
//         </div>
//         <div className="text-xl mb-4">
//           Article : <span className="font-bold">{article}</span>
//         </div>
//         <>
//           {(() => {
//             switch (inventaire?.validation) {
//               case 0:
//                 return (
//                   <div className="text-xl mb-4">
//                     Etat : <span className="font-bold">Non Validée</span>
//                   </div>
//                 );
//               case 1:
//                 return (
//                   <div className="text-xl mb-4">
//                     Etat : <span className="font-bold">Validée</span>
//                   </div>
//                 );
//               default:
//                 return null;
//             }
//           })()}
//         </>
//         <div className="flex justify-between mb-4">
//           <div className="text-xl">Produits :</div>
//         </div>
//         <InvDetailsTable observations={observations} />
//         {role === "director" && inventaire?.validation === 0 && (
//           <div>
//             <button
//               className="bg-purple-950 text-white hover:bg-black font-medium mt-8 py-2 px-4 rounded-lg"
//               onClick={validateEtat}
//             >
//               Valider
//             </button>
//           </div>
//         )}
//       </div>
//     </RootLayout>
//   );
// };

// export default CommandDetails;





"use client";
import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import InvDetailsTable from "@/components/tables/invDetailsTable";
import { Product, Inventaire } from "@/types";
import Converter from "@/dateConverter";
import getToken from "@/utils/getToken";
import { toast } from 'react-toastify'; // Make sure you have react-toastify installed and properly set up

const CommandDetails: React.FC = () => {
  const [inventaire, setInventaire] = useState<Inventaire>();
  const [chapter, setChapter] = useState<string>();
  const [article, setArticle] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [observations, setObservations] = useState<any[]>([]);
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
        console.log("Response data:", data);
        
        // Adjust mapping to match backend response
        const mappedObservations = data.products.map((product: any) => ({
          id_produit: product.id_produit,
          designation: product.designation,
          n_inventaire: product.n_inventaire,
          reste: product.reste,
          entree: product.entree,
          sortie: product.sortie,
          quantity_logique: product.quantity_logique,
          physicalquantity: product.physicalquantity,
          ecart: product.ecart,
          obs: product.obs,
          produit: {
            caracteristics: product.produit.caracteristics,
            stock_mini: product.produit.stock_mini,
          },
        }));
        setObservations(mappedObservations);
        setInventaire(data.inventaire);
        setChapter(data.chapitre);
        setArticle(data.article);
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
        console.log("State validated successfully");
      } else {
        console.error("Failed to validate state:", response.statusText);
      }
    } catch (error) {
      console.error("Error validating state:", error);
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

      const pdfUrl = new URL(`http://localhost:4000/api/pdf/pdfetatinventaire/${id}`);
      const pdfResponse = await fetch(pdfUrl.toString());

      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `etat-inventaire-${id}.pdf`;
        link.click();
        URL.revokeObjectURL(link.href);
        toast.success('PDF generated and downloaded successfully!');
        console.log("PDF generated successfully and downloaded.");
      } else {
        console.error("Failed to generate PDF. Error:", pdfResponse.statusText);
        toast.error('Failed to generate PDF.');
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error('Error generating PDF.');
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
        <div className="text-xl mb-4">
          Chapitre : <span className="font-bold">{chapter}</span>
        </div>
        <div className="text-xl mb-4">
          Article : <span className="font-bold">{article}</span>
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
        <div>
          <button
            className="bg-purple-950 text-white hover:bg-black font-medium mt-8 py-2 px-4 rounded-lg"
            onClick={handleSavePDF}
          >
            Télécharger l'état de l'inventaire
          </button>
        </div>
      </div>
    </RootLayout>
  );
};

export default CommandDetails;
