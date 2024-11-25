import React, { useEffect } from 'react'
import { X, PhilippinePeso } from 'lucide-react';
import ReactDOM from 'react-dom';
import { useExpenseStore } from '../store';
import axios from 'axios';

const Update = ({ onConfirm, onCancel, isVisible, id, name}) => {
    const { expenses, updateExpense } = useExpenseStore();

    const [expensename, setExpenseName] = React.useState('');
    const [category, setCategory] = React.useState('Housing and Utilities');
    const [amount, setAmount] = React.useState('');
    
    useEffect(() => {
        const expense = expenses.find((expense) => expense._id === id);
        if (expense) {
            setExpenseName(expense.expensename);
            setCategory(expense.category);
            setAmount(expense.amount);
        }

    }, [isVisible, id, expenses]);
    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/dashboard/expense/${id}`, {
                expensename,
                amount,
                category
            });
            console.log('Updated data:', response.data);
            console.log('Updated data:', id);

            if(response.status === 200) {

                const updatedExpense = {
                    _id: id,
                    expensename,
                    amount,
                    category,
                    createdAt: new Date().toISOString()
                }

                updateExpense(id, updatedExpense);
                onCancel();
            }
        }
       catch (error) {
           console.error('Error:', error);
       }
    }

  const UpdateModal =  (
    <div className='flex flex-col justify-center items-center fixed inset-0 bg-opacity-60 bg-gray-900 z-10  '>
    <div className='bg-gradient-to-br from-gray-700 to-gray-800 px-20 py-10 rounded-lg flex flex-col gap-10 justify-center relative z-10'>
      <h1 className='text-center text-2xl flex items-center gap-2'>Edit this transaction?</h1>
      <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
        <input 
          type="text" 
          className='block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
          placeholder='Name of your Expense'
          value={expensename}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <label htmlFor="category" className='text-white text-lg'>Select an Expense Category</label>
        <select 
          name="category" 
          id="category" 
          className='block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Housing and Utilities">Housing and Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Foods and Groceries">Foods and Groceries</option>
          <option value="Savings and Debt Repayment">Savings and Debt Repayment</option>
          <option value="Recurring Transactions">Recurring Transactions</option>
        </select>
        <input 
          type="number" 
          className='block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent'
          placeholder='Amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
          <button className='bg-green-400 py-2 rounded-lg hover:bg-green-500 shadow-md cursor-pointer'>Submit</button>
      </form>
      <button onClick={onCancel} className='absolute top-5 right-5'>
        <X className='bg-red-400 rounded-full hover:bg-red-500 p-1 w-7 h-7 shadow-md' />
      </button>
    </div>  
  </div>
  );

  return ReactDOM.createPortal(UpdateModal, document.getElementById('update-modal-root'));
}

export default Update
