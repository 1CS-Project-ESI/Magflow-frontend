"use client";

import React from "react";
import Link from "next/link";

import RootLayout from "../rootLayout";

import RolesTable from "@/components/tables/rolesTable";
import AjoutButton from "@/components/buttons/ajoutButton";
import ModifButton from "@/components/buttons/modifButton";
import SuppButton from "@/components/buttons/suppButton";
import { ROLES } from "@/constants";


const RolesPage: React.FC = () => {
  return (
    <RootLayout>
      <div className="flex m-8 justify-end">
        <AjoutButton showPopup={false} />
      </div>
      <div className="m-8 mt-8">
        <RolesTable />
      </div>
    </RootLayout>
  );
};

export default RolesPage;
