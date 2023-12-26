import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const IncomeChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Income",
        data: data.map((item) => item.value),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Grid line color
        },
        ticks: {
          color: "white", // X-axis ticks color
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Grid line color
        },
        ticks: {
          color: "white", // Y-axis ticks color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Adjusts the legend text color for dark theme
        },
      },
      tooltip: {
        // You can customize tooltip styles if needed
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return <Bar data={chartData} options={options} className="income-chart" />;
};

export default IncomeChart;
