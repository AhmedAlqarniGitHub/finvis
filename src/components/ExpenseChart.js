import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.category),
    datasets: [{
      data: data.map(item => item.amount),
      backgroundColor: [
        // ...colors
      ],
      borderColor: [
        // ...border colors
      ],
      borderWidth: 1,
    }],
  };

  return <Pie data={chartData} />;
};

export default ExpenseChart;
