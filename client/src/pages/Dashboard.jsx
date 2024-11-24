import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faBowlFood, faSave } from '@fortawesome/free-solid-svg-icons';
import { truncateText, CalculateTransportationCategory } from '../Services/MainService';
import '../bg-backgroundimage.css'; 
import '../overflow.css';
import Expense from '../components/Expense';
import { useExpenseStore, useIncomeStore } from '../store';
import axios from 'axios';
import Delete from '../components/Delete';
import Update from '../components/Update';
import DataSets from '../components/DataSets';
import Income from '../components/Income';
import DataSetsTwo from '../components/DataSetsTwo';
import { PhilippinePeso } from 'lucide-react';



function Navbar() {

  const [isVisible, setIsVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [isEditmodalVisible, setIsEditModalVisible] = React.useState(false);
  const [isAddIncomeVisible, setIsAddIncomeVisible] = React.useState(false);
  const [userdata, setUserData] = React.useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = React.useState(null);
  const [selectedExpenseName, setSelectedExpenseName] = React.useState(null);
  const { expenses, setExpense, deleteExpense } = useExpenseStore();
  const { setIncome } = useIncomeStore();

  const handleAddIncomeClick = () => {
    setIsAddIncomeVisible(!isAddIncomeVisible);
  }

  const handleExpenseclick = () => {
    setIsVisible(!isVisible);
  }

  const handleDeleteModalClick = (id, name) => {
    console.log('Delete modal clicked:', id);
    console.log('Expense Name clicked:', name);
    setIsDeleteModalVisible(!isDeleteModalVisible);
    setSelectedExpenseId(id);
    setSelectedExpenseName(name)
  }

  const handleEditModalClick = (id, name, amount, category) => {
    console.log('Edit modal clicked:', id);
    console.log('Expense Info:', name, amount, category);
    setIsEditModalVisible(!isEditmodalVisible);
    setSelectedExpenseId(id);
  }

  const ConvertToPHDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', timezone: 'Asia/Manila' };
    return new Date(date).toLocaleDateString('en-PH', options);
  }

  useEffect(() => { 
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard/expense');
        setExpense(response.data);
        console.log('Expenses:', response.data);
      }
      catch (error) {
        console.error('Error:', error);
      }
    }

    const fetchIncomeData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard/income');
        console.log('Income:', response.data.income);
        setIncome(response.data.income);
      }
      catch (error) {
        console.error('Error:', error);
      }
    }

    const fetchUserData = async () => {
      try {
        const userdata = localStorage.getItem('userinfo'); 
        console.log("Retrieved Data:", userdata);
        if (userdata) { 
        setUserData(JSON.parse(userdata)); 
       }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchUserData();
    fetchExpenses();
    fetchIncomeData();
  }, [setExpense]); 


  return (
    <div className='bg-gradient-to-br from-gray-900 to-gray-800 overflow-page'>
      <aside>
        <nav className="fixed bg-slate-700 text-white max-h-screen w-40 top-20 p-4">
          <div className="flex flex-col items-center justify-between p-30">
            <div className="h-20 w-20 mb-4">
              <img src="/images/gehleeace.jpg" alt="Profile" className="object-cover h-full w-full rounded-full"/>
            </div>
            <div className="text-center mb-8">
              {userdata ? <h1 className="text-lg font-bold text-green-500">{userdata.name}</h1> : <h1 className="text-lg font-bold">Loading username...</h1>}
            </div>
            <ul className="w-full">
                
              <li className="mb-4">
                <a className="block py-2 px-2 rounded hover:bg-slate-600 text-yellow-300 cursor-pointer" onClick={handleExpenseclick}>Add Expense</a>
                {isVisible && <Expense onClose={handleExpenseclick} onSubmit={() => {
                  handleExpenseclick();
                }}/>}
              </li>
              <li className="mb-4">
                <a href="/" className="block py-2 px-2 rounded hover:bg-slate-600 text-yellow-300">Allocate Budget</a>
              </li>
              <li className="mb-4">
                <a onClick={handleAddIncomeClick} className="block py-2 px-2 rounded hover:bg-slate-600 text-yellow-300 cursor-pointer">Add Income</a>
                {
                  isAddIncomeVisible && <Income onCancel={handleAddIncomeClick} />
                }
              </li>
              <li className="mb-4">
                <a href="/logout" className="block py-2 px-2 rounded hover:bg-slate-600 text-yellow-300">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <div className="grid grid-cols-12 grid-rows-12 gap-4 ml-44 w-full h-screen"> 
        <div className="bg-gradient-to-br from-gray-600 to-gray-700 mt-20 p-2 rounded shadow-2xl row-start-1 row-span-7 col-start-1 col-span-5 border-4 border-transparent hover:border-green-600">
            <h1 className='text-xl font-bold'>Expenses Made by Category</h1>
            <div className='flex justify-center items-center h-full w-full'>
            <DataSets />  
          </div>
        </div> 
        <div className="xl:bg-gradient-to-br from-gray-600 to-gray-700 p-2 pt-2 rounded shadow-xl row-start-8 row-span-9 col-start-1 col-span-5 mb-2 border-4 border-transparent hover:border-green-600 relative sm:text-xs">
           <h1 className='text-xl font-bold'>Income and Expense</h1>
           <div className='flex justify-center items-center h-full w-full'>
            <DataSetsTwo />
           </div>
        </div> 
        <div className='bg-gradient-to-br from-gray-600 to-gray-700 p-2 pt-2 rounded shadow-xl row-start-1 row-span-7 col-start-6 col-span-6 mr-16 mt-20 border-4 border-transparent hover:border-purple-500'>
            <h1 className='text-center font-bold text-xl'>Recent Transactions</h1>
            <div className='flex justify-between items-center p-2'></div>
            <ul>
              {expenses.map((item) => (
                <div key={item._id} className='flex group flex-row justify-between text-base border-b p-2 hover:bg-gray-900 hover:bg-opacity-50 relative'>
                  <li className='text-green-400 line-clamp-1' >{truncateText(item.expensename, 15)}</li>
                    <li className='text-red-400 '>-{item.amount}</li>
                  <li>{truncateText(item.category, 15)}</li>
                  <li className='font-extralight'>{ConvertToPHDate(item.createdAt)}</li>
                  <div className='absolute hidden group-hover:flex items-center justify-end top-0 right-10 left-0 bottom-0 bg-gradient-to-r from-gray-500 to-gray-600 w-full h-full pr-5 gap-10'>
                    <button className='rounded-sm bg-red-600 px-10 py-1 hover:bg-red-700' onClick={() => handleDeleteModalClick(item._id, item.expensename)}>Delete</button>
                    {isDeleteModalVisible && <Delete 
                    isVisible={isDeleteModalVisible} 
                    onCancel={() => setIsDeleteModalVisible(false)}
                    id={selectedExpenseId}
                    name={selectedExpenseName}
                    />}
                    <button className='rounded-sm bg-green-600 px-10 py-1 hover:bg-green-700' onClick={() => handleEditModalClick(item._id, item.expensename, item.amount, item.category)}>Edit</button>
                    {isEditmodalVisible && 
                    <Update 
                    onCancel={() => setIsEditModalVisible(false)}
                    id={selectedExpenseId}
                    name={selectedExpenseName}
                    />}
                  </div>
                </div>
              ))}
            </ul>
        </div>
        <div className='bg-gradient-to-br from-orange-600 to-orange-700 p-2 pt-2 rounded shadow-xl row-start-8 row-span-9 col-start-6 col-span-3 mb-2 border-4 border-transparent hover:border-blue-500'>
            <h1 className='text-center font-bold'><FontAwesomeIcon icon={faBowlFood } className='mr-2' />Foods and Groceries</h1>
        </div>
        <div className='bg-gradient-to-br from-green-600 to-green-700 p-2 pt-2 rounded shadow-xl row-start-8 row-span-9 col-start-9 col-span-3 mr-16 mb-2 border-4 border-transparent hover:border-red-500'>
            <h1 className='text-center font-bold'><FontAwesomeIcon icon={ faSave } className='mr-2' />Saving and Debt Repayment</h1>
        </div>
      </div>
    </div>
  );
}

export default Navbar;