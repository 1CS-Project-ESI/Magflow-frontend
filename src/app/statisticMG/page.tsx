// "use client";
// import React, { useState, useEffect } from "react";
// import RootLayout from "../rootLayout";
// import Card from "../../components/statistic/card1";
// import Card6 from "../../components/statistic/card6";
// import Card4 from "../../components/statistic/card4";
// import Card5 from "../../components/statistic/card5";
// import "tailwindcss/tailwind.css";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface LineChartData {
//   labels: string[]; //les X : month names
//   datasets: {
//     label: string;
//     data: number[];
//     fill: boolean;
//     backgroundColor: string;
//     borderColor: string;
//   }[];
// }

// const StatisRS: React.FC = () => {
//   const [total_value, settotal_value] = useState<string>("");
//   const [count, setCount] = useState(0);
//   const [product, setProduct] = useState({
//     name: "",
//     total_quantity_consumed: 0,
//   });
//   const [percentage1, setPercentage1] = useState(0);
//   const [count1, setCount1] = useState(0);
//   const [percentage2, setPercentage2] = useState(0);
//   const [count2, setCount2] = useState(0);
//   const [commandCounts, setCommandCounts] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const user_id = localStorage.getItem("id");
//     try {
//       const response3 = await fetch(
//         `http://localhost:4000/api/statistics/stockvalue`
//       );
//       const data3 = await response3.json();
//       settotal_value(data3.totalStockValue);
//       console.log(data3.totalStockValue);

//       const response = await fetch(
//         `http://localhost:4000/api/statistics/getusercommandcounts/${user_id}`
//       );
//       const data = await response.json();
//       setCount(data.validation_3_count);
//       setCount1(data.validation_1_2_count + data.validation_0_count);

//       /* setPercentage(
//         (data.validation_3_count * 100) /
//           (data.validation_3_count +
//             data.validation_1_2_count +
//             data.validation_0_count)
//       ); */
//       setPercentage1(
//         ((data.validation_1_2_count + data.validation_0_count) * 100) /
//           (data.validation_3_count +
//             data.validation_1_2_count +
//             data.validation_0_count)
//       );
//       console.log(data.validation_3_count);
//       console.log(data.validation_1_2_count + data.validation_0_count);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const data: LineChartData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "june",
//       "juillet",
//       "Aout",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Commandes",
//         data: [20, 40, 60, 80, 100, 50, 50, 60, 10, 10], //les Y: commandes number
//         fill: false,
//         backgroundColor: "#007bff",
//         borderColor: "#4285F4",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       title: {
//         display: true,
//         text: "Nombre de demandes par mois",
//         color: "black",
//       },
//       legend: {
//         display: true,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <RootLayout>
//       <div className="bg-white rounded-md w-full h-full p-4 flex justify-between">
//         <div className="w-1/4 p-2">
//           <Card5 title="La valeur totale de stock " count={total_value} />
//         </div>
//         <div className="w-1/4 p-2">
//           <Card
//             title="le produit le plus consommable dans le stock"
//             subtitle="papier"
//             count={3}
//           />
//         </div>
//         <div className="w-1/4 p-2">
//           <Card4
//             title="Nombre de commandes traités"
//             count={123}
//             color="red"
//             percentage={40}
//           />
//         </div>
//         <div className="w-1/4 p-2">
//           <Card4
//             title="Nombre de commandes non traitee"
//             count={2}
//             color="black"
//             percentage={80}
//           />
//         </div>
//       </div>
//       <div className="bg-white rounded-md w-full h-full p-2 flex justify-between">
//         <div className=" p-2 w-[40%]">
//           <Card6></Card6>
//         </div>
//         <div className=" p-2 w-[60%] pt-10">
//           <Line data={data} options={options} />
//         </div>
//       </div>
//     </RootLayout>
//   );
// };

// export default StatisRS;
