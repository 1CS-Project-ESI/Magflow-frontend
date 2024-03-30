"use client";

import React from "react";
import Link from "next/link";

import RootLayout from "../rootLayout";

import StructuresTable from "@/components/tables/structuresTable";
import AjoutButton from "@/components/buttons/ajoutButton";

const RolesPage: React.FC = () => {
  return (
    <RootLayout>
      <div className="flex m-8 justify-end">
        <AjoutButton showPopup={false} />
      </div>
      <div className="m-8 mt-8">
        <StructuresTable />
      </div>
    </RootLayout>
  );
};

export default RolesPage;
