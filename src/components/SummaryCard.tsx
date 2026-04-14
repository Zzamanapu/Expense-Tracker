import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react'
import type { SummaryCardProps } from '../types/expense';

const SummaryCard = ({ totalIncome, totalExpense, balance }: SummaryCardProps) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8'>
      {/* Earnings */}
      <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
        <div className='flex items-center gap-4'>
          <ArrowUpCircle className='w-10 h-10 text-emerald-500' />
          <div>
            <p className='text-slate-500 text-xs font-bold uppercase'>Total Inflow</p>
            <p className='text-2xl font-bold text-slate-800'>${totalIncome.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Expenses */}
      <div className='bg-white p-6 rounded-xl border border-slate-200 shadow-sm'>
        <div className='flex items-center gap-4'>
          <ArrowDownCircle className='w-10 h-10 text-rose-500' />
          <div>
            <p className='text-slate-500 text-xs font-bold uppercase'>Total Outflow</p>
            <p className='text-2xl font-bold text-slate-800'>${totalExpense.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Net */}
      <div className={`p-6 rounded-xl border shadow-sm ${balance >= 0 ? 'bg-sky-50 border-sky-200' : 'bg-amber-50 border-amber-200'}`}>
        <div className='flex items-center gap-4'>
          <Wallet className={`w-10 h-10 ${balance >= 0 ? 'text-sky-600' : 'text-amber-600'}`} />
          <div>
            <p className='text-slate-600 text-xs font-bold uppercase'>Available Funds</p>
            <p className='text-2xl font-bold text-slate-800'>${Math.abs(balance).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard;