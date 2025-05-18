import { useState } from 'react'
import './App.css'
import ExpenseTracker from './components/expenseTracker'
import { ExpenseProvider } from './contexts/ExpenseContext'

function App() {

  return (
    <ExpenseProvider>
      <ExpenseTracker />
    </ExpenseProvider>
  )
}

export default App
