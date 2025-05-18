import "./index.css";
import { useState } from "react";
import { useExpense } from "../../contexts/ExpenseContext";
import { v4 as uuidv4 } from "uuid";
const CreateExpense = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("food");
    const { addExpense } = useExpense();
    const [date, setDate] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !category || !date) {
            alert("Please fill in all fields");
            return;
        }   
        if (amount <= 0) {
            alert("Amount must be greater than 0");
            return;
        }   
        if (date < new Date().toISOString().split("T")[0]) {
            alert("Date must be in the future");
            return;
        }
        if (category !== "food" && category !== "transportation" && category !== "entertainment") {
            alert("Invalid category");
            return;
        }   
        if (title.length < 3) {
            alert("Title must be at least 3 characters long");
            return;
        }
        addExpense({ id: uuidv4(), title, amount, category, date });
        setTitle("");
        setAmount("");
        setCategory("food");
        setDate("");
    }
    return(
        <div className="create-expense card">
            <h2 className="card-title">Add New Expense</h2>
            <form className="expense-form" onSubmit={handleSubmit}> 
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" placeholder="Enter description" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input type="number" id="amount" name="amount" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="food">Food</option>
                        <option value="transportation">Transportation</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                </div>
                <div className="form-group">
                    {/* date picker */}
                    <label htmlFor="date">Date</label>
                    <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />  
                </div>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    )
}


export default CreateExpense;