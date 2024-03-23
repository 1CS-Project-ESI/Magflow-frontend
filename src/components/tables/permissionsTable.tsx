"use client";

import React from "react";

import { PERMISSIONS } from "@/constants";

const PermissionsTable: React.FC = () => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl m-8">
      <table className="table-auto w-full overflow-hidden">
        <tbody>
          {PERMISSIONS.map((perm, index) => (
            <tr key={index}>
              <td className="bg-white text-center text-gray-500 flex justify-between px-4 py-5">
                <div className="ml-14">{perm}</div>
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
