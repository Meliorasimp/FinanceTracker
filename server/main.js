import userrouter from './routes/userroutes.js';
import expenserouter from './routes/expenseroutes.js';
import incomerouter from './routes/incomeroutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/user', userrouter);
app.use('/dashboard/expense', expenserouter);
app.use('/dashboard/income', incomerouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
