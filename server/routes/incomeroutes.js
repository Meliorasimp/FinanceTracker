import { addIncome, getIncome } from "../controllers/incomecontroller.js";
import express from "express";
const router = express.Router();

router.post('/', addIncome);
router.get('/', getIncome);

export default router;