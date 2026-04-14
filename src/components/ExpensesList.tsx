import { Calendar, Layers, Edit3, Trash, MinusCircle, PlusCircle, SearchX } from 'lucide-react'
import React from 'react'
import type { ExpensesListProps } from '../types/expense';

const ExpensesList = ({ filterExpenses, handleEdit, handleDelete }: ExpensesListProps) => {
  return (
    <div className='p-6 max-h-[500px] overflow-y-auto'>
      {filterExpenses.length === 0 ? (
        <div className='text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200'>
          <SearchX className='w-12 h-12 text-slate-300 mx-auto mb-4' />
          <p className='text-slate-400 font-bold uppercase text-xs tracking-widest'>No records found</p>
        </div>
      ) : (
        <div className='space-y-3'>
          {filterExpenses.map((exp) => (
            <div key={exp.id} className='group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all'>
              <div className='flex items-center space-x-4'>
                <div className={`p-2 rounded-lg ${exp.type === "income" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"}`}>
                  {exp.type === "income" ? <PlusCircle className='h-5 w-5' /> : <MinusCircle className='h-5 w-5' />}
                </div>
                <div>
                  <p className='font-bold text-slate-800 text-sm'>{exp.description}</p>
                  <div className='flex items-center space-x-4 mt-1'>
                    <span className='flex items-center text-[10px] text-slate-400 uppercase font-bold tracking-tight'>
                      <Layers className='w-3 h-3 mr-1 text-sky-500' /> {exp.category}
                    </span>
                    <span className='flex items-center text-[10px] text-slate-400 uppercase font-bold tracking-tight'>
                      <Calendar className='w-3 h-3 mr-1 text-sky-500' /> {new Date(exp.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className='flex items-center space-x-6'>
                <span className={`font-mono font-bold text-lg ${exp.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                  {exp.type === "income" ? "+" : "-"}${exp.amount.toFixed(2)}
                </span>
                <div className='flex opacity-0 group-hover:opacity-100 transition-opacity'>
                  <button onClick={()=>handleEdit(exp)} className='p-2 text-slate-400 hover:text-sky-600 transition-colors'>
                    <Edit3 className='w-4 h-4' />
                  </button>
                  <button onClick={()=>handleDelete(exp.id)} className='p-2 text-slate-400 hover:text-rose-600 transition-colors'>
                    <Trash className='w-4 h-4' />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExpensesList