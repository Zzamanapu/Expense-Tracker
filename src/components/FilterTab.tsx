import React from 'react'
import type { FilterProps, FilterType } from '../types/expense'

const filters: FilterType[] = ["all", "expense", "income"];

const FilterTab = ({ filter, setFilter }: FilterProps) => {
  return (
    <div className='px-8 py-6 border-b border-slate-100 bg-slate-50/50'>
      <div className='flex p-1 bg-slate-200/50 rounded-xl border border-slate-200'>
        {filters.map((filtertype) => (
          <button 
            key={filtertype}
            onClick={() => setFilter(filtertype)}
            className={`flex-1 py-2 px-4 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${filter === filtertype
              ? "bg-white text-sky-600 shadow-sm border border-slate-200"
              : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {filtertype === "all" ? "Full Ledger" : filtertype}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterTab