"use client";

import React from "react";
import Link from "next/link";

import ModifButton from "@/components/buttons/modifButton";

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
      {roles.map((role) => (
        <div
          key={role.id}
          className="bg-white border border-gray-300 flex justify-between p-6 mb-4 rounded-md"
        >
          <div >
            <span className="font-bold text-xl mb-8">{role.name}</span>
            <div className="mb-3">
             
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-3">
             {/* Construct the URL with query parameters */}
             <Link href={{ pathname: "/permissions", query: { id: role.id } }}>
            
                  <ModifButton />
              
              </Link>
            </span>
            {/* <SuppButton /> Assuming SuppButton is implemented */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesTable;
