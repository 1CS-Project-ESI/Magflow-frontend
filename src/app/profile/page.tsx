"use client";

import React from "react";
import RootLayout from "../rootLayout";
import AddPP from "@/components/fields/addPP";
import Logout from "@/components/fields/logout";
import Password from "@/components/fields/password";
import Link from "next/link";

const SettingsPage = () => {
  return (
    <RootLayout>
      <div className="flex items-center mx-12 my-8">
        <Link
          href="/settings"
          className="mr-5 hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Parametres Générals
        </Link>
        <Link
          href=""
          className="hover:border-b-2 hover:border-l-purple-950 hover:text-purple-950"
        >
          Modifier Profile
        </Link>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4 m-8 overflow-x-auto bg-white border border-gray-300 rounded-xl">
        <div className="m-4">
          <label htmlFor="nom" className="block font-bold m-2">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            placeholder="Nom"
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="m-4">
          <label htmlFor="prenom" className="block font-bold m-2">
            Prenom
          </label>
          <input
            type="text"
            id="prenom"
            placeholder="Prenom"
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mx-4">
          <label htmlFor="email" className="block font-bold m-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="shadow appearance-none border rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <AddPP />
        <Password />
        <Logout />
      </div>
    </RootLayout>
  );
};

export default SettingsPage;
