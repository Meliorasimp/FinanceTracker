import mongoose from "mongoose";

const dailyTransactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },

    totalexpense: {
        type: Number,
        required: true,
    },

    totalincome: {
        type: Number,
        required: true,
    },

    totalhousingexpenses: {
        type: Number,
        required: true,
    },

    totaltranspoexpenses: {
        type: Number,
        required: true,
    },

    totalfoodexpenses: {
        type: Number,
        required: true,
    },

    totalsavingsexpenses: {
        type: Number,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const dailyTransactionModel = new mongoose.model('DailyTransaction', dailyTransactionSchema);

export default dailyTransactionModel;