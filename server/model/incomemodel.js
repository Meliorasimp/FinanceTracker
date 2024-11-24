import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    incomename: {
        type: String,
        required: true,
        trim: true
    },
    source: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    dateAt: {
        type: Date,
        default: Date.now
    }
})

const incomemodel = new mongoose.model('income', incomeSchema);
export default incomemodel;