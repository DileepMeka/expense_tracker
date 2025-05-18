import "./index.css";
import { useExpense } from "../../contexts/ExpenseContext";
import { useState, useEffect } from "react";       


const Modal = ({ isOpen, onClose, expense, children }) => {
    const [editedExpense, setEditedExpense] = useState(expense);   
    const handleSave = (e) => {
        e.preventDefault();
        updateExpense(editedExpense.id, editedExpense);
        onClose();
    }
    const handleCancel = () => {
        onClose();
    }
    useEffect(() => {
        setEditedExpense(expense);
    }, [expense]);
    if (!isOpen) return null;
    
    console.log(editedExpense);
    console.log("editedExpense");
    return (
        <div className="modal">
            {children}
        </div>
    )
}   


const ExpenseHistory = () => {
    const { expenses, removeExpense, updateExpense } = useExpense();
    console.log(expenses);
    const [search, setSearch] = useState("");
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [editModal, setEditModal] = useState(false);
    const [editedExpense, setEditedExpense] = useState(null);

    const handleSave = (e) => {
        e.preventDefault();
        updateExpense(editedExpense.id, editedExpense);
        setEditModal(false);
    }
    
    useEffect(() => {
        setFilteredExpenses(expenses);
    }, [expenses]);
    
    useEffect(() => {   
        setFilteredExpenses(expenses.filter(expense => expense.title.toLowerCase().includes(search.toLowerCase())));
    }, [search]);
    
    const deleteExpense = (id) => {
        removeExpense(id);
    }
    const editExpense = (id) => {                       
        setEditedExpense(expenses.find(expense => expense.id === id));
        setEditModal(true);
    }
    
    const handleSearch = (e) => {
        setSearch(e.target.value);
        setFilteredExpenses(expenses.filter(expense => expense.title.toLowerCase().includes(search.toLowerCase())));
        }
    const sortExpenses = () => {
        setFilteredExpenses(expenses.sort((a, b) => new Date(a.date) - new Date(b.date)));
    }
    console.log(filteredExpenses);
    console.log("filteredExpenses");
    return(
        <div className="expense-history card">
            <h2 className="card-title">Expense History</h2>
            <div className="expense-list expense-form">
                <div className="expense-form-header">
                    <input type="text" className="search-input input" placeholder="Search by title" value={search} onChange={handleSearch} /> {/* when we type in the search input, the expenses should be filtered */}
                    <button className="sort-button" onClick={() => sortExpenses()}>Sort by date</button>
                </div>
                {/* we should map through the expenses and display the expense details */}
                {filteredExpenses.map(expense => (
                    <div className="expense-item" key={expense.id}>
                        <div className="expense-details">
                            <p className="expense-title">{expense.title}</p>
                            <p className="expense-category">{expense.category}</p>
                            <p className="expense-date">{expense.date}</p>
                        </div>
                        <div className="expense-actions">
                            <p className="expense-amount">$ {expense.amount}</p>
                            <button className="edit-button" onClick={() => editExpense(expense.id)}>Edit</button> {/* when we click on edit button, we should open a modal with the expense details and allow the user to edit the expense */}
                            <button className="delete-button" onClick={() => deleteExpense(expense.id)}>Delete</button>
                        </div>
                    </div>
                ))}
                
                {editModal && <Modal isOpen={editModal} onClose={() => setEditModal(false)} expense={editedExpense}>
                    <form className="expense-form" onSubmit={handleSave}>
                        <input type="text" name="title" value={editedExpense.title} onChange={(e) => setEditedExpense({ ...editedExpense, title: e.target.value })} />
                        <input type="number" name="amount" value={editedExpense.amount} onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })} />
                    <select name="category" value={editedExpense.category} onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}>
                        <option value="food">Food</option>
                        <option value="transportation">Transportation</option>
                        <option value="entertainment">Entertainment</option>
                        </select>
                        <button type="submit">Save</button>
                        <button onClick={() => setEditModal(false)}>Cancel</button>
                    </form>
                </Modal>}
            </div>
        </div>
    )
}



export default ExpenseHistory;  