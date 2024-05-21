"use client";
import React from 'react';
import RootLayout from '../rootLayout';
import Card from '../../components/statistic/card1'; 
import Card2 from '../../components/statistic/card2';
import Card3 from '../../components/statistic/card3';
import Card4 from '../../components/statistic/card4';
import 'tailwindcss/tailwind.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartData {
  labels: string[];  //les X : month names 
  datasets: { label: string; data: number[]; fill: boolean; backgroundColor: string; borderColor: string }[];
}


const StatisRS: React.FC = () => {
    const data: LineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May','june', 'juillet','Aout','Sep','Oct','Nov','Dec'],
        datasets: [
          {
            label: 'Commandes', 
            data: [20, 40, 60, 80, 100,20,100,60], //les Y: commandes number
            fill: false,
            backgroundColor: '#007bff',
            borderColor: '#4285F4',
          },
        ],
      };
    
      const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Nombre de demandes par mois',
            color: 'black',
          },
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    return (
        <RootLayout>
            <div className="bg-white rounded-md w-full h-full p-4 flex justify-between">
                <div className="w-1/4 p-2">
                <Card title="le produit le plus consommable dans le stock"
            subtitle="papier"
            count={3} />
                </div>
                <div className="w-1/4 p-2">
                <Card2 title="Nombre de commandes dans la strcuture"
            count={212} />
                </div>
                <div className="w-1/4 p-2">
      <Card4
        title="Nombre de commandes traités"
        count={123}
        color="blue"
        percentage={25}
      />
    
                </div>
                <div className="w-1/4 p-2">
                <Card4
        title="Nombre de commandes non traitee"
        count={2}
        color="red"
        percentage={1}
      />
                </div>
            </div>
            <div className="bg-white rounded-md w-full h-full p-2 flex justify-between">
              <div className=" p-2 w-[40%]">
                 <Card3></Card3>
              </div>
             <div className=' p-2 w-[60%] pt-10'>
           <Line data={data} options={options} />
            </div>
            </div> 
        </RootLayout>
    );
};

export default StatisRS;
