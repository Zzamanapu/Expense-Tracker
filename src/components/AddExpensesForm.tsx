import { Plus, ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { useState } from 'react'
import { categories } from '../util/categories';
import type { AddExpensesFormProps, ExpenseType, FormErrors } from '../types/expense';

const AddExpensesForm = ({ formData, setFormData, editingId, setEditingId, expenses, setExpenses, showToast }: AddExpensesFormProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.description.trim()) newErrors.description = "Required";
    if (!formData.amount || parseFloat(formData.amount) <= 0) newErrors.amount = "Invalid";
    if (!formData.category) newErrors.category = "Required";
    if (!formData.date) newErrors.date = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      showToast("Please check the fields", "error");
      return;
    }
    const expenseData = { ...formData, amount: parseFloat(formData.amount), id: editingId || Date.now() };
    if (editingId) {
      setExpenses((prev) => prev.map((exp) => exp.id === editingId ? expenseData : exp));
      setEditingId(null)
      showToast("Record updated", "success");
    } else {
      setExpenses([...expenses, expenseData]);
      showToast(`Entry logged`, "success");
    }
    setFormData({ description: "", amount: "", category: "", date: "", type: "expense" });
    setErrors({})
  };

  return (
    <div className='bg-white rounded-2xl p-8 border border-slate-200 shadow-sm'>
      <div className='text-lg font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4 uppercase tracking-tight'>
        <div className='p-2 bg-sky-50 rounded-lg mr-3'>
          <Plus className='w-5 h-5 text-sky-600' />
        </div>
        {editingId ? "Modify Record" : "New Transaction"}
      </div>

      <div className='space-y-5'>
        <div className='grid grid-cols-2 gap-4'>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "expense", category: "" })}
            className={`flex items-center justify-center py-3 rounded-xl border-2 transition-all font-bold text-[10px] tracking-widest ${formData.type === "expense" ? "border-rose-500 bg-rose-50 text-rose-600" : "border-slate-100 text-slate-400 bg-slate-50"}`}
          >
            <ArrowDownCircle className="w-4 h-4 mr-2" /> DEBIT
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "income", category: "" })}
            className={`flex items-center justify-center py-3 rounded-xl border-2 transition-all font-bold text-[10px] tracking-widest ${formData.type === "income" ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-slate-100 text-slate-400 bg-slate-50"}`}
          >
            <ArrowUpCircle className="w-4 h-4 mr-2" /> CREDIT
          </button>
        </div>

        <div>
          <label className='block text-slate-400 text-[10px] font-bold uppercase mb-1 ml-1'>Note</label>
          <input
            type='text'
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-slate-700 outline-none transition-all ${errors.description ? "border-rose-300" : "border-slate-200 focus:border-sky-500 focus:bg-white"}`} />
        </div>

        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-slate-400 text-[10px] font-bold uppercase mb-1 ml-1'>Amount</label>
            <input
              type='number'
              min="0" // 1. Prevents the 'spinner' from going below zero
              step="0.01"
              value={formData.amount}
              onChange={(e) => {
                const val = e.target.value;
                // 2. Immediate check: If the user types a negative sign, we ignore it
                if (parseFloat(val) < 0) return;
                setFormData({ ...formData, amount: val });
              }}
              placeholder="0.00"
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-slate-700 outline-none ${errors.amount ? "border-rose-300" : "border-slate-200 focus:border-sky-500 focus:bg-white"
                }`}
            />
          </div>
          <div>
            <label className='block text-slate-400 text-[10px] font-bold uppercase mb-1 ml-1'>Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-slate-700 outline-none ${errors.date ? "border-rose-300" : "border-slate-200 focus:border-sky-500 focus:bg-white"}`} />
          </div>
        </div>

        <div>
          <label className='block text-slate-400 text-[10px] font-bold uppercase mb-1 ml-1'>Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-slate-700 outline-none appearance-none ${errors.category ? "border-rose-300" : "border-slate-200 focus:border-sky-500 focus:bg-white"}`}>
            <option value="">Select...</option>
            {categories[formData.type as ExpenseType].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button
          type='button'
          className='w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-xl font-bold tracking-widest shadow-md transition-all active:scale-95 mt-4'
          onClick={handleSubmit}
        >
          {editingId ? "UPDATE RECORD" : "SAVE TRANSACTION"}
        </button>
      </div>
    </div>
  )
}

export default AddExpensesForm