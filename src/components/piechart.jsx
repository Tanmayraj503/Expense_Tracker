import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// 1. Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieChart() {
  // 2. Define your data mapping
  const data = {
    labels: ['Marketing', 'Development', 'Design', 'Operations', 'Legal'],
    datasets: [
      {
        label: 'Budget Allocation ($)',
        data:[10, 20, 30, 40],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',  // Tailwind blue-500
          'rgba(16, 185, 129, 0.8)',  // Tailwind emerald-500
          'rgba(245, 158, 11, 0.8)',  // Tailwind amber-500
          'rgba(139, 92, 246, 0.8)',  // Tailwind violet-500
          'rgba(239, 68, 68, 0.8)',   // Tailwind red-500
        ],
        borderColor: [
          '#ffffff', // White borders between slices
        ],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // 3. Define configuration options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows Tailwind utilities to control height completely
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            family: 'ui-sans-serif, system-ui, sans-serif', // Matches Tailwind default font
            size: 12,
          },
          boxWidth: 15,
          padding: 20,
        },
      },
    },
  };

  return (
    // 4. Styled layout container using Tailwind CSS
    <div className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 shadow-xl rounded-2xl max-w-md mx-auto">
      <div className="mb-4 text-center">
        <h3 className="text-lg font-bold text-slate-800">Q3 Department Expenses</h3>
        <p className="text-xs text-slate-400">Live resource tracking overview</p>
      </div>
      
      {/* Chart Canvas Wrapper - Controls size dynamically */}
      <div className="relative w-full h-64 sm:h-72">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
