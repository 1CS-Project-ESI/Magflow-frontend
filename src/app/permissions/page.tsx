"use client";

import React, { useEffect, useState } from 'react';
import RootLayout from '../rootLayout';
import PermissionsTable from '@/components/tables/permissionsTable';
import getToken from '@/utils/getToken';


const PermissionsPage = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      const accessToken = await getToken(); 
      try {
        const response = await fetch('http://localhost:4000/api/permissions/getAllPermissions',{
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
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

      <span className="font-bold text-4xl m-10">Droits d'accès</span>
      <PermissionsTable permissions={permissions} />

    </RootLayout>
  );
};

export default PermissionsPage;