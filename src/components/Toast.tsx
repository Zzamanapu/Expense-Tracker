import { AlertCircle, Check, X } from 'lucide-react'
import React from 'react'

type ToastVariant  = "success" | "error" | "info";

interface ToastType {
  id: number;
  message: string;
  type: ToastVariant ;
}

interface ToastProps {
  Toast: ToastType[];
  RemoveToast: (id: number) => void;
}

const Toast = ({ Toast, RemoveToast }: ToastProps) => {
  return (
    // map method logic
    <div className='fixed top-4 right-4 z-50 space-y-2'>
      {
        Toast.map((toast) => {
          return (
            <div key={toast.id} className={`flex items-center p-4 rounded-lg shadow-lg backdrop-blur-sm border transform transition-all duration-300 easy-in-out ${toast.type === "success" ? "bg-green-900/80 border-green-700 text-green-100" : toast.type === "error" ? "bg-red-900/80 border-red-700 text-red-100" : "bg-yellow-900/80 border-yellow-700 text-yellow-100"}`}>

              {/* conditional rendering */}
              {
                toast.type === "success" && < Check className='w-5 h-5 mr-2 shrink-0' />
              }


              {/* conditional rendering */}
              {
                toast.type === "error" && < AlertCircle className='w-5 h-5 mr-2 shrink-0' />
              }

              {/* conditional rendering */}
                            {
                toast.type === "info" && < AlertCircle className='w-5 h-5 mr-2 shrink-0' />
              }

              <span className='mr-2'>{toast.message}</span>
              <button className='ml-auto text-gray-300 hover:text-white transition-colors' onClick={() => RemoveToast(toast.id)}>
                <X className='w-4 h-4' />
              </button>

            </div >
          )
        })
      }
    </div>
  )
}

export default Toast


