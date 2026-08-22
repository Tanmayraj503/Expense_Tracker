import React, { useState, useReducer } from "react";
const EMPTY_FORM = { type: "expense", description: "", amount: "", category: "", pay_method: "", date: "" };

export default function ExpenseButton() {
  const initialState = {
    entries: JSON.parse(localStorage.getItem("entries") || "[]").map(e => ({
      ...e,
      amount: parseFloat(e.amount)
    })),
    nextId: JSON.parse(localStorage.getItem("nextId") || "1"),
  };

  const [form, setForm] = useState(EMPTY_FORM);
  const [filter, setFilter] = useState("all");
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});

  function reducer(state, action) {
    switch (action.type) {
      case "ADD_ENTRY":
        return {
          entries: [{ ...action.payload, id: state.nextId }, ...state.entries],
          nextId: state.nextId + 1,
        };
      case "DELETE_ENTRY":
        const updated = state.entries.filter((e) => e.id !== action.id);
        localStorage.setItem("entries", JSON.stringify(updated));
        return { ...state, entries: updated };
    }
  }

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Savings", "Other"],
    expense: ["Housing", "Food", "Drinks", "Transport", "Health", "Entertainment", "Shopping", "Utilities", "Other"],
  };

  const payment_method = ["UPI", "Cash", "Debit/Credit Card", "BTB transfer"];

  const txn = (form) => {
    return {
      id: Date.now(),
      type: form.type,
      pay_method: form.pay_method,
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      date: form.date,
    };
  };

  const totalExpense = (state.entries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0));
  const totalIncome = state.entries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
  const balance = totalIncome - totalExpense;
  const savings = (balance / totalIncome) * 100;

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value, ...(field === "type" ? { category: "" } : {}) }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }
  const monthlyData = state.entries.reduce((acc, entry) => {
    const month = entry.date.slice(0, 7); // "2026-08" from "2026-08-17"
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (entry.type === "income") acc[month].income += Number(entry.amount);
    if (entry.type === "expense") acc[month].expense += Number(entry.amount);
    return acc;
  }, {});

  const monthlyArray = Object.entries(monthlyData)
    .sort((a, b) => b[0].localeCompare(a[0])) // latest month first
    .map(([month, data]) => ({
      month,
      income: data.income,
      expense: data.expense,
      balance: data.income - data.expense,
      savings: data.income > 0 ? ((data.income - data.expense) / data.income * 100).toFixed(1) : "0.0",
    }));
  const validate = () => {
    const errs = {};
    // if (!form.description.trim()) errs.description = "Required";
    if (!form.category) errs.category = "Required";
    if (!form.pay_method) errs.pay_method = "Required"
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = "Enter a valid amount";
    if (!form.date) errs.date = "Required";
    return errs;
  }

  function handleSubmit() {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    // console.log(form);
    const raj = txn(form);
    const newEntries = [raj, ...state.entries];
    console.log(newEntries);
    dispatch({ type: "ADD_ENTRY", payload: raj });
    localStorage.setItem("entries", JSON.stringify(newEntries));
    localStorage.setItem("nextId", state.nextId + 1);
    setForm(EMPTY_FORM);
    setErrors({});
  }


  const fmt = (n) => n.toLocaleString("en-IN", { style: "currency", currency: "INR" });
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const filtered = filter === "all" ? state.entries : state.entries.filter((e) => e.type === filter);


  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 lg:gap-10 mt-20 my-7 mx-7 lg:mx-10">
        <div className="md:rounded-2xl border-2 border-gray-500 max-h-40 bg-[#fbecdc] dark:border-[#605448] px-2 rounded-xl lg:pl-5 lg:py-5 py-4 dark:bg-[#221E1A]">
          <div className="sm:text-[15px] text-[12.5px] font-semibold  tracking-widest dark:text-gray-300 text-black  uppercase mb-1">Total Expenses</div>
          <div className="sm:text-2xl text-xl font-extrabold tabular-nums whitespace-nowrap text-red-500">{fmt(totalExpense)}</div>
        </div>
        <div className="md:ounded-2xl border-2 border-gray-500 max-h-29 bg-[#fbecdc]  dark:border-[#605448] px-2 rounded-xl lg:pl-5 lg:py-5 py-4 dark:bg-[#221E1A]">
          <div className="sm:text-[15px] text-[12.5px] font-semibold  tracking-widest dark:text-gray-300 text-black  uppercase mb-1">Total Income</div>
          <div className="sm:text-2xl text-xl font-extrabold tabular-nums whitespace-nowrap text-green-400">{fmt(totalIncome)}</div>
        </div>
        <div className="md:ounded-2xl border-2 border-gray-500  bg-[#fbecdc]  dark:border-[#605448] px-2 rounded-xl lg:pl-5 lg:py-5 py-4 dark:bg-[#221E1A]">
          <div className="sm:text-[15px] text-[12.5px] font-semibold  tracking-widest dark:text-gray-300 text-black  uppercase mb-1">Balance</div>
          <div className={`sm:text-2xl text-xl font-extrabold tabular-nums whitespace-nowrap ${totalExpense < totalIncome ? "text-green-400" : "text-red-500"} `}>{fmt(balance)}</div>
        </div>
        <div className="md:ounded-2xl border-2 border-gray-500 bg-[#fbecdc]  dark:border-[#605448] px-2 rounded-xl lg:pl-5 lg:py-5 py-4 dark:bg-[#221E1A]">
          <div className="sm:text-[15px] text-[12.5px] font-semibold  tracking-widest dark:text-gray-300 text-black  uppercase mb-1">Savings %age</div>
          <div className={`sm:text-2xl text-xl font-extrabold tabular-nums whitespace-nowrap ${savings < 0 ? "text-red-500" : "text-green-400"}`}>{savings.toFixed(2) + "%"}</div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] xl:grid-cols-[452px_1fr] gap-4 mx-7 items-start " >
        <div className="min-w-0">
          <div className="rounded-xl border-2 lg:block hidden border-gray-500 bg-[#fbecdc] dark:border-[#605448] p-3.5 dark:bg-[#221E1A] w-full" >

            <div className=" px-4 my-3 mb-4">
              <span className="font-bold my-3 text-xl text-orange-500">Add Transaction</span>
            </div>

            <div className="flex bg-amber-50 dark:border-0 border border-gray-400  dark:bg-gray-200 p-0.5 rounded-full mx-4 font-semibold mb-4">
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

              {/* Txn category */}
              <div className=" text-gray-600 flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Category</label>
                <select
                  className={`bg-amber-50 border-2 border-gray-400 dark:bg-gray-200 rounded-xl appearance-none block p-3.5 ${errors.category ? "border-red-700" : "dark:border-gray-200 border"}`}
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  <option value="" disabled>Select category</option>
                  {categories[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <span className="text-red-600 text-[10px]">{errors.category}</span>}

              </div>

              {/* Txn Amount */}
              <div className=" text-gray-600 flex flex-col gap-1 ">
                <label className="appearance-none font-semibold text-orange-500">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  min={0}
                  step={1}
                  value={form.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  required
                  className={`${errors.amount ? "border-red-700" : "dark:border-gray-200 border"} bg-amber-50 border-2 border-gray-400  dark:bg-gray-200 rounded-xl p-3.5`}
                />
                {errors.amount && <span className="text-[10px] text-red-600">{errors.amount}</span>}
              </div>

              {/* Txn Date */}
              <div className=" text-gray-600 flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Date</label>
                <input
                  type="date"
                  required
                  onChange={(e) => handleChange("date", e.target.value)}
                  value={form.date}
                  className={`bg-amber-50  dark:bg-gray-200 rounded-xl p-3.5 [&::-webkit-calendar-picker-indicator]:invert
                   [&::-webkit-calendar-picker-indicator]:hue-rotate-180 border-2 border-gray-400 ${errors.date ? "border-red-700" : "dark:border-gray-200 border"}`} />
                {errors.date && <span className="text-[10px] text-red-600">{errors.date}</span>}
              </div>

              {/* Payment method */}
              <div className=" text-gray-600 flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Mode of Payment</label>
                <select
                  className={`bg-amber-50 dark:bg-gray-200 border-2 border-gray-400 rounded-xl appearance-none block p-3.5 ${errors.pay_method ? "border-red-700" : "dark:border-gray-200 border"}`}
                  value={form.pay_method}
                  onChange={(e) => handleChange("pay_method", e.target.value)}
                >
                  <option value="" disabled>Select payment mode</option>
                  {payment_method.map((p) => <option value={p} key={p}>{p}</option>)}
                </select>
                {errors.pay_method && <span className="text-[10px] text-red-600">{errors.pay_method}</span>}
              </div>

              {/* Description */}
              <div className=" text-gray-600 flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Description <span className="text-[13px] text-gray-500 dark:text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coffee with a friend"
                  maxLength="28"
                  value={form.description}
                  className={`bg-amber-50 border-2 border-gray-400 dark:bg-gray-200 rounded-xl p-3.5 ${errors.description ? "border-red-700" : "dark:border-gray-200 border"}`}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                {errors.description && <span className="text-[10px] text-red-600">{errors.description}</span>}
              </div>

              <div className="flex justify-center items-center mb-2">
                <button
                  onClick={handleSubmit}
                  className="bg-orange-500 hover:bg-orange-600 mt-6 text-white w-full font-semibold py-3 text-lg rounded-xl cursor-pointer"
                >
                  Add Transaction
                </button>
              </div>

            </div>
          </div>
        </div>
        <div className="rounded-xl lg:hidden block border-2 border-gray-500 bg-[#fbecdc] dark:border-[#605448] p-3.5 dark:bg-[#221E1A] w-full">

          <div className=" px-4 my-3 mb-4">
            <span className="font-bold my-3 text-xl text-orange-500">Add Transaction</span>
          </div>

          <div className="flex bg-amber-50 dark:border-0 border border-gray-400  dark:bg-gray-200 p-0.5 rounded-full mx-4 font-semibold mb-4">
            {["income", "expense"].map((t) => {
              const isActive = form.type === t;
              const activeClass = t === "income"
                ? "bg-orange-500 dark:text-white text-black"
                : "bg-orange-500 dark:text-white text-black";
              return (
                <button
                  key={t}
                  className={`w-[50%] rounded-full text-black py-2.5 md:py-3 cursor-pointer
                    ${isActive ? activeClass : "bg-transparent text-black "}`}
                  onClick={() => handleChange("type", t)}
                > {t === "income" ? "Income" : "Expense"}
                </button>
              )
            })}
          </div>

          <div className=" dark:text-black grid  sm:grid-cols-2 gap-2 sm:gap-x-5 sm:gap-y-3 px-4">

            {/* Txn category */}
            <div className=" text-gray-600 flex flex-col gap-1 ">
              <label className="font-semibold text-sm sm:text-base text-orange-500">Category</label>
              <select
                className={`bg-amber-50 border-2 border-gray-400 dark:bg-gray-200 rounded-xl appearance-none text-sm md:text-base block md:p-3.5 p-2.5 ${errors.category ? "border-red-700" : "dark:border-gray-200 border"}`}
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="" disabled>Select category</option>
                {categories[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <span className="text-red-600 text-[10px]">{errors.category}</span>}

            </div>

            {/* Txn Amount */}
            <div className=" text-gray-600 flex flex-col gap-1 ">
              <label className="appearance-none text-sm sm:text-base font-semibold text-orange-500">Amount (₹)</label>
              <input
                type="number"
                placeholder="0.00"
                min={0}
                step={1}
                value={form.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                required
                className={`${errors.amount ? "border-red-700" : "dark:border-gray-200 border"} text-sm md:text-base bg-amber-50 border-2 border-gray-400  dark:bg-gray-200 rounded-xl md:p-3.5 p-2.5`}
              />
              {errors.amount && <span className="text-[10px] text-red-600">{errors.amount}</span>}
            </div>

            {/* Txn Date */}
            <div className=" text-gray-600 flex flex-col gap-1 ">
              <label className="font-semibold text-sm sm:text-base text-orange-500">Date</label>
              <input
                type="date"
                required
                onChange={(e) => handleChange("date", e.target.value)}
                value={form.date}
                className={`bg-amber-50  dark:bg-gray-200 rounded-xl md:p-3.5 p-2.5 [&::-webkit-calendar-picker-indicator]:invert
                   [&::-webkit-calendar-picker-indicator]:hue-rotate-180 border-2 text-sm md:text-base border-gray-400 ${errors.date ? "border-red-700" : "dark:border-gray-200 border"}`} />
              {errors.date && <span className="text-[10px] text-red-600">{errors.date}</span>}
            </div>

            {/* Payment method */}
            <div className=" text-gray-600 flex flex-col gap-1 ">
              <label className="font-semibold text-sm sm:text-base whitespace-nowrap text-orange-500">Mode of Payment</label>
              <select
                className={`bg-amber-50 dark:bg-gray-200 border-2 text-sm md:text-base border-gray-400 rounded-xl appearance-none block md:p-3.5 p-2.5 ${errors.pay_method ? "border-red-700" : "dark:border-gray-200 border"}`}
                value={form.pay_method}
                onChange={(e) => handleChange("pay_method", e.target.value)}
              >
                <option value="" disabled>Select payment mode</option>
                {payment_method.map((p) => <option value={p} key={p}>{p}</option>)}
              </select>
              {errors.pay_method && <span className="text-[10px] text-red-600">{errors.pay_method}</span>}
            </div>

            <div className="md:grid grid-cols-1 sm:col-span-2">
              {/* Description */}
              <div className=" text-gray-600 flex flex-col gap-1 ">
                <label className="font-semibold text-sm sm:text-base text-orange-500">Description <span className="text-[10px] sm:text-[13px] text-gray-500 dark:text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coffee with a friend"
                  maxLength="28"
                  value={form.description}
                  className={`bg-amber-50 border-2 text-sm md:text-base border-gray-400 dark:bg-gray-200 rounded-xl md:p-3.5 p-2.5 ${errors.description ? "border-red-700" : "dark:border-gray-200 border"}`}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
                {errors.description && <span className="text-[10px] text-red-600">{errors.description}</span>}
              </div>

              <div className="flex justify-center items-center mb-2">
                <button
                  onClick={handleSubmit}
                  className="bg-orange-500 hover:bg-orange-600 mt-6 text-white w-full font-semibold py-2.5 text-lg rounded-xl cursor-pointer"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="min-w-0">
          <div className="rounded-xl border-2 overflow-hidden bg-[#fbecdc] border-gray-500 dark:border-[#605448] p-3.5 dark:bg-[#221E1A] ">
            <div className="px-4 my-3 mb-4">
              <span className="font-bold my-3 text-xl text-orange-500">Recent Transactions</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 px-4 pt-3.5 ">
              {["all", "income", "expense"].map((f) => {
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    className={`flex px-4 py-1 text-sm font-semibold cursor-pointer bg-amber-50 dark:bg-gray-200 rounded-full 
                      ${isActive ? "text-orange-500  border-2 " : "text-black dark:border-transparent border-gray-400 border hover:text-orange-500"}`}
                    onClick={() => setFilter(f)}>
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                )
              })}
              <span className="ml-auto text-xs text-gray-200 md:block hidden pr-1 pb-2">{filtered.length} entries</span>
            </div>

            {/* Table */}
            {filtered.length === 0
              ?
              <div className="text-center py-14">
                <p className="text-orange-400 text-sm">No entries yet.</p>
              </div>
              :
              <div className="mt-4 overflow-x-auto overflow-y-auto max-h-142">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      {["Date", "Description", "Category", "Type", "Amount", "Payment Method", ""].map((t) => (
                        <th
                          key={t}
                          className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-slate-200 uppercase bg-orange-500">
                          {t}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((entry) => (
                      <tr key={entry.id} className="border-b border-[#1a1e2e] hover:bg-orange-200 dark:hover:bg-[#2b221a] transition-colors">
                        {/* Date */}
                        <td className="px-4 py-3 text-sm">
                          <span className="dark:text-gray-400 text-black text-xs whitespace-nowrap">{fmtDate(entry.date)}</span>
                        </td>
                        {/* Description */}
                        <td className="px-4 py-3 text-sm">
                          <span className="text-black dark:text-slate-300 font-medium">{entry.description}</span>
                        </td>
                        {/* Category badge */}
                        <td className="px-4 py-3 text-sm">
                          <span className="dark:bg-[#773a07] bg-[#ac5605] border border-[#ac5605] rounded-lg px-2 py-0.5 text-xs text-gray-300">
                            {entry.category}
                          </span>
                        </td>
                        {/* Type pill */}
                        <td className="px-4 py-3 text-sm">
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${entry.type === "income" ? "bg-green-900 text-green-400" : "bg-red-950 text-red-400"}`}>
                            {entry.type}
                          </span>
                        </td>
                        {/* Amount */}
                        <td className="px-4 py-3 text-sm">
                          <span className={`font-semibold whitespace-nowrap font-mono text-[15px] ${entry.type === "income" ? "text-green-400" : "text-rose-400"}`}>
                            {entry.type === "income" ? "+" : "-"}{fmt(entry.amount)}
                          </span>
                        </td>
                        {/* Payment Method */}
                        <td className="text-sm text-center">
                          <span className={`dark:bg-[#773a07] bg-[#ac5605] border border-[#ac5605] rounded-lg px-2 py-0.5 text-xs text-gray-300`}>{entry.pay_method}</span>
                        </td>
                        {/* Delete */}
                        <td className="px-4 py-3 text-sm">
                          <button
                            className="dark:text-gray-400 text-black hover:text-rose-500 cursor-pointer bg-transparent  text-sm px-1.5 py-1 rounded transition-colors"
                            onClick={() => dispatch({ type: "DELETE_ENTRY", id: entry.id })}
                            title="Delete"
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </div>
      {monthlyArray.length > 0 && (
        <div className="mx-7 my-7">
          <span className="font-bold text-xl text-orange-500">Monthly Breakdown</span>
          <div className="mt-4 rounded-xl border-2 border-gray-500 dark:border-[#605448] overflow-x-auto dark:bg-[#221E1A] bg-[#fbecdc]">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {["Month", "Income", "Expense", "Balance", "Savings %"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-slate-200 uppercase bg-orange-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyArray.map(({ month, income, expense, balance, savings }) => (
                  <tr key={month} className="border-b border-[#1a1e2e] hover:bg-orange-200 dark:hover:bg-[#2b221a] transition-colors">
                    <td className="px-4 py-3 text-sm font-semibold text-black dark:text-gray-300">
                      {new Date(month + "-01").toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono whitespace-nowrap font-semibold text-green-400">+{fmt(income)}</td>
                    <td className="px-4 py-3 text-sm font-mono whitespace-nowrap font-semibold text-rose-400">-{fmt(expense)}</td>
                    <td className={`px-4 py-3 text-sm font-mono whitespace-nowrap font-semibold ${balance >= 0 ? "text-green-400" : "text-rose-400"}`}>{fmt(balance)}</td>
                    <td className={`px-4 py-3 text-sm font-mono whitespace-nowrap font-semibold ${Number(savings) >= 0 ? "text-green-400" : "text-rose-400"}`}>{savings}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
