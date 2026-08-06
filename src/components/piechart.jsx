import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function Piechart({ medical, transport, food, drinks, others }) {
  const data = {
    labels: ['Medical', 'Transport', 'Food', 'Drinks', 'Others'],
    datasets: [
      {
        label: 'Expense (₹)',
        data: [10, 15, 30, 5, 23],
        backgroundColor: [
          'rgba(59,130,246,0.85)',
          'rgba(16,185,129,0.85)',
          'rgba(245,158,11,0.85)',
          'rgba(139,92,246,0.85)',
          'rgba(239,68,68,0.85)',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 10,
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
    <div style={{
      maxWidth: '420px',
      margin: '0 auto',
      padding: '24px',
      background: '#ffffff',
      border: '0.5px solid #e2e8f0',
      borderRadius: '16px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 500, margin: 0, color: '#1e293b' }}>
          Q3 Department Expenses
        </h3>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
          Live resource tracking overview
        </p>
      </div>

      {/* Fixed pixel height — critical for maintainAspectRatio: false */}
      <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}