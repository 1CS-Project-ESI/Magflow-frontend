"use client";

import React from "react";
import Link from "next/link";

import ModifButton from "@/components/buttons/modifButton";
import SuppButton from "@/components/buttons/suppButton";
import { ROLES } from "@/constants";

const RolesTable: React.FC = () => {
  return (
    <div>
      {ROLES.map((str, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 flex justify-between p-6 mb-4 rounded-md"
        >
          <div key={index}>
            <span className="font-bold text-xl mb-8">{str}</span>
            <div className="mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-3">
              <ModifButton path="/permissions" />
            </span>
            <SuppButton />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesTable;
