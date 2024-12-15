"use client"

import { Line } from "react-chartjs-2"
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ data, options }) => {
  return (
    <Line data={data} options={options} />
  );
};

export default LineChart;