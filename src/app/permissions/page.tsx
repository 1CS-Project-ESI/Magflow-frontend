"use client";

import React from 'react';

import PermissionsTable from '@/components/tables/permissionsTable';

const PermissionsPage = () => {
  return (
    <>
      <span className="font-bold text-4xl">Droits d'accès</span>
      <PermissionsTable />
    </>
  );
};

export default PermissionsPage;