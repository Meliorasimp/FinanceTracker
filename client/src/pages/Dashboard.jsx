import React, { useEffect } from 'react';
import { truncateText, CalculateTotalExpense, CalculateTotalIncome, calculateNetIncome, CalculateHousingCategory, CalculateFoodCategory, CalculateTransportationCategory, CalculateSavingCategory } from '../Services/MainService';
import ReactPaginate from 'react-paginate';
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
import { Plus, ChartArea, HandCoins, LogOut } from 'lucide-react';


function Navbar() {

  const [isVisible, setIsVisible] = React.useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [isEditmodalVisible, setIsEditModalVisible] = React.useState(false);
  const [isAddIncomeVisible, setIsAddIncomeVisible] = React.useState(false);
  const [userdata, setUserData] = React.useState(null);
  const [selectedExpenseId, setSelectedExpenseId] = React.useState(null);
  const [selectedExpenseName, setSelectedExpenseName] = React.useState(null);
    const { expenses, setExpense, deleteAllExpenses } = useExpenseStore();
  const { setIncome, incomes } = useIncomeStore();
  const [currentPage, setCurrentPage] = React.useState(1);

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  console.log('Hours:', hours);
  console.log('Minutes:', minutes);
  console.log('Seconds:', seconds);
  const daytoday = date.getDate();

  const totalExpenses = CalculateTotalExpense(expenses);
  const totalIncome = CalculateTotalIncome(incomes);
  const totalNetIncome = calculateNetIncome(totalIncome, totalExpenses);
  const totalhousingandutilities = CalculateHousingCategory(expenses);
  const totalfoodandgroceries = CalculateFoodCategory(expenses);
  const totaltransportation = CalculateTransportationCategory(expenses);
  const totalsavings = CalculateSavingCategory(expenses);

  const recurringTransactionFilter = expenses.filter((item) => item.category === 'Recurring Transactions');
  const recentTransactionFilter = expenses.filter((item) => item.category !== 'Recurring Transactions');

  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  const currentItems = recentTransactionFilter.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(recentTransactionFilter.length / itemsPerPage);

  const handleAddIncomeClick = () => {
    setIsAddIncomeVisible(!isAddIncomeVisible);
  }

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  }

  const handleExpenseclick = () => {
    setIsVisible(!isVisible);
  }

  const handleDeleteModalClick = (id, name) => {
    setIsDeleteModalVisible(!isDeleteModalVisible);
    setSelectedExpenseId(id);
    setSelectedExpenseName(name)
  }

  const handleEditModalClick = (id) => {
    setIsEditModalVisible(!isEditmodalVisible);
    setSelectedExpenseId(id);
  }

  const ConvertToPHDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', timezone: 'Asia/Manila' };
    return new Date(date).toLocaleDateString('en-PH', options);
  }

  const dataToAnalytics = async () => {
    if (hours === 0 && minutes === 0 && seconds === 0) {

      const user = { _id: "674c7e81b8fd3d75546c527e", 
                      name: "Reika Kalseki", 
                      email: "reikakalseki@gmail.com" };
      try {
            const response = await axios.post('http://localhost:3000/analytics', {
                date: date,
                totalexpense: totalExpenses,
                totalincome: totalNetIncome,
                totalhousingexpenses: totalhousingandutilities,
                totaltranspoexpenses: totaltransportation,
                totalfoodexpenses: totalfoodandgroceries,
                totalsavingsexpenses: totalsavings,
                user: user._id
            });

            if (response.status === 201) {

              localStorage.setItem('remainingIncome', totalNetIncome);

              const respo = await axios.delete(`http://localhost:3000/dashboard/expense/all/${user._id}`); 
              const respo2 = await axios.delete(`http://localhost:3000/dashboard/income/all/${user._id}`);
              console.log('Deleted data:', respo.data);
              console.log('Deleted data:', respo2.data);
              deleteAllExpenses();
          } else {
              console.error('Unexpected response status:', response.status);
          }
      } catch (error) {
          console.error('Error sending analytics data:', error);
      }
    }
  };

  useEffect(() => { 
  
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard/expense');
        setExpense(response.data);
      }
      catch (error) {
        console.error('Error:', error);
      }
    }

    const fetchIncomeData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard/income');
        console.log('Hours:', hours);
        console.log('Day:', daytoday);
        setIncome(response.data.income);
      }
      catch (error) {
        console.error('Error:', error);
      }
    }

    const fetchUserData = async () => {
      try {
        const userdata = localStorage.getItem('userinfo'); 
        if (userdata) { 
        setUserData(JSON.parse(userdata)); 
        console.log('User data:', JSON.parse(userdata));
       }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
    fetchExpenses();
    fetchIncomeData();
    dataToAnalytics();
  }, []); 


  return (
    <div className='bg-gray-800 overflow-page'>
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
                
              <li className="mb-4 flex flex-row">
                <a className=" py-2 px-2 rounded hover:bg-slate-600 text-yellow-300 cursor-pointer flex flex-row items-center gap-2" onClick={handleExpenseclick}> <Plus size={36} />Add Expense</a>
                {isVisible && <Expense onClose={handleExpenseclick} onSubmit={() => {
                  handleExpenseclick();
                }}/>}
                
              </li>
              <li className="mb-4">
                <a href="/analytics" className="py-2 px-2 rounded hover:bg-slate-600 text-yellow-300 flex flex-row gap-2 items-center"><ChartArea size={36}/>Full Analytics</a>
              </li>
              <li className="mb-4">
                <a onClick={handleAddIncomeClick} className="py-2 px-2 rounded hover:bg-slate-600 text-yellow-300 cursor-pointer flex flex-row items-center gap-2"><HandCoins size={36} />Add Income</a>
                {
                  isAddIncomeVisible && <Income onCancel={handleAddIncomeClick} />
                }
              </li>
              <li className="mb-4">
                <a className="py-2 px-2 rounded hover:bg-slate-600 text-yellow-300 flex flex-row gap-2 items-center"><LogOut size={32} />Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
      <div className="grid grid-cols-12 grid-rows-12 gap-4 ml-44 w-full h-screen"> 
        <div className="bg-gradient-to-br from-gray-600 to-gray-700 mt-20 p-2 rounded shadow-2xl row-start-1 row-span-7 col-start-1 col-span-5 border-4 border-transparent hover:border-green-600">
            <h1 className='text-left text-base p-0 m-0 box-border'>Expenses Made by Category</h1>
            <div className='flex justify-center items-center h-full w-full'>
            <DataSets />  
          </div>
        </div> 
        <div className="xl:bg-gradient-to-br from-gray-600 to-gray-700 p-2 pt-2 rounded shadow-xl row-start-8 row-span-9 col-start-1 col-span-5 mb-2 border-4 border-transparent hover:border-green-600 relative sm:text-xs">
          <div className='flex justify-between'>
           <h1 className='text-left text-base p-0 m-0 box-border'>Income and Expense</h1>
           <h1 className='text-left text-base font-bold p-0 m-0 box-border text-yellow-400'>{ConvertToPHDate(date)}</h1>
           </div>
           <div className='flex justify-center items-center h-full w-full'>
            <DataSetsTwo />
           </div>
        </div> 
        <div className='bg-gradient-to-br from-gray-600 to-gray-700 p-2 pt-2 rounded shadow-xl row-start-1 row-span-7 col-start-6 col-span-6 mr-16 mt-20 border-4 border-transparent hover:border-green-600 relative sm:text-xs'>
            <h1 className='text-left text-base p-0 m-0 box-border'>Recent Transactions</h1>
            <div className='flex justify-between items-center p-2'></div>
            <ul>
              {recentTransactionFilter.map((item) => (
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
            <div className="flex justify-center mt-4">
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'page-link text-gray-500 hover:text-blue-500'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={itemsPerPage}
            onPageChange={handlePageClick}
            containerClassName={'pagination flex justify-center items-center gap-2 text-base rounded-lg -mt-2'}  
            subContainerClassName={'text-white'}
            activeClassName={'active text-blue-100 font-bold'}
          />
          </div>
        </div>
        <div className='bg-gradient-to-br from-gray-600 to-gray-700 p-2 pt-2 rounded shadow-xl row-start-8 row-span-9 col-start-6 col-span-3 mb-2 border-4 border-transparent hover:border-blue-500'>
          <div className='flex flex-row justify-between'>
            <h1 className='text-left '>Monthy Expenses</h1>
            <h1 className='text-right'>Due Date</h1>
            </div>
            <ul>
              {recurringTransactionFilter.map((item) =>(
                <div key={item._id} className='flex group flex-row justify-between text-base border-b p-2 hover:bg-gray-900 hover:bg-opacity-50 relative'>
                  <li className='text-green-400 line-clamp-1'>{item.expensename}</li>
                  <li className='text-red-400'>{item.amount}</li>
                  <li>{ConvertToPHDate(item.expenseDate)}</li>
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
        <div className='bg-gradient-to-br from-green-600 to-green-700 p-2 pt-2 rounded shadow-xl row-start-8 row-span-9 col-start-9 col-span-3 mr-16 mb-2 border-4 border-transparent hover:border-red-500'>
        <h1 className="text-center font-bold">Saving and Debt Repayment</h1>
            {totalExpenses} <br />
            {totalNetIncome} <br />
            {totalsavings} <br />
            {totalhousingandutilities} <br />
            {totalfoodandgroceries} <br />
            {totaltransportation} <br />
        </div>
      </div>
    </div>
  );
}

export default Navbar;