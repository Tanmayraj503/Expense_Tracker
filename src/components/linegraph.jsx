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

const LineChart = () => {
  // 1. Define X-axis labels
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // 2. Configure dataset and line styles
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Expense (₹)',
        data: [0, 0, 0, 6121, 6600, 6356, 6667, 0, 7845],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3, // Adds a slight curve to the line
        fill: false,   // Fills the area under the line
      },
    ],
  };

  // 3. Customize behavior and scales
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Monthly Expense of user`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
