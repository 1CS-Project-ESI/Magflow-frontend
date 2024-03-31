
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import RootLayout from "../rootLayout";
import RolesTable from "@/components/tables/rolesTable";
import AjoutButton from "@/components/buttons/ajoutButton";
import ModifButton from "@/components/buttons/modifButton";
import SuppButton from "@/components/buttons/suppButton";

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/roles/getAllRoles'); 
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(`Error fetching roles: ${data.message}`);
        }

        setRoles(data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        
      }
    };

    fetchRoles();
  }, []);

  return (
    <RootLayout>
      <div className="flex m-8 justify-end">
        <AjoutButton showPopup={false} />
      </div>
      <div className="m-8 mt-8">
      
        <RolesTable roles={roles} />
      </div>
    </RootLayout>
  );
};

export default RolesPage;