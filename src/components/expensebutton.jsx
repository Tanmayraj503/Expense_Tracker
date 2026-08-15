import React, { useState } from "react";
const EMPTY_FORM = { type: "expense", description: "", amount: "", category: "", date: "" };

export default function ExpenseButton() {
  const [form, setForm] = useState(EMPTY_FORM);

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"],
    expense: ["Housing", "Food", "Transport", "Health", "Entertainment", "Shopping", "Utilities", "Other"],
  };

  const payment_method = ["UPI", "Cash", "Card (Rupay/Visa/Master)", "Bank-to-Bank transfer"];

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value, ...(field === "type" ? { category: "" } : {}) }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "Rupees" });
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });


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

          <div className="flex bg-amber-100 p-0.5 rounded-full mx-4 font-semibold mb-4">
            {["income", "expense"].map((t) => {
              const isActive = form.type === t;
              const activeClass = t === "income"
                ? "bg-orange-500 dark:text-white text-black"
                : "bg-orange-500 dark:text-white text-black";
              return (
                <button
                  key={t}
                  className={`w-[50%] rounded-full text-black py-3 cursor-pointer
                    ${isActive ? activeClass : "bg-transparent text-black "}`}
                  onClick={() => handleChange("type", t)}
                > {t === "income" ? "Income" : "Expense"}
                </button>
              )
            })}
          </div>

          <div className=" dark:text-black flex flex-col gap-3 px-4">
            <div className=" dark:text-black flex flex-col gap-1 ">
              <label className="font-semibold text-orange-500">Category</label>
              <select
                className="bg-amber-50 dark:bg-amber-100 rounded-xl appearance-none block p-4"
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="">Select category</option>
                {categories[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className=" dark:text-black flex flex-col gap-1 ">
              <span className="appearance-none font-semibold text-orange-500">Amount (₹)</span>
              <input type="number" placeholder="0.00" min={0} required className="bg-amber-50 dark:bg-amber-100 rounded-xl p-4" />
            </div>
            <div className=" dark:text-black flex flex-col gap-1 ">
              <span className="font-semibold text-orange-500">Date</span>
              <input type="date" required className="bg-amber-50 dark:bg-amber-100 rounded-xl p-4" />
            </div>
            <div className=" dark:text-black flex flex-col gap-1 ">
              <span className="font-semibold text-orange-500">Description <span className="text-[13px] text-gray-400">(optional)</span></span>
              <input type="text" placeholder="e.g. Coffee with a friend" className="bg-amber-50 dark:bg-amber-100 rounded-xl p-4" />
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
