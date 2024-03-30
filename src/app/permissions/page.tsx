"use client";

import React, { useEffect, useState } from 'react';
import RootLayout from '../rootLayout';
import PermissionsTable from '@/components/tables/permissionsTable';


const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/permissions/getAllPermissions');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error fetching permissions: ${data.message}`);
        }

        setPermissions(data.permissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
       
      }
    };

    fetchPermissions();
  }, []);
  return (
    <RootLayout>
      <span className="font-bold text-4xl">Droits d'accès</span>
      <PermissionsTable permissions={permissions} />
    </RootLayout>
  );
};

export default PermissionsPage;