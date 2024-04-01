// comptes/page.tsx
"use client";

import AjoutButton from "@/components/buttons/ajoutButton";
import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import UserTable from "@/components/tables/usersTable";
import SearchBar from "@/components/search/searchBar";
import { User } from "@/types";

const AccountsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: boolean;
  }>({
    isActive: false,
    role: false,
  });

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

  const handleSearch = (query: string) => {
    const filtered = users.filter(
      (user) =>
        user.firstname.toLowerCase().includes(query.toLowerCase()) ||
        user.lastname.toLowerCase().includes(query.toLowerCase())
    );
    applyFilters(filtered, activeFilters);
    setFilteredUsers(filtered);
  };

  const handleFilterChange = (filters: { [key: string]: boolean }) => {
    setActiveFilters(filters);
    applyFilters(users, filters);
  };

  const applyFilters = (users: User[], filters: { [key: string]: boolean }) => {
    let filtered = users;
    if (filters.isActive !== undefined) {
      filtered = filtered.filter((user) =>
        filters.isActive ? user.isActive : !user.isActive
      );
    }
    if (filters.role !== undefined) {
      filtered = filtered.filter((user) =>
        filters.role ? user.role === "Admin" : user.role !== "Admin"
      );
    }
    setFilteredUsers(filtered);
  };

  const handleDelete = async (email: string) => {
    try {
      const response = await fetch(`http://localhost:4000/api/users/${email}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedUsers = users.filter((user) => user.email !== email);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
      } else {
        console.error("Failed to delete user:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <RootLayout>
      <div className="flex justify-between">
        <div className="m-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="m-8">
          <AjoutButton showPopup={true} />
        </div>
      </div>
      <div className="m-8 mt-8">
        <UserTable users={filteredUsers} onDelete={handleDelete} />
      </div>
    </RootLayout>
  );
};

export default AccountsPage;
