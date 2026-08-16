import { useState } from 'react'
import ExpenseButton from './components/expensebutton'
import DarkModeToggle from './components/darkmodetoggle'
import ScrollToTopButton from './components/ScrollToTopButton'
import PieChart from './components/piechart'
import Landing from './pages/landing'
import LineChart from './components/linegraph'


function App() {


  return (
    <>
      <div className="">
        <ScrollToTopButton />
        <ExpenseButton />
        {/* <PieChart /> */}
        {/* <LineChart/>
        <Landing /> */}
        <div className="fixed top-5 right-5">
          <DarkModeToggle />
        </div>
      </div>
    </>
  )
}

export default App
