import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useExpenseStore } from '../store';
import { useIncomeStore } from '../store';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  const [data, setData] = useState({ datasets: [], labels: [] });
  const { expenses } = useExpenseStore();
  const { income } = useIncomeStore();

  useEffect(() => {

    const labels = expenses.map((_, index) => `item-${index + 1}`);
    const dataset1 = expenses.map(expense => expense.amount);
    console.log("dataset1", dataset1);
    const dataset2 = income => income.map(income => income.amount);

    setData({
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: dataset1,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: 'Dataset 2',
          data: dataset2,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
          },
          color: 'black',
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            // Show the label in the tooltip
            return tooltipItems[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'X Axis Title',
          color: 'black',
          font: {
            size: 16,
            family: 'Arial',
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.2)',
        },
        ticks: {
          color: 'black',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Y Axis Title',
          color: 'black',
          font: {
            size: 16,
            family: 'Arial',
          },
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.2)',
        },
        ticks: {
          color: 'black',
          callback: function(value, index, values) {
            return '$' + value;
          },
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-lg h-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineChart;