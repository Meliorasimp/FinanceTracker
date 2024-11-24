import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  CalculateTransportationCategory,
  CalculateHousingCategory,
  CalculateSavingCategory,
  CalculateFoodCategory,
} from '../Services/MainService';
import { useExpenseStore } from '../store';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const { expenses } = useExpenseStore();
  const [data, setData] = useState({ datasets: [], labels: [] });

  useEffect(() => {

    if (!Array.isArray(expenses) || !expenses.length) {
      console.warn('No expenses to display in the chart.');
      setData({ datasets: [], labels: [] });
      return;
    }

    const transportation = CalculateTransportationCategory(expenses);
    const housing = CalculateHousingCategory(expenses);
    const savings = CalculateSavingCategory(expenses);
    const food = CalculateFoodCategory(expenses);

    setData({
      labels: [
        'Transportation',
        'Foods and Groceries',
        'Housing and Utilities',
        'Savings and Debts',
      ],
      datasets: [
        {
          label: 'Expenses',
          data: [transportation, food, housing, savings],
          backgroundColor: [
            'rgba(255, 0, 0, 1)',
            'rgba(0, 255, 255, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(255, 0, 255, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
        },
      ],
    });
  }, [expenses]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          font: {
            size: 14,
            family: 'Arial',
          },
          color: 'white',
          padding: 20,
          boxWidth: 20,
          boxHeight: 20,
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center items-center p-4">
      {data.datasets.length > 0 ? (
        <div
          className="aspect-square"
          style={{
            width: '90%', 
            maxWidth: '380px', 
            maxHeight: '380px',
            minWidth: '250px', 
            minHeight: '250px',
          }}
        >
          <Doughnut data={data} options={options} />
        </div>
      ) : (
        <div className="text-white text-center">No data available to display</div>
      )}
    </div>
  );
};

export default DoughnutChart; 
