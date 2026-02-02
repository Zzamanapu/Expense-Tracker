import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Toast from './components/Toast'
import SummaryCard from './components/SummaryCard'
import AddExpensesForm from './components/AddExpensesForm'
import FilterTab from './components/FilterTab'
import ExpensesList from './components/ExpensesList'
import type { Expense, ExpenseType } from './types/expense'

const App = () => {
  type ToastVariant = "success" | "error" | "info";

  interface ToastType {
    id: number;
    message: string;
    type: ToastVariant;
  }

  type FilterType = "all" | "expense" | "income";


  const [formData, setFormData] = useState<{
    description: string;
    amount: string;
    category: string;
    date: string;
    type: ExpenseType;
  }>

    ({
      description: "",
      amount: "",
      category: "",
      date: "",
      type: "income"
    });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [toast, setToast] = useState<ToastType[]>([]);



  //local storage feature

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");

    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses) as Expense[]);
    }
  }, [])

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify((expenses)));
    }
  }, [expenses])

  //toast notification logic
  const showToast = (message: string, type: ToastVariant) => {
    const id: number = Date.now();

    const toast: ToastType = { id, message, type };
    setToast((prev) => [...prev, toast]);


    setTimeout(() => {
      setToast((prev) => prev.filter((t) => t.id !== id))
    }, 4000);

  };



  const RemoveToast = (id: number) => {
    setToast((prev) => prev.filter((t) => t.id !== id));
  }

  //calculate total income
  const totalIncome = expenses.filter((exp) => exp.type === "income").reduce((acc, exp) => acc + exp.amount, 0);

  //calculate total expense
  const totalExpense = expenses.filter((exp) => exp.type === "expense").reduce((acc, exp) => acc + exp.amount, 0);

  const balance = totalIncome - totalExpense;

  const filterExpenses = expenses.filter((exp) => {
    if (filter === "all") return true;
    return exp.type === filter;
  });


  const handleEdit = (expense: Expense) => {
    setFormData(
      { description: expense.description, amount: expense.amount.toString(), category: expense.category, date: expense.date, type: expense.type }
    );
    setEditingId(expense.id);
    showToast("Entry loaded for editing", "info");
  };


  const handleDelete = (id: number) => {
    const expenseToDelete = expenses.find((exp) => exp.id === id);
    setExpenses(expenses.filter((exp) => exp.id !== id));
    showToast(`${expenseToDelete?.type === "income" ? "income" : "expense"} deleted successfully`, "error");
  }





  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4'>
      {/* Toast */}
      <Toast Toast={toast} RemoveToast={RemoveToast} />


      <div className="max-w-7xl mx-auto">
        {/* header */}
        <Header />


        {/* summary card */}
        <SummaryCard totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />


        <div className='grid grid-cols-1 xl:grid-cols-5 gap-8'>

          <div className='xl:col-span-2'>
            <AddExpensesForm formData={formData} setFormData={setFormData} editingId={editingId} setEditingId={setEditingId} expenses={expenses} setExpenses={setExpenses} showToast={showToast} />
          </div>

          <div className='xl:col-span-3'>
            <div className='bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-x-hidden'>
              <FilterTab filter={filter} setFilter={setFilter} />

              {/* expanse list */}

              <ExpensesList filterExpenses={filterExpenses} handleEdit={handleEdit} handleDelete={handleDelete} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App