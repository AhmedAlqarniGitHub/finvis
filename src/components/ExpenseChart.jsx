import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./style.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ data }) => {

  if (!data || data.length === 0) {
    return <div>No expense data available</div>;
  }

  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: [
          // ...colors
        ],
        borderColor: [
          // ...border colors
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} className="expense-chart" />;
};

export default ExpenseChart;
