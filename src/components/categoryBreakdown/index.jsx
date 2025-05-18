import { useExpense } from "../../contexts/ExpenseContext";
import "./index.css";

const CategoryBreakdown = () => {
    const { expenses } = useExpense();  
    console.log(expenses);
    const categories = [...new Set(expenses.map(expense => expense.category))];
    const categoryExpenses = categories.map(category => {
        return {
            category,
            amount: expenses.filter(expense => expense.category === category).reduce((acc, expense) => acc + +expense.amount, 0)
        }
    })
    console.log(categoryExpenses);
    return(
        <div className="category-breakdown card">
            <h2 className="card-title">Category Breakdown</h2>
            <div className="category-list"> 
                {categoryExpenses.map(expense => (
                    <div className="category-item">
                        <p className="sub-title">{expense.category}</p>   
                        <p className="amount">$ {expense.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryBreakdown;