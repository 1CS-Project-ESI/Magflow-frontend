// components/tables/usersTable.tsx
"use client";

import React from "react";
import Link from "next/link";
import { User } from "@/types";
import SupprimerButton from "@/components/buttons/suppButton"; //

interface Props {
  users: User[];
  onDelete: (email: string) => void; // Add onDelete prop
}

const UserTable: React.FC<Props> = ({ users, onDelete }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom d_Utilisateur</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Email</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Etat</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Role</th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
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
                {user.isActive ? "Active" : "Non Active"}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {user.role}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 md:table-cell flex items-center justify-center">
                <span className="mr-3">
                  {/* Pass onDelete function to SupprimerButton */}
                  <SupprimerButton email={user.email} onDelete={onDelete} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
