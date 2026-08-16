import React, { useState, useReducer } from "react";
const EMPTY_FORM = { type: "expense", description: "", amount: "", category: "", pay_method: "", date: "" };

export default function ExpenseButton() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [filter, setFilter] = useState("all");
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState({});

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"],
    expense: ["Housing", "Food", "Transport", "Health", "Entertainment", "Shopping", "Utilities", "Other"],
  };

  const payment_method = ["UPI", "Cash", "Card (Rupay/Visa/Master)", "Bank-to-Bank transfer"];

  const txns = [];

  const txn = {
    id: Date.now(),
    type: form.type,
    description: form.description,
    amount: form.amount,
    category: form.category,
    date: form.date,
  };

  function handleChange(field, value) {
        setForm((f) => ({ ...f, [field]: value, ...(field === "type" ? { category: "" } : {}) }));
        setErrors((e) => ({ ...e, [field]: undefined }));
    }

  const validate = () => {
    const errs = {};
    if(!form.description.trim()) errs.description="Required";
    if (!form.category) errs.category = "Required";
    if (!form.pay_method) errs.pay_method = "Required"
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = "Enter a valid amount";
    if (!form.date) errs.date = "Required";
    return errs;
  }

  function handleSubmit(){
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    dispatch({ type: "ADD_ENTRY", payload: { ...form, amount: parseFloat(form.amount) } });
    setForm(EMPTY_FORM);
    setErrors({});
  }

  const savetolocal = () => { }

  const fmt = (n) => n.toLocaleString("en-US", { style: "currency", currency: "Rupees" });
  const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  // const filtered = filter === "all" ? state.entries : state.entries.filter((e) => e.type === filter);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-1 xl:px-40">
        <div className="">
          <div className="rounded-xl border-2 border-gray-500 dark:border-[#605448]  p-3.5 dark:bg-[#221E1A] max-w-127.5">

            <div className=" px-4 my-3 mb-4">
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
                  className="bg-amber-50 dark:bg-amber-100 rounded-xl appearance-none block p-3.5"
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                >
                  <option value="" className="disabled">Select category</option>
                  {categories[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className=" dark:text-black flex flex-col gap-1 ">
                <span className="appearance-none font-semibold text-orange-500">Amount (₹)</span>
                <input type="number" placeholder="0.00" min={0} required className="bg-amber-50 dark:bg-amber-100 rounded-xl p-3.5" />
              </div>

              {/* Txn Date */}
              <div className=" dark:text-black flex flex-col gap-1 ">
                <span className="font-semibold text-orange-500">Date</span>
                <input 
                type="date" 
                required 
                className={`bg-amber-50  dark:bg-amber-100 rounded-xl p-3.5 [&::-webkit-calendar-picker-indicator]:invert
                   [&::-webkit-calendar-picker-indicator]:hue-rotate-180`} />
              </div>

              {/* Payment method */}
              <div className=" dark:text-black flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Mode of Payment</label>
                <select
                  className={`bg-amber-50 dark:bg-amber-100 border-2 rounded-xl appearance-none block p-3.5 ${errors.pay_method? "border-red-700" : ""}`}
                  value={form.pay_method}
                  onChange={(e) => handleChange("pay_method", e.target.value)}
                >
                  <option value="" className="disabled">Select payment mode</option>
                  {payment_method.map((p) => <option value={p} key={p}>{p}</option>)}
                </select>
                {errors.pay_method && <span className="text-[11px] text-rose-400">{errors.pay_method}</span>}
              </div>

              {/* Description */}
              <div className=" dark:text-black flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Description <span className="text-[13px] text-gray-400">(optional)</span></label>
                <input 
                type="text" 
                required
                placeholder="e.g. Coffee with a friend" 
                maxlength="34" 
                value={form.description}
                className={`bg-amber-50 border-2 dark:bg-amber-100 rounded-xl p-3.5 ${errors.description ? "border-red-700" : ""}`}
                onChange={(e) => handleChange("description", e.target.value)}
                />
                {errors.description && <span className="text-[11px] text-rose-400">{errors.description}</span>}
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
          <div className="rounded-xl border-2 border-gray-500 dark:border-[#605448] p-3.5 dark:bg-[#221E1A] max-w-127.5">
            <div className="px-4 my-3 mb-4">
              <span className="font-bold my-3 text-xl text-orange-500">Recent Transactions</span>
            </div>
            <div className="flex items-center gap-3 px-4 pt-3.5 ">
              {["All", "Income", "Expense"].map((f) => {
                const isActive = filter === f;
                return (
                  <button
                    key={f}
                    className={`flex px-4 py-1 text-sm font-semibold cursor-pointer bg-amber-50 dark:bg-amber-100 rounded-full 
                      ${isActive ? "text-orange-500  border-2 " : "text-black border-transparent hover:text-orange-500"}`}
                    onClick={() => setFilter(f)}>
                    {f}
                  </button>
                )
                {/* <span className="ml-auto text-xs text-slate-600 pr-1 pb-2">{filtered.length} entries</span> */ }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
