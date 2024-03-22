"use client";

import React from "react";
import { User } from "@/types";

import ModifButton from "./buttons/modifButton";
import SuppButton from "./buttons/suppButton";

interface Props {
  users: User[];
}

const UserTable: React.FC<Props> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-white text-zinc-400">
            <th className="px-4 py-4 font-light">Nom d'Utilisateur</th>
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
                  <ModifButton />
                </span>
                <SuppButton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
