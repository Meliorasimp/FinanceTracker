import dailyTransactionModel from "../model/dailytransactionmodel";

export const createDailyTransaction = async (req, res) => {
    const { date, totalexpense, totalincome, transactions } = req.body;
    const user = req.user._id;

    try {
        const newDailyTransaction = new dailyTransactionModel({
            date, totalexpense, totalincome, transactions, user
        });

        await newDailyTransaction.save();
        res.status(201).json({ newDailyTransaction });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
