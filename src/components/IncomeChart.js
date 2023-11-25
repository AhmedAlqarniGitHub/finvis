import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './style.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [{
      label: 'Income',
      data: data.map(item => item.value),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: data.map(item => item.label),
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={chartData} options={options} className="income-chart"/>;
};

export default IncomeChart;
