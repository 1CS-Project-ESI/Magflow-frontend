"use client";

import React, { useState } from "react";
import { PERMISSIONS } from "@/constants";

const PermissionsTable: React.FC = () => {
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handlePermissionSelection = (index: number) => {
    const updatedPermissions = [...selectedPermissions];
    if (updatedPermissions.includes(index)) {
      updatedPermissions.splice(updatedPermissions.indexOf(index), 1);
    } else {
      updatedPermissions.push(index);
    }
    setSelectedPermissions(updatedPermissions);
  };

  const handleGetSelectedPermissions = () => {
    const selected = selectedPermissions.map((index) => PERMISSIONS[index]);
    console.log("Selected Permissions: ", selected);
    // Do whatever you want with the selected permissions
  };

  return (
    <div className="overflow-x-auto bg-white border border-gray-300 rounded-xl m-8">
      <table className="table-auto w-full overflow-hidden">
        <tbody>
          {PERMISSIONS.map((perm, index) => (
            <tr key={index}>
              <td className="bg-white text-center text-gray-500 flex justify-between px-4 py-5">
                <div className="ml-14">{perm}</div>
                <div>
                  <input
                    type="checkbox"
                    className="form-checkbox bordr h-5 w-5 mx-14"
                    onChange={() => handlePermissionSelection(index)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <button
          onClick={handleGetSelectedPermissions}
          className="m-4 px-4 py-2 bg-purple-950 text-white rounded-md hover:bg-black"
        >
          Mettre a jour les droits d'acces
        </button>
      </div>
    </div>
  );
};

export default PermissionsTable;
