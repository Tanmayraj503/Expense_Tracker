import React from 'react';
import Piechart from '../components/PieChart';
import { useState, useReducer } from "react";




export default function landing() {
    const expenseTotals = state.entries
        .filter((e) => e.type === "expense")
        .reduce((acc, e) => {
            const cat = e.category;
            acc[cat] = (acc[cat] || 0) + e.amount;
            return acc;
        }, {});

    return (
        <>
            <div className="font-sans bg-[#0f1117] min-h-screen px-5 py-7 text-slate-200 max-w-3xl mx-auto">

                {/* ── Header ── */}
                <header className="flex justify-between items-end mb-7">
                    <div>
                        <p className="text-[11px] font-bold tracking-[0.15em] text-slate-500 mb-1">EXPENSE TRACKER</p>
                        <h1 className="text-3xl font-extrabold text-slate-50 mt-1">Your Finances</h1>
                    </div>
                    <button
                        className="bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl px-5 py-2.5 text-sm font-semibold cursor-pointer transition-colors"
                        onClick={() => setShowForm((v) => !v)}
                    >
                        {showForm ? "✕ Cancel" : "+ Add Entry"}
                    </button>
                </header>

                {/* ── Summary Cards ── */}
                <div className="grid grid-cols-3 gap-3.5 mb-6">
                    {/* Balance */}
                    <div className="bg-[#1e2130] border border-indigo-500 rounded-2xl px-5 py-5">
                        <p className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase mb-2">Net Balance</p>
                        <p className={`text-2xl font-extrabold tabular-nums ${balance >= 0 ? "text-green-400" : "text-rose-400"}`}>
                            {fmt(balance)}
                        </p>
                    </div>
                    {/* Income */}
                    <div className="bg-[#1e2130] border border-[#2a2f45] rounded-2xl px-5 py-5">
                        <p className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase mb-2">Total Income</p>
                        <p className="text-2xl font-extrabold tabular-nums text-green-400">{fmt(totalIncome)}</p>
                    </div>
                    {/* Expense */}
                    <div className="bg-[#1e2130] border border-[#2a2f45] rounded-2xl px-5 py-5">
                        <p className="text-[11px] font-semibold tracking-widest text-slate-500 uppercase mb-2">Total Expenses</p>
                        <p className="text-2xl font-extrabold tabular-nums text-rose-400">{fmt(totalExpense)}</p>
                    </div>
                </div>

                {/* ── Add Entry Form ── */}
                {showForm && (
                    <div className="bg-[#1e2130] border border-indigo-500 rounded-2xl px-6 py-6 mb-6">
                        <h2 className="text-lg font-bold text-slate-50 mb-5">New Entry</h2>

                        {/* Type toggle */}
                        <div className="flex bg-[#12151f] rounded-xl p-1 gap-1 w-fit mb-5">
                            {["expense", "income"].map((t) => {
                                const isActive = form.type === t;
                                const activeClass = t === "income"
                                    ? "bg-green-900 text-green-400"
                                    : "bg-red-950 text-red-400";
                                return (
                                    <button
                                        key={t}
                                        className={`px-5 py-1.5 rounded-lg text-sm font-semibold cursor-pointer border-none transition-colors
                            ${isActive ? activeClass : "bg-transparent text-slate-500 hover:text-slate-300"}`}
                                        onClick={() => handleChange("type", t)}
                                    >
                                        {t === "income" ? "↑ Income" : "↓ Expense"}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Fields grid */}
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            {/* Description */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Description</label>
                                <input
                                    className={`${inputBase} ${errors.description ? inputErr : ""}`}
                                    placeholder="e.g. Monthly Rent"
                                    value={form.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                />
                                {errors.description && <span className="text-[11px] text-rose-400">{errors.description}</span>}
                            </div>

                            {/* Category */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Category</label>
                                <select
                                    className={`${inputBase} ${errors.category ? inputErr : ""}`}
                                    value={form.category}
                                    onChange={(e) => handleChange("category", e.target.value)}
                                >
                                    <option value="">Select category</option>
                                    {CATEGORIES[form.type].map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>
                                {errors.category && <span className="text-[11px] text-rose-400">{errors.category}</span>}
                            </div>

                            {/* Amount */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Amount ($)</label>
                                <input
                                    className={`${inputBase} ${errors.amount ? inputErr : ""}`}
                                    type="number"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    value={form.amount}
                                    onChange={(e) => handleChange("amount", e.target.value)}
                                />
                                {errors.amount && <span className="text-[11px] text-rose-400">{errors.amount}</span>}
                            </div>

                            {/* Date */}
                            <div className="flex flex-col gap-1">
                                <label className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">Date</label>
                                <input
                                    className={`${inputBase} ${errors.date ? inputErr : ""}`}
                                    type="date"
                                    value={form.date}
                                    onChange={(e) => handleChange("date", e.target.value)}
                                />
                                {errors.date && <span className="text-[11px] text-rose-400">{errors.date}</span>}
                            </div>
                        </div>

                        <button
                            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl py-2.5 text-sm font-semibold cursor-pointer transition-colors"
                            onClick={handleSubmit}
                        >
                            Save Entry
                        </button>
                    </div>
                )}

                {/* ── Table ── */}
                <div className="bg-[#1e2130] border border-[#2a2f45] rounded-2xl overflow-hidden">

                    {/* Filter tabs */}
                    <div className="flex items-center gap-0.5 px-4 pt-3.5 border-b border-[#2a2f45]">
                        {["all", "income", "expense"].map((f) => {
                            const isActive = filter === f;
                            return (
                                <button
                                    key={f}
                                    className={`px-4 py-2 text-sm font-semibold cursor-pointer border-b-2 -mb-px transition-colors bg-transparent border-l-0 border-r-0 border-t-0
                          ${isActive ? "text-indigo-400 border-indigo-400" : "text-slate-500 border-transparent hover:text-slate-300"}`}
                                    onClick={() => setFilter(f)}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            );
                        })}
                        <span className="ml-auto text-xs text-slate-600 pr-1 pb-2">{filtered.length} entries</span>
                    </div>

                    {/* Empty state */}
                    {filtered.length === 0 ? (
                        <div className="text-center py-14">
                            <p className="text-4xl mb-3">📭</p>
                            <p className="text-slate-600 text-sm">No entries yet. Add one above.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr>
                                        {["Date", "Description", "Category", "Type", "Amount", ""].map((h) => (
                                            <th
                                                key={h}
                                                className="px-4 py-3 text-left text-[11px] font-bold tracking-widest text-slate-600 uppercase bg-[#171a27]"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((entry) => (
                                        <tr key={entry.id} className="border-b border-[#1a1e2e] hover:bg-[#1a1d2b] transition-colors">
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
                                                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize
                                ${entry.type === "income" ? "bg-green-900 text-green-400" : "bg-red-950 text-red-400"}`}>
                                                    {entry.type === "income" ? "↑" : "↓"} {entry.type}
                                                </span>
                                            </td>
                                            {/* Amount */}
                                            <td className="px-4 py-3 text-sm text-right">
                                                <span className={`font-semibold font-mono text-[15px] ${entry.type === "income" ? "text-green-400" : "text-rose-400"}`}>
                                                    {entry.type === "income" ? "+" : "-"}{fmt(entry.amount)}
                                                </span>
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
                    )}
                </div>
                <Piechart
                    Housing={expenseTotals["Housing"] || 0}
                    Food={expenseTotals["Food"] || 0}
                    Transport={expenseTotals["Transport"] || 0}
                    Health={expenseTotals["Health"] || 0}
                    Entertainment={expenseTotals["Entertainment"] || 0}
                    Shopping={expenseTotals["Shopping"] || 0}
                    Utilities={expenseTotals["Utilities"] || 0}
                    Drinks={expenseTotals["Drinks"] || 0}
                    Others={expenseTotals["Other"] || 0}
                />
            </div>


        </>
    );
}


