"use client";

import React from 'react';

import RootLayout from '../rootLayout';

import PermissionsTable from '@/components/tables/permissionsTable';


const PermissionsPage = () => {
  return (
    <RootLayout>
      <span className="font-bold text-4xl">Droits d'accès</span>
      <PermissionsTable />
    </RootLayout>
  );
};

export default PermissionsPage;