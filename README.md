<div className="">
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

            <div className=" dark:text-black grid grid-cols-2 gap-x-5 gap-y-3 px-4">

              {/* Txn category */}
              <div className=" text-gray-600 flex flex-col gap-1 ">
                <label className="font-semibold text-orange-500">Category</label>
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
                <label className="appearance-none font-semibold text-orange-500">Amount (₹)</label>
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
                <label className="font-semibold text-orange-500">Date</label>
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
                <label className="font-semibold text-orange-500">Mode of Payment</label>
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

              <div className="grid grid-cols-1 col-span-2">
                {/* Description */}
                <div className=" text-gray-600 flex flex-col gap-1 ">
                  <label className="font-semibold text-orange-500">Description <span className="text-[13px] text-gray-500 dark:text-gray-400">(optional)</span></label>
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
        </div>