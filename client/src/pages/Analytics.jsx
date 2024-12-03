import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getDaysInMonth } from '../Services/MainService';
import '../index.css';
import '../overflow.css';

const Analytics = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [daysInMonths, setDaysInMonths] = useState([]);
  const [dailyTransactions, setDailyTransactions] = useState([]);

  const date = new Date();
  const year = date.getFullYear();
  const userID = '674c7e81b8fd3d75546c527e'; // Replace with the actual user ID

  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  const monthStrings = months.map((item) => item.toLocaleString('default', { month: 'long' }));

  const fetchTransactions = async (date) => {
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0]; 
      const response = await axios.get(`http://localhost:3000/analytics/${userID}`);

      setDailyTransactions(response.data.dailyTransaction);
      console.log('Fetched Data:', response.data.dailyTransaction.date);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchTransactions(date);
  }, [userID]);

  useEffect(() => {
    if (selectedMonth !== null) {
      const days = getDaysInMonth(selectedMonth, year);
      setDaysInMonths(days);
    }
  }, [selectedMonth, year]);

  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex);
  };

    const handleDayClick = (day) => {
      const selected = new Date(year, selectedMonth, day);
      const formattedDate = selected.toISOString().split('T')[0];
      setSelectedDate(formattedDate);
      const date = new Date(formattedDate);
      console.log('Selected Date:', date);
    };

  return (
    <div className='bg-gray-800 h-screen box-border m-0 p-0'>
      <nav className='bg-gray-700 fixed h-screen w-48 mt-10'>
        <div className='flex flex-col justify-center h-full'>
          <h1 className='text-3xl font-bold text-center'>{year}</h1>
          {monthStrings.map((item, index) => (
            <div key={index}>
              <p
                className={`text-left pl-6 pt-3 pb-3 cursor-pointer ${index === selectedMonth ? 'bg-gray-600' : 'hover:bg-gray-600'}`}
                onClick={() => handleMonthClick(index)}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </nav>
      <div className='ml-48 flex flex-row'>
        <div className='p-4 w-4/6 h-screen'>
          {selectedMonth !== null && (
            <div>
              <h2 className='text-2xl font-bold'>{monthStrings[selectedMonth]}</h2>
              <div className='grid grid-cols-7 mt-4'>
                {daysInMonths.map((day, index) => (
                  <div
                    key={index}
                    className='text-center border border-gray-500 h-28 hover:bg-gray-600 cursor-pointer'
                    onClick={() => handleDayClick(index + 2)}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className='mt-16'>
          
        </div>
      </div>
    </div>
  );
};

export default Analytics;
