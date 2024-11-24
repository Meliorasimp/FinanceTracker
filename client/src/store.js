// store.js
import { create } from 'zustand';

export const useExpenseStore = create((set) => ({
  expenses: [],  // Initialize the expenses state
  addExpense: (newExpense) => set((state) => ({
    expenses: [...state.expenses, newExpense],  // Adding a new expense
  })),
  setExpense: (expenses) => set({ expenses }),  // Set the expenses 
  deleteExpense: (id) => set((state) => ({
    expenses: state.expenses.filter((expense) => expense._id !== id),
  })),  // Update the expenses
  updateExpense: (id, updatedExpense) => set((state) => ({
    expenses: state.expenses.map((expense) => {
      if (expense._id === id) {
        return updatedExpense;
      }
      return expense;
    }),
  })), 
  filterbyCategory: (category) => set((state) => ({
    expenses: state.expenses.filter((expense) => expense.category === category),
  })),
}));

export const useIncomeStore = create((set) => ({
  incomes: [],  // Initialize the incomes state
  addIncome: (newIncome) => set((state) => ({
    incomes: [...state.incomes, newIncome],  // Adding a new income
  })),
  setIncome: (incomes) => set({ incomes }),  // Set the incomes
  deleteIncome: (id) => set((state) => ({
    incomes: state.incomes.filter((income) => income._id !== id),
  })),  // Update the incomes
  updateIncome: (id, updatedIncome) => set((state) => ({
    incomes: state.incomes.map((income) => {
      if (income._id === id) {
        return updatedIncome;
      }
      return income;
    }),
  })),
}));