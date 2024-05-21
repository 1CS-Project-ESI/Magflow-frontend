

"use client";

import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import { User , Consumer } from "@/types";

import StructureUserTable from "@/components/tables/structureUsersTable";
import getToken from "@/utils/getToken";

interface Responsable {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}




const StructureDetailsPage: React.FC = () => {
  const [consumers, setConsumer] = useState<Consumer[]>([]);
  const [responsable, setResponsable] = useState<Responsable | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const idString = url.searchParams.get("id");
    let parsedId: number | null = null;

    console.log("Full URL:", window.location.href);

    if (idString !== null) {
      parsedId = parseInt(idString, 10);
    }

    setId(parsedId);
  }, []);

  useEffect(() => {
    if (id !== null) {
      fetchUsers(id);
      fetchResponsable(id);
    } else {
      console.log("id parameter is missing from the URL");
    }
  }, [id]);

  const fetchUsers = async (id: any) => {
    const accessToken = await getToken();

    try {
      const response = await fetch(
        `http://localhost:4000/api/structures/users/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched users data:", data);

        const extractedUsers = data.users.map((consumers: any) => ({
          user_id: consumers.user_id,
          matricule: consumers.matricule,
        }));
        
        console.log("this is extraced user ",extractedUsers);
        setConsumer(extractedUsers);
        setFilteredUsers(extractedUsers);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchResponsable = async (id: any) => {
    const accessToken = await getToken();

    try {
      const response = await fetch(
        `http://localhost:4000/api/structures/responsable/${id}`,
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const responsableData = await response.json();
        console.log("Fetched responsable data:", responsableData);

        // Add your mapping logic here after inspecting the data structure
      } else {
        console.error("Failed to fetch responsable:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching responsable:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border text-[#2c2d41] border-gray-300 grid grid-cols-1 p-6 mb-4 mx-8 mt-8 rounded-md">
        <div className="text-xl mb-4">
          Structure : <span className="font-bold">Name</span>
        </div>
        <div className="text-xl mb-4">
          Responsable :{" "}
          <span className="font-bold">
            {responsable?.firstname} {responsable?.lastname} ({responsable?.email})
          </span>
        </div>
        <div className="text-xl mb-4">Users :</div>
        <StructureUserTable consumers={consumers} />
      </div>
    </RootLayout>
  );
};

export default StructureDetailsPage;

