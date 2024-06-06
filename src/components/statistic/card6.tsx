import React from "react";

interface TopProduct {
  name: string;
  totalQuantity: number;
}

interface Card6Props {
  topProducts: TopProduct[];
}

const Card6: React.FC<Card6Props> = ({ topProducts }) => {
  return (
    <div className="bg-white rounded-lg order border border-purple-950 p-6">
      <h2 className="text-lg flex justify-center w-full font-bold mb-4">
        Les produits les plus consommés
      </h2>
      <ul className="list-decimal list-inside">
        {topProducts.map((product, index) => (
          <li key={index} className="mb-2 flex justify-between">
            <span className="mr-2">{product.name}</span>
            <span>{product.totalQuantity}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Card6;
