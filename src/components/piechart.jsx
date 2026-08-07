import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Piechart({ Housing, Food, Transport, Health, Entertainment, Shopping, Utilities, Drinks, Others }) {
  const data = {
    labels: ['Housing', 'Food', 'Transport', 'Health', 'Entertainment', 'Shopping', 'Utilities', 'Drinks', 'Others'],
    datasets: [
      {
        label: 'Expense (₹)',
        data: [Housing, Food, Transport, Health, Entertainment, Shopping, Utilities, Drinks, Others],
        backgroundColor: [
          'rgb(230, 25, 75)',
          'rgb(60, 180, 75)',
          'rgb(255, 225, 25)',
          'rgb(67, 99, 216)',
          'rgb(245, 130, 49)',
          'rgb(145, 30, 180)',
          'rgb(66, 212, 244)',
          'rgb(240, 50, 230)',
          'rgb(191, 239, 69)',
        ],
        borderColor: '#221E1A',
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 12 }, boxWidth: 15, padding: 20 },
      },
    },
  };

  return (
    <div 
    className='dark:border-[#605448] dark:bg-[#221E1A] max-w-105 m-auto p-6 border-2 rounded-2xl'>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h3 className='text-black text-[18px] font-medium mb-1 dark:text-gray-300 '>
          Monthly Expenses
        </h3>
        {/* <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
          Live resource tracking overview
        </p> */}
      </div>

      <div>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}