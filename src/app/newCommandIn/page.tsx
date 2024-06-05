// "use client";

// import React, { useState, useEffect } from "react";
// import RootLayout from "../rootLayout";
// import { Chapter, Product, Article, Fournisseur, CommandeIn } from "@/types";
// import OptionSelection from "@/components/commands/selectionIn";
// import save from "../../../public/assets/icons/EnregistrerPDF.svg";
// import getToken from "@/utils/getToken";
// import UserID from "@/utils/getID";

// // create a toayst 
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const Page = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [typecommande, setTypeCommand] = useState<string>();
//   const [selectedOptions, setSelectedOptions] = useState<
//     { product: Product | null; quantity: number }[]
//   >([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:4000/api/store/product/all"
//         );
//         const data = await response.json();
//         console.log(data);
//         if (!response.ok) {
//           throw new Error(`Error fetching products: ${data.message}`);
//         }

//         setProducts(data.products);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const accessToken = await getToken();
//     const id = await UserID();

//     console.log("token is ", accessToken);
//     console.log("id is ", id);

//     const now = new Date();
//     const orderdate = now.toISOString().substring(0, 10); // Format date as YYYY-MM-DD

//     const randomNumber = Math.floor(Math.random() * 100000) + 100000; // Generate a 6-digit number
//     const number = `${randomNumber}`;

//     const date = new Date(now);

//     const produitsCommandes = selectedOptions.map((option) => ({
//       id_produit: option.product?.id,
//       orderedquantity: option.quantity,
//     }));

//     console.log(produitsCommandes);
//     console.log(typecommande)

    
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/bons/create-bon-commande-interne/${id}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             number,
//             date,
//             produitsCommandes,
//             typecommande,
//           }),
//         }
//       );

//       if (response.status == 201) {
//         toast.success('Command created successfully!');
//       } else {
//         console.error("Error adding commandes:", response.statusText);
//         toast.error('Error creating command.');
//       }
//     } catch (error) {
//       console.error("Error adding commandes:", error);
//       toast.error('Error creating command.');
//     }
//   };

//   return (
//     <RootLayout>
//       <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
//         <h1 className="text-3xl mx-8">Nouvelle Commande Interne</h1>
//         <select
//               className="border border-gray-300 rounded-md mx-8 p-2 w-2/3"
//               value={typecommande}
//               onChange={(e) => setTypeCommand(e.target.value)}
//             >
//               <option value="">Type</option>
//               <option value="Commande Interne">Commande Interne</option>
//               <option value="Commande Decharges">Commande Decharges</option>
//             </select>
//         <OptionSelection
//           products={products}
//           selectedOptions={selectedOptions}
//           setSelectedOptions={setSelectedOptions}
//         />
//         <div className="w-full flex justify-end">
//           <button className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg">
//             <div className="flex items-center space-x-2" onClick={handleSubmit}>
//               <img
//                 src={save.src}
//                 width="18"
//                 height="18"
//                 style={{ filter: "invert(100%)" }}
//               />{" "}
//               <span>Enregistrer</span>
//             </div>
//           </button>
//         </div>
//       </div>
//     </RootLayout>
//   );
// };

// export default Page;




"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { Product } from "@/types";
import OptionSelection from "@/components/commands/selectionIn";
import save from "../../../public/assets/icons/EnregistrerPDF.svg";
import getToken from "@/utils/getToken";
import UserID from "@/utils/getID";

// Added lines for toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [typecommande, setTypeCommand] = useState<string>();
  const [selectedOptions, setSelectedOptions] = useState<
    { product: Product | null; quantity: number }[]
  >([]);

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
        toast.error('Error fetching products.'); // Added line for toast error
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();
    const id = await UserID();

    console.log("token is ", accessToken);
    console.log("id is ", id);

    const now = new Date();
    const orderdate = now.toISOString().substring(0, 10); // Format date as YYYY-MM-DD

    const randomNumber = Math.floor(Math.random() * 100000) + 100000; // Generate a 6-digit number
    const number = `${randomNumber}`;

    const date = new Date(now);

    const produitsCommandes = selectedOptions.map((option) => ({
      id_produit: option.product?.id,
      orderedquantity: option.quantity,
    }));

    console.log(produitsCommandes);
    console.log(typecommande)

    try {
      const response = await fetch(
        `http://localhost:4000/api/bons/create-bon-commande-interne/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            number,
            date,
            produitsCommandes,
            typecommande,
          }),
        }
      );

      if (response.status == 201) {
        toast.success('Command created successfully!'); // Added line for toast success
      } else {
        console.error("Error adding commandes:", response.statusText);
        toast.error('Error creating command.'); // Added line for toast error
      }
    } catch (error) {
      console.error("Error adding commandes:", error);
      toast.error('Error creating command.'); // Added line for toast error
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <h1 className="text-3xl mx-8">Nouvelle Commande Interne</h1>
        <select
          className="border border-gray-300 rounded-md mx-8 p-2 w-2/3"
          value={typecommande}
          onChange={(e) => setTypeCommand(e.target.value)}
        >
          <option value="">Type</option>
          <option value="Commande Interne">Commande Interne</option>
          <option value="Commande Decharges">Commande Decharges</option>
        </select>
        <OptionSelection
          products={products}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        <div className="w-full flex justify-end">
          <button className="bg-purple-950 text-white hover:bg-black font-medium py-2 px-4 mx-8 rounded-lg" onClick={handleSubmit}>
            {/* Moved onClick to the button element */}
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
      <ToastContainer /> {/* Added line for ToastContainer */}
    </RootLayout>
  );
};

export default Page;
