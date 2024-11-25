import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useExpenseStore } from '../store';
import { useIncomeStore } from '../store';
import { SubtractExpenseFromIncome, CalculateTotalIncome } from '../Services/MainService';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  const [data, setData] = useState({ datasets: [], labels: [] });
  const { expenses } = useExpenseStore();
  const { incomes } = useIncomeStore();

  useEffect(() => {
    
   
    const totalincome = CalculateTotalIncome(incomes);
    const recentTransactionFilter = expenses.filter((item) => item.category !== 'Recurring Transactions');
    const totalnetincome = SubtractExpenseFromIncome(totalincome, recentTransactionFilter);

    console.log('mydata:' ,recentTransactionFilter);
    const labels = recentTransactionFilter.map((_, index) => `item-${index + 1}`);
    const dataset1 = recentTransactionFilter.map(expense => expense.amount);
    const dataset2 = totalnetincome;
    
    setData({
      labels,
      datasets: [
        {
          label: 'Expenses',
          data: dataset1,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)',
          fill: true,
        },
        {
          label: 'Net Income',
          data: dataset2,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          fill: true,
        },
      ],
    });
  }, [expenses, incomes]);

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
          color: 'white',
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          color: 'lightgreen',
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
          color: 'lightgreen',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount',
          color: 'lightgreen',
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
          color: 'white',
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