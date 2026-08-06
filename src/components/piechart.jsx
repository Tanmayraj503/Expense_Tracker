ChartJS.register(ArcElement, Tooltip, Legend, Title);
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';



export default function PieChart({ medical, transport, food, drinks, others }) {
  const data = {
    labels: ['Medical', 'Transport', 'Food', 'Drinks', 'Others'],
    datasets: [
      {
        label: 'Budget Allocation ($)',
        data: [medical, transport, food, drinks, others],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ← needs a fixed-height parent, handled below
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: 'ui-sans-serif, system-ui, sans-serif', size: 12 },
          boxWidth: 15,
          padding: 20,
        },
      },
    },
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px',
      background: '#fff',
      border: '1px solid #f1f5f9',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      borderRadius: '16px',
      maxWidth: '420px',
      margin: '0 auto 32px',
    }}>
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b', margin: 0 }}>
          Q3 Department Expenses
        </h3>
        <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0' }}>
          Live resource tracking overview
        </p>
      </div>

      {/* ✅ Fixed pixel height — this is what was missing */}
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}