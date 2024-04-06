// "use client";

// import React, { useState } from "react";
// import { Product, Commande } from "@/types";
// import ajt from "../../../public/assets/icons/Add.svg";
// import dlt from "../../../public/assets/icons/delete.svg";

// interface OptionSelectionProps {
//   commands: Commande[];
//   products: Product[];
//   selectedOptions: {
//     command: Commande | null;
//     product: Product | null;
//     deliveredQuantity: number; // Added deliveredQuantity
//   }[];
//   setSelectedOptions: React.Dispatch<
//     React.SetStateAction<
//       {
//         command: Commande | null;
//         product: Product | null;
//         deliveredQuantity: number; // Added deliveredQuantity
//       }[]
//     >
//   >;
//   // onSelectCommand: (command: Commande | null) => void;
//   onDeliveryQuantityChange: (index: number, value: number) => void;
//   onSelectCommand: (command: Commande | null) => void;
// }

// const OptionSelection: React.FC<OptionSelectionProps> = ({
//   commands,
//   products,
//   selectedOptions,
//   setSelectedOptions,
//   onDeliveryQuantityChange, // Update the function name if needed
//   onSelectCommand,
// }) => {
//   const [selectedCommandId, setSelectedCommandId] = useState<string>("");
//   const [selectedProductId, setSelectedProductId] = useState<string>("");
//   const [deliveredQuantity, setDeliveredQuantity] = useState<number>(0); // Added deliveredQuantity state
//   const handleQuantityChange = (index: number, value: number) => {
//     // Validate quantity (optional)
//     if (value >= 0) {
//       onDeliveryQuantityChange(index, value); // Call the prop function
//     }
//   const handleAddOption = () => {
//     if (selectedCommandId && selectedProductId) {
//       const command = commands.find(
//         (command) => command.id?.toString() === selectedCommandId
//       );
//       const product = products.find(
//         (product) => product.id?.toString() === selectedProductId
//       );
//       if (command && product) {
//         setSelectedOptions((prevOptions) => [
//           ...prevOptions,
//           { command, product, deliveredQuantity }, // Include deliveredQuantity in the new option
//         ]);
//         // setSelectedCommandId("");
//         // setSelectedProductId("");
//         // setDeliveredQuantity(0); // Reset deliveredQuantity
//       }
//     }
//   };

//   const handleDeleteOption = (index: number) => {
//     setSelectedOptions((prevOptions) => {
//       const newOptions = [...prevOptions];
//       newOptions.splice(index, 1);
//       return newOptions;
//     });
//   };
// }

//   return (
//     <div className="bg-white border border-gray-300 p-8 m-8 rounded-md">
//       <div className="flex items-center m-8">
//         <div className="flex-1 mr-4">
//           <select
//             className="border border-gray-300 rounded-md p-2 w-full"
//             value={selectedCommandId}
//             onChange={(e) => {
//               const selectedCommand= commands.find(
//                 (command) => command.id?.toString() === e.target.value
//               );
//               onSelectCommand(selectedCommand || null);
//               setSelectedCommandId(e.target.value);
//             }}
//           >
//             <option value="">Commande</option>
//             {commands?.map((article) => (
//               <option key={article.id} value={article.id?.toString()}>
//                 {article.id}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex-1 mr-4">
//           <select
//             className="border border-gray-300 rounded-md p-2 w-full"
//             value={selectedProductId}
//             onChange={(e) => setSelectedProductId(e.target.value)}
//           >
//             <option value="">Produit</option>
//             {products?.map((product) => (
//               <option key={product.id} value={product.id?.toString()}>
//                 {product.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="w-full flex-1 flex items-center justify-center">
//           <button
//             className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 rounded-lg"
//             onClick={handleAddOption}
//           >
//             <div className="flex items-center space-x-2">
//               <img
//                 src={ajt.src}
//                 width="18"
//                 height="18"
//                 style={{ filter: "invert(100%)" }}
//               />{" "}
//               <span>Ajouter</span>
//             </div>
//           </button>
//         </div>
//       </div>

//       <div className="w-full font-medium flex items-center justify-center">
//         <tbody className="table-auto w-full overflow-hidden">
//           {selectedOptions.map((option, index) => (
//             <tr
//               key={index}
//               className="border-y border-gray-200 flex justify-evenly"
//             >
//               <th className="bg-white text-center px-4 py-4">
//                 {option.product?.name}
//               </th>

//               <th className="bg-white text-center px-4 py-4">
//                 <input
//                   type="number"
//                   placeholder="Quantite Livrée" // Label changed to Quantite Livrée
//                   className="border border-gray-300 rounded-md p-2 w-full"
//                   value={deliveredQuantity}
//                   onChange={(e) =>
//                     setDeliveredQuantity(parseInt(e.target.value))
//                   }
//                 />
//               </th>
//               <th className="bg-white text-center px-4 py-4">
//                 <button
//                   className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
//                   onClick={() => handleDeleteOption(index)}
//                 >
//                   <div className="flex items-center space-x-2">
//                     <img src={dlt.src} width="18" height="15" />
//                     <span>Supprimer</span>
//                   </div>
//                 </button>
//               </th>
//             </tr>
//           ))}
//         </tbody>
//       </div>
//     </div>
//   );
// };

// export default OptionSelection;

import React, { useState } from "react";
import { Product, Commande } from "@/types";
import ajt from "../../../public/assets/icons/Add.svg";
import dlt from "../../../public/assets/icons/delete.svg";

interface OptionSelectionProps {
  commands: Commande[];
  products: Product[];
  selectedOptions: {
    command: Commande | null;
    product: Product | null;
    deliveredQuantity: number;
  }[];
  setSelectedOptions: React.Dispatch<
    React.SetStateAction<
      {
        command: Commande | null;
        product: Product | null;
        deliveredQuantity: number;
      }[]
    >
  >;
  onDeliveryQuantityChange: (index: number, value: number) => void;
  onSelectCommand: (command: Commande | null) => void;
}

const OptionSelection: React.FC<OptionSelectionProps> = ({
  commands,
  products,
  selectedOptions,
  setSelectedOptions,
  onDeliveryQuantityChange,
  onSelectCommand,
}) => {
  const [selectedCommandId, setSelectedCommandId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [deliveredQuantity, setDeliveredQuantity] = useState<number>(0);

  const handleQuantityChange = (index: number, value: number) => {
    // Validate quantity (optional)
    if (value >= 0) {
      onDeliveryQuantityChange(index, value); // Call the prop function
      // setDeliveredQuantity(value); // Update local state for table display
    }
  };

  // const handleQuantityChange = (index: number, value: number) => {
  //   // Call the prop function to update the delivery quantity
  //   onDeliveryQuantityChange(index, value);
  // };

  const handleAddOption = () => {
    if (selectedCommandId && selectedProductId) {
      const command = commands.find(
        (command) => command.id?.toString() === selectedCommandId
      );
      const product = products.find(
        (product) => product.id?.toString() === selectedProductId
      );
      if (command && product) {
        setSelectedOptions((prevOptions) => [
          ...prevOptions,
          { command, product, deliveredQuantity },
        ]);
        setSelectedCommandId("");
        setSelectedProductId("");
        setDeliveredQuantity(0); // Reset deliveredQuantity
      }
    }
  };

  const handleDeleteOption = (index: number) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions.splice(index, 1);
      return newOptions;
    });
  };

  return (
    <div className="bg-white border border-gray-300 p-8 m-8 rounded-md">
      <div className="flex items-center m-8">
        <div className="flex-1 mr-4">
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={selectedCommandId}
            onChange={(e) => {
              const selectedCommand = commands.find(
                (command) => command.id?.toString() === e.target.value
              );
              onSelectCommand(selectedCommand || null);
              setSelectedCommandId(e.target.value);
            }}
          >
            <option value="">Commande</option>
            {commands?.map((article) => (
              <option key={article.id} value={article.id?.toString()}>
                {article.id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 mr-4">
          <select
            className="border border-gray-300 rounded-md p-2 w-full"
            value={selectedProductId}
            onChange={(e) => setSelectedProductId(e.target.value)}
          >
            <option value="">Produit</option>
            {products?.map((product) => (
              <option key={product.id} value={product.id?.toString()}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex-1 flex items-center justify-center">
          <button
            className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 rounded-lg"
            onClick={handleAddOption}
          >
            <div className="flex items-center space-x-2">
              <img
                src={ajt.src}
                width="18"
                height="18"
                style={{ filter: "invert(100%)" }}
              />{" "}
              <span>Ajouter</span>
            </div>
          </button>
        </div>
      </div>

      <div className="w-full font-medium flex items-center justify-center">
        <tbody className="table-auto w-full overflow-hidden">
          {selectedOptions.map((option, index) => (
            <tr
              key={index}
              className="border-y border-gray-200 flex justify-evenly"
            >
              <th className="bg-white text-center px-4 py-4">
                {option.product?.name}
              </th>

              <th className="bg-white text-center px-4 py-4">
                {/* <input
                      type="number"
                      placeholder="Quantite Livrée" // Label changed to Quantite Livrée
                      className="border border-gray-300 rounded-md p-2 w-full"
                      value={deliveredQuantity}
                      onChange={(e) =>
                        setDeliveredQuantity(parseInt(e.target.value))
                      }
                    /> */}

                <input
                  type="number"
                  placeholder="Quantite Livrée" // Label changed to Quantite Livrée
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={option.deliveredQuantity} // Changed here
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value))
                  }
                />
              </th>
              <th className="bg-white text-center px-4 py-4">
                <button
                  className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                  onClick={() => handleDeleteOption(index)}
                >
                  <div className="flex items-center space-x-2">
                    <img src={dlt.src} width="18" height="15" />
                    <span>Supprimer</span>
                  </div>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </div>
    </div>
  );
};

export default OptionSelection;
