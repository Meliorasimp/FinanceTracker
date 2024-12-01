import React from 'react'
import Calendar from 'react-calendar';
import { useExpenseStore, useIncomeStore } from '../store';
import '../index.css';
import '../overflow.css';
import { formatDate } from 'react-calendar/dist/esm/shared/dateFormatter.js';


const Analytics = () => {
  const [selectedDay, setSelectedDay] = React.useState(null);

  const handleClickDay = (value) => {
    setSelectedDay(value);
    console.log('Today is: ', value);
  }
  return (
    <div className='p-20 overflow-page'>
      <div className='p-4 overflow-page flex justify-between h-5/6'>
      <h1>{selectedDay && (<h1 className='text-4xl text-glow'> {selectedDay.toDateString()} </h1>)}</h1>
      <Calendar 
        next2AriaLabel='Jump Forwards'
        onClickDay={handleClickDay}
        />
      </div>
    </div>
  )
}

export default Analytics
