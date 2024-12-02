import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import { useExpenseStore, useIncomeStore } from '../store';
import { getDaysInMonth } from '../Services/MainService';
import '../index.css';
import '../overflow.css';

const Analytics = () => {
  const [selectedMonth, setSelectedMonth] = React.useState(null);
  const [daysInMonths, setDaysInMonths] = React.useState([]);
  
  const date = new Date();
  const year = date.getFullYear();

  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  const monthStrings = months.map((item) => item.toLocaleString('default', { month: 'long' }));

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
    console.log('Day clicked:', day); // Debugging: Log day clicked
  }

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
                <div key={index} className='text-center border border-gray-500 h-28 hover:bg-gray-600 cursor-pointer' onClick={() => handleDayClick(index + 1)}>
                  {day.getDate()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className='mt-16'>
        <h1 className='text-xl font-bold'>Total Expenses Made:</h1>
        <h1 className='text-xl font-bold'>Remaining Income:</h1>
        <h1 className='text-xl font-bold'>Total Expenses per Category:</h1>
        <h1 className='text-xl font-bold'>Gross Income:</h1>
      </div>
      </div>
    </div>
  );
};

export default Analytics;
