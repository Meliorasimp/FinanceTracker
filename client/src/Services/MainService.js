//Line Text Clamp Logic
export const truncateText = (text, maxLength) => {
    if(text.length > maxLength) {
      return text.substr(0, maxLength) + '...';
    }
    else {
      return text;
    }
  }

//Total Expense Calculation Logic and each of the 4 categories
export const CalculateTotalExpense = (expenses) => {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

export const CalculateTransportationCategory = (expenses) => {
  let TransportationTotal = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].category === 'Transportation') {
      TransportationTotal += expenses[i].amount;
    }
  }
  return TransportationTotal; 
}

export const CalculateHousingCategory = (expenses) => {
  let HousingTotal = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].category === 'Housing and Utilities') {
      HousingTotal += expenses[i].amount;
    }
  }
  return HousingTotal; 
}

export const CalculateFoodCategory = (expenses) => {
  let FoodTotal = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].category === 'Foods and Groceries') {
      FoodTotal += expenses[i].amount;
    }
  }
  return FoodTotal; 
}

export const CalculateSavingCategory = (expenses) => {
  let SavingTotal = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].category === 'Savings and Debt Repayment') {
      SavingTotal += expenses[i].amount;
    }
  }
  return SavingTotal; 
}

export const CalculateTotalIncome = (incomes) => {
  let total = 0;
  for (let i = 0; i < incomes.length; i++) {
    total += incomes[i].amount;
  }
  return total;
}

export const SubtractExpenseFromIncome = (totalIncome, expenses) => {
  const result = [];

  let previousValue = totalIncome;

  for (let i = 0; i < expenses.length; i++) {
    const currentValue = previousValue - expenses[i].amount;
    result.push(currentValue);
    previousValue = currentValue; 
  }

  return result;
};

export const ConvertToPHDate = (date = new Date()) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-PH', options);
};

