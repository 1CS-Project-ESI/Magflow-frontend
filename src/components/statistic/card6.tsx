import React from 'react';

interface ConsumerData {
  name: string;
  orders: number;
}

const consumersData: ConsumerData[] = [
  { name: 'Stylo', orders: 22 },
  { name: 'cahier', orders: 22 },
  { name: 'Javel', orders: 21 },
  { name: 'feutre', orders: 19 },
  { name: 'papiers', orders: 12 },
  { name: 'livres', orders: 11 },
  { name: 'crayon', orders: 7 },
  
];

const ConsumersPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md order border-gray-800 p-6 w-[360px]" >
  <h2 className="text-lg font-bold mb-4">Les produits les plus consommés</h2>
  <ul className="list-decimal list-inside">
    {consumersData.map((consumer, index) => (
      <li key={index} className="mb-2 flex justify-between">
        <span className="mr-2"> {consumer.name}</span> 
        <span>{consumer.orders}</span>
      </li>
    ))}
  </ul>
</div>

  
  );
};
export default ConsumersPage;