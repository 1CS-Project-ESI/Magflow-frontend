"use client";

import React, { useState } from "react";
import { useRouter } from 'next/router'; 
import  useLocation  from 'next/router'; 
import getToken from "@/utils/getToken";


interface Permission {
  id: number;
  name: string;
}

interface PermissionsTableProps {
  permissions: Permission[];
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions = [] }) => {

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
    const selected = selectedPermissions.map((index) => permissions[index]);
    console.log("Selected Permissions: ", selected);
    // Do whatever you want with the selected permissions
  };
 

  const handleUpdatePermissions = async () => {
    const accessToken = await getToken();
    try {

      // var url = new URL(window.location.href);
      // var idString = url.searchParams.get('id');
      // var id = parseInt(idString, 10); // Convert the string to an integer
      //   if (id) {
      //     console.log(`Role ID extracted from the URL: ${id}`);
      //   } else {
      //     console.log('Role ID not found in the URL');
      //   }
        const url = new URL(window.location.href);
        const idString = url.searchParams.get('id');

        let id: number | null = null;

        if (idString !== null) {
          id = parseInt(idString, 10);
          // or id = +idString; // Using the unary plus operator
        }

        // Now you can safely use the `id` variable, but handle the case where it's null
        if (id !== null) {
          // Call your API with the `id` value
          // ...
        } else {
          // Handle the case where the `id` parameter is missing from the URL
          console.log('id parameter is missing from the URL');
        }


        ///
        const selectedPermissionNames = selectedPermissions.map(index => permissions[index].name);
        console.log("this is selectedPermissionNames) content ");
        console.log(selectedPermissionNames)
        // const body = JSON.stringify({
        //   permissions: selectedPermissionNames
        // });
        // console.log(body);
      
      const response = await fetch(`http://localhost:4000/api/roles/update/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body :JSON.stringify({
          "permissions": selectedPermissionNames
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update role permissions');
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error updating role permissions:', error);
    }
  };




  return (
    <div className="overflow-x-auto bg-white border border-gray-300 rounded-xl m-8">
      <table className="table-auto w-full overflow-hidden">

      <tbody>
      {permissions.map((permission, index) => (
        <tr key={permission.id}> 
          <td className="bg-white text-center text-gray-500 flex justify-between px-4 py-5">
            <div className="ml-14">{permission.name}</div>
            <div>
              <input type="checkbox" 
              className="form-checkbox bordr h-5 w-5 mx-14" 
              onChange={() => handlePermissionSelection(index)} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
   </table>

        
      <div className="text-center">
        <button
          onClick={handleUpdatePermissions}
          className="m-4 px-4 py-2 bg-purple-950 text-white rounded-md hover:bg-black"
        >
          Mettre a jour les droits d'acces
        </button>
      </div>

    </div>
  );
};

export default PermissionsTable;
