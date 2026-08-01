import { useState } from 'react'
import ExpenseButton from './components/expensebutton'
import DarkModeToggle from './components/darkmodetoggle'
import ScrollToTopButton from './components/ScrollToTopButton'


function App() {


  return (
    <>
      <div className="">
        <ScrollToTopButton />
        <ExpenseButton />
        <div className="fixed bottom-5 right-5">
          <DarkModeToggle />
        </div>
      </div>
    </>
  )
}

export default App
