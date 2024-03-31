"use client";

import React from "react";
import RootLayout from "../rootLayout";
import AddLogo from "@/components/fields/add-logo";
import Settva from "@/components/fields/set-tva";
import Langue from "@/components/fields/langue";
import Link from "next/link";

const SettingsPage = () => {
  return (
    <RootLayout>
      <div className="flex items-center mx-12 my-8">
        <Link
          href=""
          className="mr-5 hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Parametres Générals
        </Link>
        <Link
          href="/profile"
          className="hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Modifier Profile
        </Link>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4 m-8 overflow-x-auto bg-white border border-gray-300 rounded-xl">
        <AddLogo />
        <Langue />
        <Settva />
      </div>
    </RootLayout>
  );
};

export default SettingsPage;
