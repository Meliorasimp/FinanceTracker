import { mongoose } from 'mongoose';
import expensemodel from '../model/expensemodel.js';
export const addExpense = async (req, res) => {
    const { expensename, category, amount, expenseDate } = req.body;

    try {
        if(!expensename || !amount) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        if(amount > 100000) {
            return res.status(400).json({ message: 'Amount is too high.' });
        }

        const newexpense = new expensemodel({ expensename, category, amount, expenseDate: expenseDate || new Date() });
        await newexpense.save();
        res.status(201).json({ message: 'Expense added successfully.', newexpense });
    }
    catch(error) {  
        console.log('Error:', error);
    }
}

export const getExpenses = async (req, res) => {
    
    try {
        const expenses = await expensemodel.find();
        res.status(200).json(expenses);
    }
    catch(error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteExpense = async (req, res) => {
    const { id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid ID' });
        }
        
        const expenses = await expensemodel.findByIdAndDelete(new mongoose.Types.ObjectId(id));
        if(!expenses) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        
        
        res.status(200).json({ message: 'Expense deleted successfully' });
    }
    catch(error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
}

export const updateExpense = async (req, res) => {
    const { id } = req.params
    const { expensename, category, amount } = req.body;

    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Invalid ID' });

        }
        if(!expensename || !amount) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        const updateExpense = await expensemodel.findByIdAndUpdate(id, { expensename, category, amount }, { new: true });

        if(!updateExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense updated successfully', updateExpense });
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
}