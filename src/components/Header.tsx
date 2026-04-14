import { Compass } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center justify-between mb-8 pb-6 border-b border-slate-200'>
      <div className='flex items-center gap-3'>
        <div className='p-2 bg-sky-600 rounded-lg'>
          <Compass className='w-6 h-6 text-white'/>
        </div>
        <h1 className='text-2xl font-bold text-slate-800 tracking-tight'></h1>
      </div>
      <h1 className='text-slate-500 text-2xl font-bold'>Budget Tracker</h1>
    </div>
  )
}

export default Header;