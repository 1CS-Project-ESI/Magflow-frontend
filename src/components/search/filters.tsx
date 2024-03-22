"use client";

import React, { useState } from 'react';

interface Props {
  onFilterChange: (filters: { [key: string]: boolean }) => void;
}

const Filters: React.FC<Props> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({
    isActive: false,
    role: false,
    // Add more filters as needed
  });

  const handleFilterChange = (filter: string, value: boolean) => {
    const updatedFilters = { ...filters, [filter]: value };
    setFilters(updatedFilters);
    if (filter !== 'apply') {
      onFilterChange(updatedFilters);
    } else {
      applyFilters(updatedFilters);
    }
  };

  const applyFilters = (filters: { [key: string]: boolean }) => {
    // Trigger the filtering action using the selected filters
    console.log('Applying filters:', filters);
  };

  return (
    <div>
      <select
        className="border border-gray-300 rounded px-2 py-1 mr-4"
        onChange={(e) => handleFilterChange(e.target.value, e.target.value === 'true')}
      >
        <option value="">Filter</option>
        <optgroup label="Activity :">
          <option value="isActive">Active</option>
          <option value="isInactive">Inactive</option>
        </optgroup>
        <optgroup label="Role :">
          <option value="isAdmin">Admin</option>
          <option value="isUser">User</option>
        </optgroup>
        {/* Add more filter groups and options as needed */}
      </select>
    </div>
  );
};

export default Filters;
