import { useState } from 'react'
import ExpenseButton from './components/expensebutton'
import DarkModeToggle from './components/darkmodetoggle'
import ScrollToTopButton from './components/ScrollToTopButton'


function App() {


  return (
    <>
      <div className="flex gap-2 justify-center items-center">
        <ScrollToTopButton />
        <ExpenseButton />
        <DarkModeToggle />
      </div>
    </>
  )
}

export default App
