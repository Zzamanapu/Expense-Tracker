import { Info, ShieldAlert, BadgeCheck, X } from 'lucide-react'
import React from 'react'
import type { ToastProps } from '../types/expense'

const Toast = ({ Toast, RemoveToast }: ToastProps) => {
  return (
    <div className='fixed top-6 right-6 z-50 space-y-3 w-72'>
      {Toast.map((toast) => (
        <div 
          key={toast.id} 
          className={`flex items-start p-4 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-300 ${
            toast.type === "success" ? "bg-white border-emerald-200 text-emerald-800" : 
            toast.type === "error" ? "bg-white border-rose-200 text-rose-800" : 
            "bg-white border-sky-200 text-sky-800"
          }`}
        >
          <div className='mt-0.5'>
            {toast.type === "success" && <BadgeCheck className='w-4 h-4 mr-3 text-emerald-500' />}
            {toast.type === "error" && <ShieldAlert className='w-4 h-4 mr-3 text-rose-500' />}
            {toast.type === "info" && <Info className='w-4 h-4 mr-3 text-sky-500' />}
          </div>

          <div className='flex-1'>
            <p className='text-[11px] font-bold uppercase tracking-wider leading-tight'>
              {toast.message}
            </p>
          </div>

          <button 
            onClick={() => RemoveToast(toast.id)} 
            className='ml-2 text-slate-400 hover:text-slate-600 transition-colors'
          >
            <X className='w-3 h-3' />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast