import { addIncome, getIncome } from "../controllers/incomecontroller.js";
import { deleteAllIncomes } from "../controllers/dailytransactioncontroller.js";
import express from "express";
const router = express.Router();

router.post('/', addIncome);
router.get('/', getIncome);
router.delete('/all/:id', deleteAllIncomes);

export default router;