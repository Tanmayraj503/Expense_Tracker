import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useMemo } from 'react';

// Register the required Chart.js modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = ({ selectedMonth = 'July', expenseData = [0, 0, 0, 6121, 6600, 6356, 6667, 0, 0, 0, 0, 0] }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const data = useMemo(() => ({
    labels: months,
    datasets: [
      {
        label: `${selectedMonth} Expense (₹)`,
        data: expenseData,              // ✅ must have exactly 12 values
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: false,
        spanGaps: true,                 // ✅ connects line across null/missing values
        pointRadius: 5,                 // ✅ makes all points visible including zeros
        pointHoverRadius: 7,
      },
    ],
  }), [selectedMonth, expenseData]);

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,             // ✅ ensures 0 values are visible on the line
      },
    },
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
  };

    return (
        <div style={{ width: '600px', margin: '0 auto' }}>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChart;
