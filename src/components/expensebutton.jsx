import React, { useState, useReducer } from "react";
const EMPTY_FORM = { type: "expense", description: "", amount: "", category: "", pay_method: "", date: "" };

export default function ExpenseButton() {
  const initialState = {
    entries: JSON.parse(localStorage.getItem("entries") || "[]"),
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
    expense: ["Housing", "Food", "Transport", "Health", "Entertainment", "Shopping", "Utilities", "Other"],
  };

  const payment_method = ["UPI", "Cash", "Debit/Credit Card", "BTB transfer"];

  // function txns(){
  //  const raj = txn();
  //  console.log(raj);
  // }

  const txn = (form) => {
    return {
      id: Date.now(),
      type: form.type,
      pay_method: form.pay_method,
      description: form.description,
      amount: form.amount,
      category: form.category,
      date: form.date,
    };
  };

  // const getform = () => {
  //   const wedguj = JSON.parse(localStorage.getItem("enteries"));
  //   console.log(wedguj);
  // }

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value, ...(field === "type" ? { category: "" } : {}) }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

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
      <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-7 mx-7 items-start">
        <div className="">
          <div className="rounded-xl border-2 border-gray-500 dark:border-[#605448] p-3.5 dark:bg-[#221E1A] h-full lg:w-127.5">

            <div className=" px-4 my-3 mb-4">
              <span className="font-bold my-3 text-xl text-orange-500">Add Transaction</span>
            </div>

            <div className="flex bg-gray-200 p-0.5 rounded-full mx-4 font-semibold mb-4">
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
              <div className=" dark:text-black flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Category</label>
                <select
                  className={`bg-amber-50 border-2 dark:bg-gray-200 rounded-xl appearance-none block p-3.5 ${errors.category ? "border-red-700" : ""}`}
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  <option value="" disabled>Select category</option>
                  {categories[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <span className="text-red-600 text-[10px]">{errors.category}</span>}

              </div>

              {/* Txn Amount */}
              <div className=" dark:text-black flex flex-col gap-1 ">
                <label className="appearance-none font-semibold text-orange-500">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  min={0}
                  step={1}
                  value={form.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                  required
                  className={`${errors.amount ? "border-red-700" : ""} bg-amber-50 border-2  dark:bg-gray-200 rounded-xl p-3.5`}
                />
                {errors.amount && <span className="text-[10px] text-red-600">{errors.amount}</span>}
              </div>

              {/* Txn Date */}
              <div className=" dark:text-black flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Date</label>
                <input
                  type="date"
                  required
                  onChange={(e) => handleChange("date", e.target.value)}
                  value={form.date}
                  className={`bg-amber-50  dark:bg-gray-200 rounded-xl p-3.5 [&::-webkit-calendar-picker-indicator]:invert
                   [&::-webkit-calendar-picker-indicator]:hue-rotate-180 border-2 ${errors.date ? "border-red-700" : ""}`} />
                {errors.date && <span className="text-[10px] text-red-600">{errors.date}</span>}
              </div>

              {/* Payment method */}
              <div className=" dark:text-black flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Mode of Payment</label>
                <select
                  className={`bg-amber-50 dark:bg-gray-200 border-2 rounded-xl appearance-none block p-3.5 ${errors.pay_method ? "border-red-700" : ""}`}
                  value={form.pay_method}
                  onChange={(e) => handleChange("pay_method", e.target.value)}
                >
                  <option value="" className="disabled">Select payment mode</option>
                  {payment_method.map((p) => <option value={p} key={p}>{p}</option>)}
                </select>
                {errors.pay_method && <span className="text-[10px] text-red-600">{errors.pay_method}</span>}
              </div>

              {/* Description */}
              <div className=" dark:text-black flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Description <span className="text-[13px] text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Coffee with a friend"
                  maxLength="34"
                  value={form.description}
                  className={`bg-amber-50 border-2 dark:bg-gray-200 rounded-xl p-3.5 ${errors.description ? "border-red-700" : ""}`}
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
        <div className="">
          <div className="rounded-xl border-2 border-gray-500 dark:border-[#605448] p-3.5 dark:bg-[#221E1A] ">
            <div className="px-4 my-3 mb-4">
              <span className="font-bold my-3 text-xl text-orange-500">Recent Transactions</span>
            </div>
            <div className="flex items-center gap-3 px-4 pt-3.5 ">
              {["all", "income", "expense"].map((f) => {
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    className={`flex px-4 py-1 text-sm font-semibold cursor-pointer bg-amber-50 dark:bg-gray-200 rounded-full 
                      ${isActive ? "text-orange-500  border-2 " : "text-black border-transparent hover:text-orange-500"}`}
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
                      <tr key={entry.id} className="border-b border-[#1a1e2e] hover:bg-[#2b221a] transition-colors">
                        {/* Date */}
                        <td className="px-4 py-3 text-sm">
                          <span className="text-slate-500 text-xs whitespace-nowrap">{fmtDate(entry.date)}</span>
                        </td>
                        {/* Description */}
                        <td className="px-4 py-3 text-sm">
                          <span className="text-slate-300 font-medium">{entry.description}</span>
                        </td>
                        {/* Category badge */}
                        <td className="px-4 py-3 text-sm">
                          <span className="bg-[#12151f] border border-[#2a2f45] rounded-md px-2 py-0.5 text-xs text-slate-400">
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
                          <span className={`font-semibold font-mono text-[15px] ${entry.type === "income" ? "text-green-400" : "text-rose-400"}`}>
                            {entry.type === "income" ? "+" : "-"}{fmt(entry.amount)}
                          </span>
                        </td>
                        {/* Payment Method */}
                        <td className="text-sm text-center">
                          <span className={`bg-[#12151f] border border-[#2a2f45] rounded-md px-2 py-0.5 text-xs text-slate-400`}>{entry.pay_method}</span>
                        </td>
                        {/* Delete */}
                        <td className="px-4 py-3 text-sm">
                          <button
                            className="text-slate-600 hover:text-rose-400 cursor-pointer bg-transparent border-none text-sm px-1.5 py-1 rounded transition-colors"
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
    </>
  );
}
