import { AlertCircle, Plus, TrendingDown, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { categories } from '../util/categories';

type ExpenseType = "income" | "expense";

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
  type: ExpenseType;
}
type ToastVariant = "success" | "error" | "info";




interface AddExpensesFormProps {
  formData: {
    description: string;
    amount: string;
    category: string;
    date: string;
    type: ExpenseType;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  showToast: (message: string, type: ToastVariant) => void;
}

interface FormErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
}


const AddExpensesForm = ({ formData, setFormData, editingId, setEditingId, expenses, setExpenses, showToast }: AddExpensesFormProps) => {

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    const expenseDate = { ...formData, amount: parseFloat(formData.amount), id: editingId || Date.now() };

    if (editingId) {
      setExpenses((prev) => prev.map((exp) => exp.id === editingId ? expenseDate : exp));
      setEditingId(null)
      showToast("Entry updated successfully", "success");
    }
    else {
      setExpenses([...expenses, expenseDate]);
      showToast(`${formData.type === "income" ? "income" : "Expense"} added successfully`, "success");
    }

    setFormData({
      description: "",
      amount: "",
      category: "",
      date: "",
      type: "expense",
    });
    setErrors({})
  };


  const cancelEdit = () => {
    setFormData({
      description: "",
      amount: "",
      category: "",
      date: "",
      type: "expense",
    });
    setErrors({});
    showToast("Edit cancelled", "info");
  }

  return (
    <div className='bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white shadow-2xl'>

      <h2>
        <div className='text-2xl font-bold text-white mb-8 flex items-center'>
          <div className='p-2 bg-linear-to-r from-purple-500 to-pink-500 rounded-xl mr-3'>
            <Plus className='w-6 h-6 text-white' />
          </div>
          {/* conditional Rendering Text */}
          {
            editingId ? "Edit Entry" : "Add New Entry"
          }
        </div>
      </h2>

      <div className='space-y-6'>
        <div>
          <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>Enter Type</label>
          <div className='flex space-x-4'>
            <label className={`flex-1 flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.type === "expense" ? "border-red-500 bg-red-500/20 text-red-300" : "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-500"
              }`}>

              <input
                type="radio"
                name='type'
                value="expense"
                className='sr-only'
                checked={formData.type === "expense"}
                onChange={(e) => {
                  setFormData({ ...formData, type: e.target.value, category: "" });
                  setErrors({});
                }}
              />
              <TrendingDown className='w-5 h-5 mr-2 ' />
              <span className='font-medium'>Expense</span>
            </label>

            <label className={`flex-1 flex items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.type === "income" ? "border-green-500 bg-green-500/20 text-green-300" : "border-gray-600 bg-gray-800/50 text-gray-400 hover:border-gray-500"}`}>
              <input
                type="radio"
                name='type'
                value="income"
                checked={formData.type === "income"}
                onChange={(e) => {
                  setFormData({ ...formData, type: e.target.value, category: "" });
                  setErrors({});
                }}
                className='sr-only'
              />
              <TrendingUp className='w-5 h-5 mr-2 ' />
              <span className='font-medium'>Income</span>
            </label>
          </div>

        </div>


        <div>
          <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>Description</label>
          <input
            type='text'
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              if (errors.description) setErrors({ ...errors, description: "" });
            }}
            placeholder="What's this For"
            className={`w-full pl-12 pr-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.description ? "border-red-500" : "border-gray-600 focus:border-purple-500"}`} />
          {/* Conditional Rendering */}
          {
            errors.description && (
              <p className='text-red-400 text-sm mt-2 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {errors.description}
              </p>
            )
          }
        </div>



        <div>
          <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>Amount</label>
          <div className='relative'>
            <span className='absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg'>$</span>

            <input
              type='number'
              value={formData.amount}
              onChange={(e) => {
                setFormData({ ...formData, amount: e.target.value });
                if (errors.amount) setErrors({ ...errors, amount: "" });
              }}
              step="1.01"
              className={`w-full pl-12 pr-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.amount ? "border-red-500" : "border-gray-600 focus:border-purple-500"}`} placeholder="0.00" />
          </div>

          {/* conditional rendaring */}
          {
            errors.amount && (
              <p className='text-red-400 text-sm mt-2 flex items-center'>
                <AlertCircle className='w-4 h-4 mr-1' />
                {errors.amount}
              </p>
            )
          }
        </div>


        <div>
          <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
              if (errors.category) setErrors({ ...errors, category: "" });
            }}
            className={`w-full px-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.category ? "border-red-500" : "border-gray-600 focus:border-purple-500"}`}>

            <option className=''>Choose Category</option>
            {
              categories[formData.type as ExpenseType].map((cat) => (
                <option key={cat} value={cat} className='bg-gray-900'>
                  {cat}
                </option>
              ))
            }
          </select>

          {/* conditional rendaring */}
          {
            errors.category && (<p className='text-red-400 text-sm mt-2 flex items-center'>
              <AlertCircle className='w-4 h-4 mr-1' />
              {errors.category}
            </p>)
          }
        </div>



        <div>
          <label className='block text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide'>
            Date
          </label>
          <input
            type="date"
            onChange={(e) => {
              setFormData({ ...formData, date: e.target.value });
              if (errors.date) setErrors({ ...errors, date: "" });
            }}
            value={formData.date}
            className={`w-full px-6 py-4 bg-gray-800/50 border-2 rounded-2xl text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${errors.date ? "border-red-500" : "border-gray-600 focus:border-purple-500"}`} />

          {/* conditional rendaring */}
          {
            errors.date && (<p className='text-red-400 text-sm mt-2 flex items-center'>
              <AlertCircle className='w-4 h-4 mr-1' />
              {errors.date}
            </p>)
          }
        </div>


        <div>
          <button type='button' className='flex-1 bg-linear-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105' onClick={handleSubmit}>
            {/* Conditoinal rendaring test */}

            {editingId ? "Update Entry" : "Add Entry"}
          </button>

          {/* contional rendaring */}

          {
            editingId && (
              <button type='button' className='px-6 py-4 border-2 border-gray-600 text-gray-300 rounded-2xl hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-200' onClick={cancelEdit}>
                Cancel
              </button>
            )
          }
        </div>



      </div>

    </div>
  )
}

export default AddExpensesForm