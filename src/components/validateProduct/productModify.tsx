"use client";

// import React from "react";
// import Link from "next/link";
// import { Commande, CommandeIn, ProductCommandeIn } from "@/types";
// import dlt from "../../../public/assets/icons/delete.svg";
// import Converter from "@/dateConverter";
// import { ProduitBCI } from "@/types";
// import { Product } from "@/types";
// import { BCI } from "@/types";
// import QuantityServie from "../fields/quantityservie";
// import { useState } from "react";

// interface Props {
//   ProduitsBCI: ProductCommandeIn[];
// }

// const ProduitServie: React.FC<Props> = ({  ProduitsBCI}) => {
//   return (
//     <div className="overflow-x-auto border border-gray-300 rounded-xl">
//       <table className="table-auto w-full overflow-hidden">
//         <thead>
//           <tr className="bg-white text-zinc-400 ">
//             <th className="px-4 py-4 font-light">Nom de produit</th>
//             <th className="px-4 py-2 font-light hidden md:table-cell">
//               Quantite Accordee
//             </th>
//             <th className="px-4 py-2 font-light hidden md:table-cell">
//               Quantite servie
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {ProduitsBCI.map((Product, productIndex) => (
//             <tr
//               key={productIndex}
//               className="border-b text-[#2C2D41] border-gray-200"
//             >
//               <td className="border-t bg-white text-center px-4 py-4">
//                 {Product.name}
//               </td>
//               {ProduitsBCI.map((ProduitBCI, produitIndex) => {
//                 if (ProduitBCI.id_produit === Product.id_produit) {
//                   const [observation, setObservation] = useState("");

//                   const handleObservationChange = (event: {
//                     target: { value: React.SetStateAction<string> };
//                   }) => {
//                     setObservation(event.target.value);
//                   };
//                   return (
//                     <React.Fragment key={produitIndex}>
//                       <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
//                         {ProduitBCI.accordedQuantity}
//                       </td>
//                       <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
//                         <QuantityServie ProduitBCI={ProduitBCI} />
//                       </td>
//                       <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
//                         <div className="items-center justify-center">
//                           <input
//                             type="text"
//                             value={observation}
//                             onChange={handleObservationChange}
//                             placeholder="Observation"
//                             className="border border-[#c4c4c4] mx-2 rounded-lg w-18 h-10"
//                           />
//                         </div>
//                       </td>
//                     </React.Fragment>
//                   );
//                 }
//                 return null;
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProduitServie;






// // ProduitServie component
// import React, { useState } from "react";
// import { ProductCommandeIn } from "@/types";

// interface Props {
//   ProduitsBCI: ProductCommandeIn[];
//   servedQuantities: { id_produit: number; servedquantity: number }[];
//   setServedQuantities: React.Dispatch<React.SetStateAction<{ id_produit: number; servedquantity: number }[]>>;
// }

// const ProduitServie: React.FC<Props> = ({ ProduitsBCI, servedQuantities, setServedQuantities }) => {
//   const handleQuantityChange = (id_produit: number, servedquantity: number) => {
//     setServedQuantities((prevQuantities) => {
//       const updatedQuantities = prevQuantities.map((q) =>
//         q.id_produit === id_produit ? { id_produit, servedquantity } : q
//       );
//       return updatedQuantities;
//     });
//   };

//   return (
//     <div className="overflow-x-auto border border-gray-300 rounded-xl">
//       <table className="table-auto w-full overflow-hidden">
//         {/* ... (existing table structure) */}
//         <tbody>
//           {ProduitsBCI.map((Product, productIndex) => (
//             <tr key={productIndex} className="border-b text-[#2C2D41] border-gray-200">
//               <td className="border-t bg-white text-center px-4 py-4">{Product.name}</td>
//               {ProduitsBCI.map((ProduitBCI, produitIndex) => {
//                 if (ProduitBCI.id_produit === Product.id_produit) {
//                   return (
//                     <React.Fragment key={produitIndex}>
//                       <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
//                         {ProduitBCI.accordedQuantity}
//                       </td>
//                       <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
//                         <input
//                           type="number"
//                           value={servedQuantities.find((q) => q.id_produit === ProduitBCI.id_produit)?.servedquantity || 0}
//                           onChange={(e) => handleQuantityChange(ProduitBCI.id_produit, parseInt(e.target.value, 10))}
//                           className="border border-[#c4c4c4] mx-2 rounded-lg w-18 h-10"
//                         />
//                       </td>
//                     </React.Fragment>
//                   );
//                 }
//                 return null;
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProduitServie;



// ProduitServie component
import React, { useState } from "react";
import { ProductCommandeIn } from "@/types";

interface Props {
  ProduitsBCI: ProductCommandeIn[];
  servedQuantities: { id_produit: number; servedquantity: number }[];
  setServedQuantities: React.Dispatch<React.SetStateAction<{ id_produit: number; servedquantity: number }[]>>;
}

const ProduitServie: React.FC<Props> = ({ ProduitsBCI }) => {
  const [servedQuantities, setServedQuantities] = useState<
    { id_produit: number; servedquantity: number }[]
  >([]);

  const handleQuantityChange = (id_produit: number, servedquantity: number) => {
    setServedQuantities((prevQuantities) => {
      const existingIndex = prevQuantities.findIndex((q) => q.id_produit === id_produit);
      if (existingIndex !== -1) {
        const updatedQuantities = [...prevQuantities];
        updatedQuantities[existingIndex].servedquantity = servedquantity;
        return updatedQuantities;
      } else {
        return [...prevQuantities, { id_produit, servedquantity }];
      }
    });
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        {/* ... (existing table structure) */}
        <tbody>
          {ProduitsBCI.map((Product, productIndex) => (
            <tr key={productIndex} className="border-b text-[#2C2D41] border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">{Product.name}</td>
              {ProduitsBCI.map((ProduitBCI, produitIndex) => {
                if (ProduitBCI.id_produit === Product.id_produit) {
                  return (
                    <React.Fragment key={produitIndex}>
                      <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                        {ProduitBCI.accordedQuantity}
                      </td>
                      <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                        <input
                          type="number"
                          value={
                            servedQuantities.find((q) => q.id_produit === ProduitBCI.id_produit)
                              ?.servedquantity || 0
                          }
                          onChange={(e) =>
                            handleQuantityChange(ProduitBCI.id_produit, parseInt(e.target.value, 10))
                          }
                          className="border border-[#c4c4c4] mx-2 rounded-lg w-18 h-10"
                        />
                      </td>
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProduitServie;