"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { User } from "@/types";

import StructureUserTable from "@/components/tables/structureUsersTable";
import getToken from "@/utils/getToken";

interface Responsable {
  firstname: string;
  lastname: string;
  email: string;
}

const StructureDetailsPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [responsable, setResponsable] = useState<Responsable | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);


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
  useEffect(() => {
    fetchUsers(id);
  }, []);

  const fetchUsers = async (id:any) => {
    const accessToken = await getToken();
    try {
      const response = await fetch(`http://localhost:4000/api/structures/users/${id}`,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
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

  useEffect(() => {
    fetchResponsable(id);
  }, []);

  const fetchResponsable = async (id:any) => {
    const accessToken = await getToken();
    try {
      const response = await fetch(`http://localhost:4000/api/structures/responsable/${id}`,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const responsableData = await response.json();
        const { firstname, lastname, email } = responsableData?.responsables?.[0] || {};
         setResponsable({ firstname, lastname, email }); 
    } else {
      }
    } catch (error) {
      console.error("Error fetching responsable:", error);
    }
  };


  



  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Structure : <span className="font-bold">Name</span>
        </div>
        <div className="text-xl mb-4">
            Responsable :{" "}
            <span className="font-bold">
            {responsable?.firstname} {responsable?.lastname} ({responsable?.email})
            
            </span>
          </div>
        <div className="text-xl mb-4">Users  :</div>
        <StructureUserTable users={filteredUsers} />
      </div>
    </RootLayout>
  );
};


export default StructureDetailsPage;
