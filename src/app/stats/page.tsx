"use client";
import React, { useState, useEffect } from "react";
import RootLayout from "../rootLayout";
import Card1 from "@/components/statistic/card1";
import CommandGraph from "@/components/statistic/commandGraph";
import Card2 from "@/components/statistic/card2";

const Page = () => {
  const [percentage, setPercentage] = useState(0);
  const [count, setCount] = useState(0);
  const [product, setProduct] = useState({
    name: "",
    total_quantity_consumed: 0,
  });
  const [percentage1, setPercentage1] = useState(0);
  const [count1, setCount1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);
  const [count2, setCount2] = useState(0);
  const [commandCounts, setCommandCounts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const user_id = localStorage.getItem("id");
    try {
      const response3 = await fetch(
        `http://localhost:4000/api/statistics/mostconsumableproductsbyuser/${user_id}`
      );
      const data3 = await response3.json();
      setProduct(data3.topNProducts[0]);

      const response = await fetch(
        `http://localhost:4000/api/statistics/getusercommandcounts/${user_id}`
      );
      const data = await response.json();
      setCount(data.validation_3_count);
      setCount1(data.validation_1_2_count + data.validation_0_count);

      setPercentage(
        (data.validation_3_count * 100) /
          (data.validation_3_count +
            data.validation_1_2_count +
            data.validation_0_count)
      );
      setPercentage1(
        ((data.validation_1_2_count + data.validation_0_count) * 100) /
          (data.validation_3_count +
            data.validation_1_2_count +
            data.validation_0_count)
      );
      console.log(data.validation_3_count);
      console.log(data.validation_1_2_count + data.validation_0_count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <RootLayout>
      <div className="bg-white border border-gray-300 grid grid-cols-1 p-8 m-8 rounded-md">
        <div className="flex justify-between space-x-4">
          <Card1
            title="le produit le plus consommable dans le stock"
            subtitle={product.name}
            count={product.total_quantity_consumed}
          />
          <Card2
            title="Nombre de commandes validee"
            percentage={percentage}
            count={count}
            color="#32D584"
          />
          <Card2
            title="Nombre de commandes en attente"
            percentage={percentage1}
            count={count1}
            color="#EDE87F"
          />
        </div>
        <CommandGraph commandCounts={commandCounts} />
      </div>
    </RootLayout>
  );
};

export default Page;
