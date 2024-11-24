import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { useIncomeStore } from '../store';
import { SubtractExpenseFromIncome, CalculateTotalIncome } from '../Services/MainService';

const Income = ({ onCancel }) => {
    const [incomename, setIncomeName] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [source, setSource] = React.useState('');
    const { addIncome, incomes, setIncome, expenses } = useIncomeStore();

    const handleIncomeSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/dashboard/income', {
                incomename,
                amount: parseFloat(amount),
                source
            });

            if (response.status === 201) {
                setIncomeName('');
                setAmount('');
                setSource('');
                onCancel();

                const totalIncome = CalculateTotalIncome(incomes);
                const totalNetIncome = SubtractExpenseFromIncome(totalIncome, expenses);

                if (totalNetIncome.length > 0) {
                    // Update the amount for only the last item in the array
                    totalNetIncome[totalNetIncome.length - 1].amount += response.data.newincome.amount;
                } else {
                    addIncome(response.data.newincome);
                }
            }
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    const addIncomeModal = (
        <div className="fixed inset-0 bg-opacity-60 bg-gray-900 flex justify-center items-center">
            <div className="flex flex-col bg-gradient-to-br from-gray-700 to-gray-800 w-1/3 h-2/4 justify-center items-center rounded-lg px-4">
                <h1 className="text-3xl text-center mb-5">Add Income </h1>
                <div className="flex justify-center items-center">
                    <form className="flex flex-col gap-4" onSubmit={handleIncomeSubmit}>
                        <input
                            type="text"
                            value={incomename}
                            placeholder="Income Name"
                            className="block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            onChange={(e) => setIncomeName(e.target.value)}
                        />
                        <input
                            type="text"
                            value={source}
                            placeholder="Income Source such as Salary, Business, etc."
                            className="block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            onChange={(e) => setSource(e.target.value)}
                        />
                        <input
                            type="number"
                            value={amount}
                            placeholder="Income Amount not Exceeding 1000000"
                            className="block border-2 border-gray-300 p-2 w-80 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <div className="flex justify-center items-center gap-20 pt-7">
                            <button className="px-10 py-2 bg-green-400 rounded-lg hover:bg-green-500" type="submit">Submit</button>
                            <button className="px-10 py-2 bg-red-400 rounded-lg hover:bg-red-500" onClick={onCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(addIncomeModal, document.getElementById('addIncome-modal-root'));
};

export default Income;
