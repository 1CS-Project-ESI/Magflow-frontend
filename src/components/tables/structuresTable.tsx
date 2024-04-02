"use client";

import React ,{ useState } from "react";

import Link from "next/link";

import UpdateStructureButton from "../buttons/updateStructureButton";
import dlt from "../../../public/assets/icons/delete.svg";
import { get } from "http";
import getToken from "@/utils/getToken";

interface Structure {
  id: number;
  name: string;
}

interface StructuresTableProps {
  structures: Structure[];
}


const StructuresTable: React.FC<StructuresTableProps> = ({ structures }) => {
  const [isLoading, setIsLoading] = useState(false); // Track deletion loading state
  const [error, setError] = useState(null); // Track deletion error

  const handleDeleteStructure = async (id: number) => {
    setIsLoading(true); // Set loading state
    setError(null); // Clear any previous errors
    const accessToken = await getToken();

    try {
      const response = await fetch(`http://localhost:4000/api/structures/delete/${id}`, {
        method: "DELETE", // Set request method to DELETE
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error deleting structure: ${await response.text()}`);
      }

      console.log("Structure deleted successfully!");
      // Re-fetch data or remove the deleted row locally (consider best approach)
    } catch (error) {
      console.error("Error during deletion:", error);
      // setError(error.message); // Set user-friendly error message
    } finally {
      setIsLoading(false); // Reset loading state after completion
    }
  };
  return (
    <div>
      {structures.map((strct) => (
        // <Link href={`/structureDetails?id=${strct.id}`}>
        <Link href={{ pathname: "/structureDetails", query: { id: strct.id } }}>
          <div
            key={strct.id}
            className=" black border border-gray-300 flex justify-between p-6 mb-4 rounded-md"
          >
            <div key={strct.id}>
              <span className="font-bold text-xl mb-8">{strct.name}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-3">
                <UpdateStructureButton showPopup={true} />
              </span>
              <button
                className="w-36 bg-transparent border-black border-2 hover:bg-black hover:text-white font-medium py-2 px-4 rounded-lg"
                onClick={async () => {
                  await handleDeleteStructure(strct.id);
                }}
              >
                <div className="flex items-center space-x-2">
                  <img src={dlt.src} width="18" height="15" />
                  <span>Supprimer</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StructuresTable;
