import express from 'express';
const router = express.Router();
import { createDailyTransaction } from '../controllers/dailytransactioncontroller.js';

// Importing the controller

router.post('/', createDailyTransaction);

export default router;