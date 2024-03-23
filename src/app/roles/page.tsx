"use client";

import React from "react";
import Link from "next/link";

import RolesTable from "@/components/tables/rolesTable";
import AjoutButton from "@/components/buttons/ajoutButton";
import ModifButton from "@/components/buttons/modifButton";
import SuppButton from "@/components/buttons/suppButton";
import { ROLES } from "@/constants";

const RolesPage: React.FC = () => {
  return (
    <>
      <div className="flex m-8 justify-end">
        <AjoutButton showPopup={false} />
      </div>
      <div className="m-8 mt-8">
        <RolesTable />
      </div>
    </>
  );
};

export default RolesPage;
