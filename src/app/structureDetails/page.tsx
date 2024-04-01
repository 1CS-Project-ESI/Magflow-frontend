"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { User } from "@/types";

import StructureUserTable from "@/components/tables/structureUsersTable";

const StructureDetailsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/users/AllUsers");
      if (response.ok) {
        const data = await response.json();

        const extractedUsers = data.users.map((user: any) => ({
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isActive: user.isactive,
          role: user.role,
        }));
        setUsers(extractedUsers);
        setFilteredUsers(extractedUsers);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Structure : <span className="font-bold">Name</span>
        </div>
        <div className="text-xl mb-4 ">
          Responsable : <span className="font-bold">Name</span>
        </div>
        <div className="text-xl mb-4">Comptes :</div>
        <StructureUserTable users={filteredUsers} />
      </div>
    </RootLayout>
  );
};

export default StructureDetailsPage;
