"use client";

import React from "react";

import { PERMISSIONS } from "@/constants";

interface PermissionsTableProps {
  permissions: {
    id: number;
    name: string;
  }[];
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions = [] }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl m-8">
      <table className="table-auto w-full overflow-hidden">
      <tbody>
      {permissions.map((permission, index) => (
        <tr key={permission.id}> 
          <td className="bg-white text-center text-gray-500 flex justify-between px-4 py-5">
            <div className="ml-14">{permission.name}</div>
            <div>
              <input type="checkbox" className="form-checkbox bordr h-5 w-5 mx-14" />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
   </table>
    </div>
  );
};

export default PermissionsTable;
