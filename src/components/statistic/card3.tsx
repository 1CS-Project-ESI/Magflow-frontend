import React from 'react';

interface ConsumerData {
  name: string;
  orders: number;
}

const consumersData: ConsumerData[] = [
  { name: 'Lebaili wael', orders: 22 },
  { name: 'Malki khey', orders: 22 },
  { name: 'Baiche Asmaa', orders: 21 },
  { name: 'Chef houyem', orders: 19 },
  { name: 'Assil chiikh', orders: 12 },
  { name: 'Fatima zahra', orders: 11 },
  { name: 'Benso', orders: 7 },
  { name: 'krimouu', orders: 5 },
  { name: 'fadi-yacine', orders: 2 },
  { name: 'aced sahbi', orders: 2 },
  { name: 'faudhil l9irch', orders: 0 },
  { name: 'nassim color', orders: 0 },
];

const ConsumersPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md order border-gray-800 p-6 w-[360px]" >
  <h2 className="text-lg font-bold mb-4">Les consommateurs qui commandent le plus</h2>
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