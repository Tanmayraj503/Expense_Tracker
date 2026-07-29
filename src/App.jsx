import { useState } from 'react'
import ExpenseButton from './components/expensebutton'
import DarkModeToggle from './components/darkmodetoggle'


function App() {


  return (
    <>
      <div className="flex gap-2 justify-center items-center">
        <ExpenseButton />
        <DarkModeToggle />
      </div>
      <div className="text-black dark:text-white p-100">
        hello
      </div>
    </>
  )
}

export default App
