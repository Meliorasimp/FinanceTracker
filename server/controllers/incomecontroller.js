import incomemodel from "../model/incomemodel.js";

export const addIncome = async (req, res) => {
    const { incomename, source, amount } = req.body;

    try {
        if (!incomename || !source || !amount) {
            return res.status(400).json({ message: 'Please fill in all fields.' });
        }

        if (amount > 1000000) {
            return res.status(400).json({ message: 'Amount is too high.' });
        }

        const newincome = new incomemodel({ incomename, source, amount });
        await newincome.save();
        res.status(201).json({ message: 'Income added successfully.', newincome });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getIncome = async (req, res) => {
    try {
        const income = await incomemodel.find({});
        res.status(200).json({ message: 'Data Successfully Retrieved', income });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};