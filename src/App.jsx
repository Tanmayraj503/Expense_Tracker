import { useState } from 'react'
import ExpenseButton from './components/expensebutton'
import DarkModeToggle from './components/darkmodetoggle'
import ScrollToTopButton from './components/ScrollToTopButton'
import Piechart from './components/PieChart'
import Landing from './pages/landing'
import LineChart from './components/linegraph'


function App() {


  return (
    <>
      
        <ScrollToTopButton />
        <ExpenseButton />
        {/* <PieChart /> */}
        {/* <LineChart/> */}
        
        <div className="fixed top-5 right-5">
          <DarkModeToggle />
        
      </div>
    </>
  )
}

export default App
