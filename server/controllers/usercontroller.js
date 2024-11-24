import userModel from '../model/usermodel.js';
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const existinguser = await userModel.findOne({ email });
        if (existinguser) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ name, email, password: hashedpassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid Info!' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email } , process.env.JWT_TOKEN_SECRET);
        res.status(200).json({ message: 'User logged in successfully', user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
