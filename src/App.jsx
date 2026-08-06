import { useState } from 'react'
import ExpenseButton from './components/expensebutton'
import DarkModeToggle from './components/darkmodetoggle'
import ScrollToTopButton from './components/ScrollToTopButton'
import PieChart from './components/piechart'
import Landing from './pages/landing'


function App() {


  return (
    <>
      <div className="">
        <ScrollToTopButton />
        <ExpenseButton />
        {/* <PieChart /> */}
        <Landing />
        <div className="fixed bottom-5 right-5">
          <DarkModeToggle />
        </div>
      </div>
    </>
  )
}

export default App
