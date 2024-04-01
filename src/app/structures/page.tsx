"use client";

import React from "react";

import RootLayout from "../rootLayout";

import StructuresTable from "@/components/tables/structuresTable";
import AddStructureButton from "@/components/buttons/addStructureButton";

const RolesPage: React.FC = () => {
  return (
    <RootLayout>
      <div className="flex m-8 justify-end">
        <AddStructureButton showPopup={true} />
      </div>
      <div className="m-8 mt-8">
        <StructuresTable />
      </div>
    </RootLayout>
  );
};

export default RolesPage;
