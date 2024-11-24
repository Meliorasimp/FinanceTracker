import { addExpense, getExpenses, deleteExpense, updateExpense } from "../controllers/expensecontroller.js";
import express from 'express';
const router = express.Router();

router.post('/', addExpense);
router.get('/', getExpenses);
router.delete('/:id', deleteExpense);
router.put('/:id', updateExpense);

export default router;