"use client";

import React, { useState } from "react";

import UserTable from "@/components/tables/usersTable";
import Filters from "@/components/search/filters";
import SearchBar from "@/components/search/searchBar";
import { User } from "@/types";
import { USERS } from "@/constants";
import AjoutButton from "@/components/buttons/ajoutButton";

const AccountsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(USERS);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);

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
    console.log("Filtered Users:", filtered); // Add this line for logging
    setFilteredUsers(filtered);
  };

  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: boolean;
  }>({
    isActive: false,
    role: false,
    // Add more filters as needed
  });

  return (
    <>
      {/* <div className="flex ">
        <Filters onFilterChange={handleFilterChange} />
      </div> */}
      <div className="flex justify-between">
        <div className="m-8">
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="m-8">
          <AjoutButton showPopup={true} />
        </div>
      </div>
      <div className="m-8 mt-8">
        <UserTable users={filteredUsers} />
      </div>
    </>
  );
};

export default AccountsPage;
