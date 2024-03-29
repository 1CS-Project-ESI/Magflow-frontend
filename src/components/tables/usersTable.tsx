// components/tables/usersTable.tsx
"use client";

// UserTable.tsx
import React from "react";
import { User } from "@/types";
import UpdateButton from "../buttons/updateUser";
import SupprimerButton from "../buttons/suppButton";

interface Props {
  users: User[];
  onDelete: (email: string) => void;
}

const UserTable: React.FC<Props> = ({ users, onDelete }) => {
  return (
    <div className="overflow-x-auto border border-gray-300 rounded-xl">
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom d'Utilisateur</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Email</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Etat</th>
            <th className="px-4 py-2 font-light hidden md:table-cell">Role</th>
            <th className="px-4 py-2 font-light hidden md:table-cell"></th>
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
                <select name="activity" id="activity">
                  <option value="Active">
                    {user.isActive ? "Active" : "Non Active"}
                  </option>
                  <option value="Active">
                    {!user.isActive ? "Active" : "Non Active"}
                  </option>
                </select>
              </td>
              <td className="border-t bg-white text-center px-4 py-2 hidden md:table-cell">
                {user.role}
              </td>
              <td className="border-t bg-white text-center px-4 py-2 md:table-cell flex items-center justify-center">
                <span className="mr-3">
                  <UpdateButton user={user} showPopup={true} />
                </span>
                <SupprimerButton email={user.email} onDelete={onDelete} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
