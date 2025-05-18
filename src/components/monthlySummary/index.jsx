import "./index.css";
import { useExpense } from "../../contexts/ExpenseContext";
const MonthlySummary = () => {
    const { expenses } = useExpense();
    const totalExpenses = expenses.reduce((acc, expense) => acc + +expense.amount, 0);
    return(
        <div className="monthly-summary card">
            <h2 className="card-title"><span>$</span>Monthly Summary</h2>   
            <h3 className="summary-amount">$ {totalExpenses}</h3>
            <p className="summary-text">Total for this month</p>
        </div>
    )
}

export default MonthlySummary;