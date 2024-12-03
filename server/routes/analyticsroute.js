import express from 'express';
const router = express.Router();
import { createDailyTransaction, getDailyTransaction } from '../controllers/dailytransactioncontroller.js';

// Importing the controller

router.post('/', createDailyTransaction);
router.get('/:id', getDailyTransaction);

export default router;