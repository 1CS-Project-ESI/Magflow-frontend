"use client";

import React, { useEffect, useState } from "react";

import RootLayout from "../rootLayout";

import StructuresTable from "@/components/tables/structuresTable";
import AddStructureButton from "@/components/buttons/addStructureButton";
import getToken from "@/utils/getToken";

const StructuresPage: React.FC = () => {

  const [structures, setStructures] = useState([]);

  useEffect(() => {
    const fetchStructures = async () => {
      const accessToken = await getToken();
      try {
        const response = await fetch('http://localhost:4000/api/structures/allstructures',{
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }); 
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching structures: ${data.message}`);
        }

        setStructures(data.structures);
      } catch (error) {
        console.error("Error fetching structures:", error);
        
      }
    };

    fetchStructures();
  }, []);

  return (
    <RootLayout>
      <div className="flex m-8 justify-end">
        <AddStructureButton showPopup={true} />
      </div>
      <div className="m-8 mt-8">
        <StructuresTable structures={structures} />
      </div>
    </RootLayout>
  );
};

export default StructuresPage;
