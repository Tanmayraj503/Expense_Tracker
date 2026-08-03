import React from "react";

export default function ExpenseButton() {


  return (
    <>
      {/* <button
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      >
        + Add Expense
      </button> */}
      <div className="px-6 mt-20">
        <div className="rounded-xl border-2 border-gray-500 dark:border-[#605448] max-w-126 p-4 dark:bg-[#221E1A]">

          <div className="flex justify-start px-4 items-center mb-2">
            <span className="font-bold my-3 text-xl text-orange-500">Add Transaction</span>
          </div>
          

          <div className="flex bg-amber-100 p-[2px] rounded-full mx-4 font-semibold mb-4">
            <button className="active:bg-orange-500 w-[50%] rounded-full  text-black focus:text-white py-3 cursor-pointer">Expense</button>
            <button className="active:bg-orange-500  rounded-full w-[50%]  text-black focus:text-white py-3  cursor-pointer">Income</button>
          </div>


          <div className=" dark:text-black flex flex-col gap-3 px-4">
            <div className=" dark:text-black flex flex-col gap-2 ">
              <span className="font-semibold text-orange-500">Transaction name</span>
              <input type="text" placeholder="e.g. Coffee with a friend" required className="bg-amber-50 dark:bg-amber-100 rounded-xl p-4" />
            </div>
            <div className=" dark:text-black flex flex-col gap-2 ">
              <span className="font-semibold text-orange-500">Amount</span>
              <input type="number" placeholder="0.00" min={0} required className="bg-amber-50 dark:bg-amber-100 rounded-xl p-4" />
            </div>
            <div className=" dark:text-black flex flex-col gap-2 ">
              <span className="font-semibold text-orange-500">Date</span>
              <input type="date" required className="bg-amber-50 dark:bg-amber-100 rounded-xl p-4" />
            </div>
            <div className=" dark:text-black flex flex-col gap-2 ">
              <span className="font-semibold text-orange-500">Note <span className="text-[13px] text-gray-400">(optional)</span></span>
              <input type="text" placeholder="Anything you want to remember" className="bg-amber-50 dark:bg-amber-100 rounded-xl p-4" />
            </div>
            <div className="flex justify-center items-center mb-2">
              <input type="submit" value="Add Transaction" className="bg-orange-500 hover:bg-orange-600 mt-6 text-white w-full font-semibold py-3 text-lg rounded-xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
