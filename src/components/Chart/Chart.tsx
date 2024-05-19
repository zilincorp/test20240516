import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

type Props = {
  statistics: StatisticItem[];
};

type StatisticItem = {
  date: Date;
  clicks: number;
  conversions: number;
  amount: number;
};

export const Chart: React.FC<Props> = ({ statistics }) => {
  const labels = statistics?.map(
    (item) =>
      `${new Date(item.date).getDate()}/${new Date(item.date).getMonth() + 1}`,
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Клики",
        data: statistics.map((item) => item.clicks),
        borderColor: "#E127FF",
        backgroundColor: "#E127FF",
      },
      {
        label: "Конверсии",
        data: statistics.map((item) => item.conversions),
        borderColor: "#5D43FF",
        backgroundColor: "#5D43FF",
      },
      {
        label: "К выплате",
        data: statistics.map((item) => item.amount),
        borderColor: "#28D8FF",
        backgroundColor: "#28D8FF",
      },
    ],
  };

  const tooltipCallbacks = (context: any) => {
    const dataIndex = context.dataIndex;
    const datasetIndex = context.datasetIndex;
    const monthData = labels?.[dataIndex];
    if (!monthData) return;
    let topText = "";
    if (datasetIndex === 0) {
      topText = `конверсии: ${data.datasets[0].data[dataIndex]}`;
    } else if (datasetIndex === 1) {
      topText = `клики: ${data.datasets[1].data[dataIndex]}`;
    } else if (datasetIndex === 2) {
      topText = `к выплате (RUB): ${data.datasets[2].data[dataIndex]}`;
    }
    return [topText];
  };

  const options = {
    scales: {
      y: {
        ticks: {
          color: "#A7A7A7",
          font: {
            size: 12,
            weight: "500",
            family: "Inter",
          },
        },
        grid: {
          display: true,
        },
      },
      x: {
        ticks: {
          color: "#A7A7A7",
          font: {
            size: 12,
            weight: "500",
            family: "Inter",
          },
        },
        grid: {
          display: true,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    intersect: false,
    responsive: true,
    tension: 0.2,
    borderWidth: 3,
    pointBorderWidth: 1,
    pointRadius: 1,
    plugins: {
      tooltip: {
        displayColors: true,
        boxWidth: 5,
        boxHeight: 5,
        usePointStyle: true,
        intersect: false,
        backgroundColor: "#fff",
        titleColor: "#000",
        titleFont: {
          size: 14,
          weight: "600",
          family: "Inter, sans-serif",
        },
        bodyColor: "#000000",
        bodyFont: {
          size: 12,
          weight: "400",
          family: "Inter, sans-serif",
        },
        callbacks: {
          label: tooltipCallbacks,
        },
      },
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 5,
          boxHeight: 5,
          color: "#A7A7A7",
          usePointStyle: true,
          padding: 31,
          pointStyle: "circle",
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};
