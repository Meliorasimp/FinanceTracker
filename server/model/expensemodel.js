import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    expensename: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    expenseDate: {  
        type: Date,
    }
});

const expensemodel = mongoose.model('Expense', expenseSchema);  // Updated 'expense' to 'Expense' for model naming consistency

export default expensemodel;
