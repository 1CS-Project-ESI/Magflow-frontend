"use client";

import React from "react";
import Link from "next/link";

import ModifButton from "@/components/buttons/modifButton";
import SuppButton from "@/components/buttons/suppButton";
import { ROLES } from "@/constants";

interface Role {
  id: number; 
  name: string;
  
}
interface RolesTableProps {
  roles: Role[]; 
}

const RolesTable: React.FC<RolesTableProps> = ({ roles }) => {


  return (
    <div>
      {roles.map((role, index) => (
        <div
          key={role.id}
          className="bg-white border border-gray-300 flex justify-between p-6 mb-4 rounded-md"
        >
          <div key={index}>
            <span className="font-bold text-xl mb-8">{role.name}</span>
            <div className="mb-3">
             
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-3">
              {/* Pass role ID to ModifButton */}
              <ModifButton path="/permissions/"  />  
              {/* [roleId] */}
              {/* pathParams={{ roleId: role.id }} */}
            </span>
            {/* <SuppButton /> Assuming SuppButton is implemented */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesTable;
