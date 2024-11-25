import React from 'react';
import ReactDom from 'react-dom';
import { X, PhilippinePeso } from 'lucide-react'; 
import axios from 'axios';
import { useExpenseStore } from '../store';

const ExpenseModal = ({ onClose }) => {
  const [expensename, setExpenseName] = React.useState('');
  const [category, setCategory] = React.useState('Housing and Utilities');
  const [amount, setAmount] = React.useState('');
  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [isRecurring, setIsRecurring] = React.useState(false);
  const { addExpense } = useExpenseStore();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    if(e.target.value === 'Recurring Transactions') {
      setIsRecurring(true);
    } else {
      setIsRecurring(false);
    }
  }

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting expense...');
      const response = await axios.post('http://localhost:3000/dashboard/expense', 
        { 
          expensename: expensename, 
          category: category, 
          amount: amount ,
          expenseDate: isRecurring ? date : new Date(),
        },{
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const newexpensedata = response.data.newexpense;
      if(response.status === 201) {
        console.log('New Expense:', newexpensedata);
        addExpense(newexpensedata);
        setExpenseName('');
        setCategory('Housing and Utilities');
        setAmount('');
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const ModalContent = (
    <div className='flex flex-col justify-center items-center fixed inset-0 bg-opacity-60 bg-gray-900 z-10'>
      <div className='bg-gradient-to-br from-gray-700 to-gray-800 px-20 py-10 rounded-lg flex flex-col gap-10 justify-center relative z-10'>
        <h1 className='text-center text-4xl flex items-center gap-2'>Add an Expense<PhilippinePeso size={32} /></h1>
        <form className='flex flex-col gap-4' onSubmit={handleExpenseSubmit}>
          <input 
            type="text" 
            className='block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
            placeholder='Name of your Expense'
            value={expensename}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
          <label htmlFor="category" className='text-white text-lg'>Select an Expense Category</label>
          <select 
            name="category" 
            id="category" 
            className='block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option value="Housing and Utilities">Housing and Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Foods and Groceries">Foods and Groceries</option>
            <option value="Savings and Debt Repayment">Savings and Debt Repayment</option>
            <option value="Recurring Transactions">Recurring Transaction</option>
          </select>
          {isRecurring && (
            <input 
              type="date" 
              className='block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          )}
          <input 
            type="number" 
            className='block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
            placeholder='Amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <button type="submit" className='bg-green-400 py-2 rounded-lg hover:bg-green-500 shadow-md cursor-pointer'>Submit</button>
        </form>
        <button onClick={onClose} className='absolute top-5 right-5'>
          <X className='bg-red-400 rounded-full hover:bg-red-500 p-1 w-7 h-7 shadow-md' />
        </button>
      </div>  
    </div>
  );

  return ReactDom.createPortal(ModalContent, document.getElementById('root'));
}

export default ExpenseModal;