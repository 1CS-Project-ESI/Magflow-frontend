"use client";
import React, { useState, useEffect } from "react";
import { Structure, Consumer } from "@/types";
import RootLayout from "../rootLayout";
import "tailwindcss/tailwind.css";
import getToken from "@/utils/getToken";
import Converter from "@/dateConverter";

const StatisRS: React.FC = () => {
  const [structures, setStructures] = useState<Structure[]>([]);
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null);

  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [selectedConsumerId, setSelectedConsumerId] = useState<string | null>(null);
  const [selectedConsumerName, setSelectedConsumerName] = useState<string | null>(null);

  const [dateDebut, setDateDebut] = useState<Date | undefined>();
  const [dateFin, setDateFin] = useState<Date | undefined>();

  const [topConsumers, setTopConsumers] = useState<{ productName: string; quantity: number }[]>([]);

  useEffect(() => {
    const fetchStructures = async () => {
      const accessToken = await getToken();
      try {
        const response = await fetch('http://localhost:4000/api/structures/allstructures', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Error fetching structures: ${data.message}`);
        }
        setStructures(data.structures);
      } catch (error) {
        console.error("Error fetching structures:", error);
      }
    };
    fetchStructures();
  }, []);

  useEffect(() => {
    if (selectedStructureId) {
      fetchStructureUsers(selectedStructureId);
    }
  }, [selectedStructureId]);

  const fetchStructureUsers = async (id: any) => {
    const accessToken = await getToken();
    try {
      const response = await fetch(`http://localhost:4000/api/structures/users/${id}`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        const extractedUsers = data.users.map((consumer: any) => ({
          user_id: consumer.user_id,
          name: consumer.name,
        }));
        setConsumers(extractedUsers);
      } else {
        console.error("Failed to fetch users:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "dateDebut") {
      setDateDebut(value ? new Date(value) : undefined);
    } else if (name === "dateFin") {
      setDateFin(value ? new Date(value) : undefined);
    }
  };

  const handleConsumerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedConsumerId = e.target.value;
    const selectedConsumer = consumers.find(
      (consumer) => consumer.user_id?.toString() === selectedConsumerId
    );
    setSelectedConsumerId(selectedConsumerId);
    setSelectedConsumerName(selectedConsumer ? selectedConsumer.name : null);
  };

  const formatDate = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}-${day}-${year}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = await getToken();

    try {
      let url = "";
      let requestOptions: any = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }
      };

      if (selectedStructureId && !selectedConsumerId && !dateDebut && !dateFin) {
        url = `http://localhost:4000/api/statistics/mostconsumableproductsbystructure/${selectedStructureId}`;
        requestOptions.method = 'GET';
      } else if (selectedStructureId && selectedConsumerId && !dateDebut && !dateFin) {
        url = `http://localhost:4000/api/statistics/mostconsumableproductsbyuser/${selectedConsumerId}`;
        requestOptions.method = 'GET';
      } else if (selectedStructureId && dateDebut && dateFin && !selectedConsumerId) {
        url = `http://localhost:4000/api/statistics/mostconsumableproductsbystructurebydate/${selectedStructureId}`;
        requestOptions.method = 'GET';
        requestOptions.body = JSON.stringify({ startDate: formatDate(dateDebut), endDate: formatDate(dateFin) });
      } else if (selectedStructureId && selectedConsumerId && dateDebut && dateFin) {
        url = `http://localhost:4000/api/statistics/mostconsumableproductsbyuserBydate/${selectedConsumerId}`;
        requestOptions.method = 'POST';
        requestOptions.body = JSON.stringify({ startDate: formatDate(dateDebut), endDate: formatDate(dateFin) });
      }

      console.log("Fetching URL:", url);
      console.log("Request Options:", requestOptions);

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const data = await response.json();
        console.log("API Response Data:", data);
        if (data.data || data.topNProducts) {
          const topConsumers = (data.data || data.topNProducts).map((item: any) => ({
            productName: item.productName || item.name || item.productname,
            quantity: parseInt(item.total_served_quantity || item.total_quantity || item.totalquantity || item.total_quantity_consumed, 10),
          }));
          setTopConsumers(topConsumers);
        } else {
          setTopConsumers([]);
        }
      } else {
        console.error("Failed to fetch top consumers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching top consumers:", error);
    }
  };

  return (
    <RootLayout>
      <div className="">
        <div className="text-4xl text-[#2C2D41] font-bold m-8">
          Statistiques Consommateurs
        </div>
        <div className="bg-white rounded-md p-4 m-8 grid grid-cols-1">
          <h1 className="text-3xl mx-8">
            Filtrer les resultats (produits) :
          </h1>
          <div className="text-lg w-full mx-8 mt-4 mb-2">
            Séléctionner une structure ou un consommateur :
          </div>
          <div className="flex justify-center w-full">
            <div className="flex items-center w-2/3 mx-8 mb-4">
              <div className="flex-1 mr-4">
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={selectedStructureId || ""}
                  onChange={(e) => {
                    setSelectedStructureId(e.target.value);
                    setSelectedConsumerId(null);
                  }}
                >
                  <option value="">Structure</option>
                  {structures.map((structure) => (
                    <option key={structure.id} value={structure.id?.toString()}>
                      {structure.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 mr-4">
                <select
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={selectedConsumerId || ""}
                  onChange={handleConsumerChange}
                  disabled={!selectedStructureId}
                >
                  <option value="">Consommateur</option>
                  {consumers.map((consumer) => (
                    <option key={consumer.user_id} value={consumer.user_id?.toString()}>
                      {consumer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="text-lg mx-8 mt-4 mb-2">
            Séléctionner les dates de debut et fin :
          </div>
          <div className="flex justify-center w-full">
            <div className="flex items-center w-2/3 mx-8 mb-4">
              <div className="flex-1 mr-4">
                <input
                  type="date"
                  id="dateDebut"
                  name="dateDebut"
                  placeholder="Date Debut"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={dateDebut ? dateDebut.toISOString().split("T")[0] : ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-1 mr-4">
                <input
                  type="date"
                  id="dateFin"
                  name="dateFin"
                  placeholder="Date Fin"
                  className="border border-gray-300 rounded-md p-2 w-full"
                  value={dateFin ? dateFin.toISOString().split("T")[0] : ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-purple-950 hover:bg-black text-white py-2 px-4 rounded m-8 focus:outline-none focus:shadow-outline w-1/3"
              onClick={handleSubmit}
            >
              Appliquer
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md p-4 m-8 grid grid-cols-4 gap-4">
          <div className="col-span-4">
            <div className="text-lg mb-2">
              Les produits les plus consommés pour la structure : <b>{selectedStructureId ? structures.find(s => s.id?.toString() === selectedStructureId)?.name : ""}</b>, consommateur : <b>{selectedConsumerName ? selectedConsumerName : ""}</b>
              <br />
              Du : <b><Converter date={dateDebut} /></b> Au : <b><Converter date={dateFin} /></b>
            </div>
            <div className="border border-purple-950 rounded-lg m-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {topConsumers.map((consumer, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {consumer.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {consumer.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
};

export default StatisRS;
