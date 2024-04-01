"use client";

import React, { useState } from "react";
import { User } from "@/types";

interface Props {
  users: User[];
}

const StructureUserTable: React.FC<Props> = ({ users }) => {
  const [userStatuses, setUserStatuses] = useState<{ [email: string]: string }>(
    {}
  );

  const handleDeactivate = async (email: string) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/deactivateAccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        console.log("email deactivated succes");
        window.location.href = `/`; // its not woking
        setUserStatuses((prevStatuses) => ({
          ...prevStatuses,
          [email]: "inactive",
        }));
      } else {
        console.error("Error deactivating account:", response.statusText);
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  };

  // Function to handle activate request
  const handleActivate = async (email: string) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/users/activateaccount",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        window.location.href = "roles/";
        console.log("email activated succes");
        setUserStatuses((prevStatuses) => ({
          ...prevStatuses,
          [email]: "active",
        }));
      } else {
        console.error("Error activating account:", response.statusText);
      }
    } catch (error) {
      console.error("Error activating account:", error);
    }
  };

  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom d'Utilisateur</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Email</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="border-t bg-white text-center px-4 py-4">
                {user.firstname} {user.lastname}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {user.email}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {user.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StructureUserTable;
