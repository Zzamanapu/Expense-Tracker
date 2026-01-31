import React from 'react'
import Header from './components/Header'
import Toast from './components/Toast'
import SummaryCard from './components/SummaryCard'
import AddExpensesForm from './components/AddExpensesForm'
import FilterTab from './components/FilterTab'
import ExpansesList from './components/ExpansesList'
// import Toast from './components/toast'

const App = () => {
  return (
    <div className='min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-4'>
      {/* Toast */}
      <Toast />


      <div className="max-w-7xl mx-auto">
        {/* header */}
        <Header />


        {/* summary card */}
        <SummaryCard />


        <div className='grid grid-cols-1 xl:grid-cols-5 gap-8'>

          <div className='xl:col-span-2'>
            <AddExpensesForm />
          </div>

          <div className='xl:col-span-3'>
            <div className='bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl overflow-x-hidden'>
              <FilterTab />

              {/* expanse list */}

              <ExpansesList/>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default App