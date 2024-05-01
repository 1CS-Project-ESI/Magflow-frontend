// "use client";
// import React, { useState } from "react";
// import { ROLES } from "@/constants";
// import { User } from "@/types";
// import getToken from "../../utils/getToken.js";
// interface ExtendedUser extends User {
//   phone: string; 
// }



// const PopupContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
//   const [formData, setFormData] = useState<ExtendedUser>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     newEmail:"",
//     isActive: true,
//     role: "",
//     phone: "" 
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };
  

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const accessToken = await getToken();
    
//     try {
//       const response = await fetch('http://localhost:4000/api/users/createuser', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
        
//       });
//       if (response.ok) {
        
//         onClose();
//       } else {
   
//         console.error('Error adding user:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   return (
//     <div className="bg-white text-[#2c2d41] p-8 rounded-lg w-96 flex flex-col items-center">
//       <h2 className="text-lg text-purple-950 font-semibold mb-4">New Account</h2>
//       <form className="w-full" onSubmit={handleSubmit}>
//         {/* Input fields */}
//         <div className="mb-4 w-full">
//           <input
//             type="text"
//             id="firstName"
//             name="firstname"
//             placeholder="First Name"
//             className="input-field h-9 w-full"
//             value={formData.firstname}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4 w-full">
//           <input
//             type="text"
//             id="lastName"
//             name="lastname"
//             placeholder="Last Name"
//             className="input-field h-9 w-full"
//             value={formData.lastname}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4 w-full">
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Email"
//             className="input-field h-9 w-full"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4 w-full">
//           <input
//           type="password"
//           id="password"
//           name="password" 
//           placeholder="Password"
//           className="input-field h-9 w-full"
//           value={formData.password}
//           onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4 w-full">
//           <input
//             type="phone"
//             id="phone"
//             name="phone"
//             placeholder="Phone Number"
//             className="input-field h-9 w-full"
//             value={formData.phone}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div className="mb-4 w-full">
//           <select
//             id="role"
//             name="role"
//             className="input-field h-9 w-full"
//             value={formData.role}
//             onChange={handleInputChange}
//           >
//             <option value="" disabled hidden>
//               Select Role
//             </option>
//             {ROLES.map((role, idx) => (
//               <option value={role} key={idx}>{role}</option>
//             ))}
//           </select>
//         </div>
//         {formData.role === "consumer" ||
//         formData.role === "structureresponsable" ? (
//           <div className="mb-4 w-full">
//             <input
//               type="text"
//               id="idStructure"
//               name="idStructure"
//               placeholder="id structure"
//               className="input-field h-9 w-full"
//               value={""}
//             />
//           </div>
//         ) : null}
//         {/* Buttons */}
//         <div className="flex justify-between w-full">
//           <button
//             type="button"
//             onClick={onClose}
//             className="bg-gray-500 hover:bg-gray-700 text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
//           >
//             Annuler
//           </button>
//           <span className="w-2"></span>
//           <button
//             type="submit"
//             className="bg-purple-950 hover:bg-black text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
//           >
//             Ajouter
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PopupContent;


"use client";
import React, { useState } from "react";
import { ROLES } from "@/constants";
import { User } from "@/types";
import getToken from "../../utils/getToken.js";
import { Structure } from "@/types";

interface ExtendedUser extends User {
  phone: string;
}

interface Structures {
  structure: Structure[];
}

const PopupContent: React.FC<{
  onClose: () => void;
  structures: Structure[];
}> = ({ onClose, structures }) => {
  const [formData, setFormData] = useState<ExtendedUser>({
    firstname: "",
    lastname: "",
    email: "",
    newEmail: "",
    isActive: true,
    role: "",
    phone: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();

    try {
      const response = await fetch(
        "http://localhost:4000/api/users/createuser",
        {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        onClose();
      } else {
        console.error("Error adding user:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg w-96 flex flex-col items-center">
      <h2 className="text-lg text-purple-950 font-semibold mb-4">
        New Account
      </h2>
      <form className="w-full" onSubmit={handleSubmit}>
        {/* Input fields */}
        <div className="mb-4 w-full">
          <input
            type="text"
            id="firstName"
            name="firstname"
            placeholder="First Name"
            className="input-field h-9 w-full"
            value={formData.firstname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="text"
            id="lastName"
            name="lastname"
            placeholder="Last Name"
            className="input-field h-9 w-full"
            value={formData.lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="input-field h-9 w-full"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="input-field h-9 w-full"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="phone"
            id="phone"
            name="phone"
            placeholder="Phone Number"
            className="input-field h-9 w-full"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 w-full text-[#2C2D41]">
          <select
            id="role"
            name="role"
            className="input-field h-9 w-full"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="" disabled hidden>
              Select Role
            </option>
            {ROLES.map((role, idx) => (
              <option value={role} key={idx}>
                {role}
              </option>
            ))}
          </select>
        </div>
       {formData.role === "consumer" ||
        formData.role === "structureresponsable" ? (
          <div className="mb-4 w-full text-[#2C2D41]">
            <select
              id="idStructure"
              name="idStructure"
              className="input-field h-9 w-full"
              value={""}
            >
              <option value="" disabled hidden>
                Select Structure
              </option>
              {structures.map(
                (
                  structure: {
                    id: string | number | readonly string[] | undefined;
                  },
                  idx: React.Key | null | undefined
                ) => (
                  <option value={structure.id} key={idx}>
                    {structure.id}
                  </option>
                )
              )}
            </select>
          </div>
        ) : null}
        {/* Buttons */}
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
            Annuler
          </button>
          <span className="w-2"></span>
          <button
            type="submit"
            className="bg-purple-950 hover:bg-black text-white font-light py-2 px-4 w-full rounded-lg focus:outline-none focus:shadow-outline"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default PopupContent;
