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
    }
});

const expensemodel = new mongoose.model('expense', expenseSchema);

export default expensemodel;