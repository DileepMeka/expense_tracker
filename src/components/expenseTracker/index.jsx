import CategoryBreakdown from "../categoryBreakdown";
import CreateExpense from "../createExpense";
import ExpenseHistory from "../expenseHistory";
import MonthlySummary from "../monthlySummary";
import "./index.css";

const ExpenseTracker = () => {
    return(
        <div className="expense-tracker">
            <h1 className="main-heading">Expense Tracker</h1>
            <div className="top-container">
                <MonthlySummary />
                <CategoryBreakdown />
            </div>
            <div className="bottom-container">
                <CreateExpense />
                <ExpenseHistory />
            </div>
        </div>
    )
}

export default ExpenseTracker;