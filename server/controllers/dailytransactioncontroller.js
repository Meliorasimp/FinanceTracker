
import dailyTransactionModel from "../model/dailytransactionmodel";

export const createDailyTransaction = async (req, res) => {
    const { date, totalexpense, totalincome, transactionType } = req.body;
    const user = req.body.user;

    try {
        const DailyTransaction = new dailyTransactionModel({
            date,
            totalexpense,
            totalincome,
            transactionType,
            user,
        });

        await DailyTransaction.save();

        res.status(201).json(DailyTransaction);
    }

    catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getWeeklyExpenses = async (req, res) => {
    const user = req.body.user;
    today = new Date();
    const startOfWeek = getStartOfWeek(today);
    const endOfWeek = getEndOfWeek(today);

    try {
        const weeklyTransaction = await dailyTransactionModel.aggregate([
            { $match: {user: user, date: { $gte: startOfWeek, $lte: endOfWeek }}},
            { $match: {transactionType: { $in: ['Housing and Utilities']}}},
            { $group: {
                _id: '$transactionType',
                totalExpenses: { $sum: '$totalexpense' },
                totalRemainingIncome: { $sum: '$totalincome' }
            }},
            { $sort: { _id: 1 }}
        ])

        const result = weeklyTransaction.length > 0 ? weeklyTransaction : [{ _id: 'No Data', totalExpenses: 0, totalRemainingIncome: 0 }];
        res.status(200).json(result);
    }

    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.getDate(diff);
    start.getHours(0, 0, 0, 0);
    return start;
}

const getEndOfWeek = (date) => {
    const end = new Date(date);
    const day = end.getDay();
    const diff = end.getDate() + (7 - day);
    end.setDate(diff);
    end.setHours(23, 59, 59, 999);
    return end;
}