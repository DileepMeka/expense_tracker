import { createContext, useContext, useState, useEffect } from 'react';

const ExpenseContext = createContext({
  expenses: [],
  addExpense: () => {},
  removeExpense: () => {},
  updateExpense: () => {},
});
const getExpensesFromLocalStorage = () => {
  const storedExpenses = localStorage.getItem('expenses');
  return storedExpenses ? JSON.parse(storedExpenses) : [];
};  

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(getExpensesFromLocalStorage());

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
    localStorage.setItem('expenses', JSON.stringify([...prevExpenses, expense]));
  };

  const removeExpense = (id) => {
    setExpenses((prevExpenses) => 
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        removeExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}; 