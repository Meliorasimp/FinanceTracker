import mongoose from 'mongoose';
import dailyTransactionModel from "../model/dailytransactionmodel.js";
import expenseModel from "../model/expensemodel.js";
import incomeModel from "../model/incomemodel.js";

export const createDailyTransaction = async (req, res) => {
    const { date, totalexpense, totalincome, totalhousingexpenses, totaltranspoexpenses, totalfoodexpenses, totalsavingsexpenses, user } = req.body;

    if (!date || !user) {
        return res.status(400).json({ message: 'Date and user are required fields.' });
    }

    if (typeof totalexpense !== 'number' || typeof totalincome !== 'number') {
        return res.status(400).json({ message: 'Total expense and total income must be numbers.' });
    }

    if (!mongoose.Types.ObjectId.isValid(user)) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    try {
        const userId = new mongoose.Types.ObjectId(user); // Convert user to ObjectId
        const dailyTransaction = new dailyTransactionModel({
            date,
            totalexpense,
            totalincome,
            totalhousingexpenses,
            totaltranspoexpenses,
            totalfoodexpenses,
            totalsavingsexpenses,
            user: userId,
        });

        await dailyTransaction.save();

        res.status(201).json({
            message: 'Daily transaction created successfully.',
            dailyTransaction,
        });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
};

export const deleteAllTransaction = async (req, res) => {
const userID = req.params.id;

    try {
        const result = await expenseModel.deleteMany({ user: userID });
        res.status(200).json({ message: 'All transactions deleted successfully.', result });
    }
    catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

export const deleteAllIncomes = async (req, res) => {
    const userID = req.params.id;

        try {
            const result = await incomeModel.deleteMany({ user: userID, type: 'income' });
            res.status(200).json({ message: 'All incomes deleted successfully.', result });
        }
        catch (error) {
            res.status(500).json({ message: `Server error: ${error.message}` });
        }
    }


export const getDailyTransaction = async (req, res) => {
    const userID = req.params.id;

    try {
        const dailyTransaction = await dailyTransactionModel.find({ user: userID });
        res.status(200).json({ dailyTransaction });
    } catch (error) {
        res.status(500).json({ message: `Server error: ${error.message}` });
    }   
}