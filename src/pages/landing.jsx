import React from 'react';
import Piechart from '../components/PieChart';
import { useState, useReducer } from "react";

// export default function Landing() {
const arr = [
    { food: 20, others: 10, medical: 20, transport: 5, drinks: 15, housing: 16, utilities: 21, shopping: 67, entertainment: 35 },

];

const CATEGORIES = {
    income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Other"],
    expense: ["Housing", "Food", "Transport", "Health", "Entertainment", "Shopping", "Utilities", "Other"],
};

const initialState = {
    entries: [
        { id: 1, type: "income", description: "Monthly Salary", category: "Salary", amount: 4500, date: "2026-07-28" },
        { id: 2, type: "expense", description: "Rent", category: "Housing", amount: 1200, date: "2026-07-30" },
        { id: 3, type: "expense", description: "Groceries", category: "Food", amount: 185, date: "2026-08-01" },
        { id: 4, type: "income", description: "Freelance Project", category: "Freelance", amount: 850, date: "2026-08-01" },
    ],
    nextId: 5,
};

function reducer(state, action) {
    switch (action.type) {
        case "ADD_ENTRY":
            return {
                entries: [{ ...action.payload, id: state.nextId }, ...state.entries],
                nextId: state.nextId + 1,
            };
        case "DELETE_ENTRY":
            return { ...state, entries: state.entries.filter((e) => e.id !== action.id) };
        default:
            return state;
    }
}

const EMPTY_FORM = { type: "expense", description: "", category: "", amount: "", date: "" };

export default function ExpenseTracker() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [filter, setFilter] = useState("all");
    const [showForm, setShowForm] = useState(false);

    const totalIncome = state.entries.filter((e) => e.type === "income").reduce((s, e) => s + e.amount, 0);
    const totalExpense = state.entries.filter((e) => e.type === "expense").reduce((s, e) => s + e.amount, 0);
    const balance = totalIncome - totalExpense;

    const filtered = filter === "all" ? state.entries : state.entries.filter((e) => e.type === filter);

    function validate() {
        const errs = {};
        if (!form.description.trim()) errs.description = "Required";
        if (!form.category) errs.category = "Required";
        if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) errs.amount = "Enter a valid amount";
        if (!form.date) errs.date = "Required";
        return errs;
    }

    function handleSubmit() {
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        dispatch({ type: "ADD_ENTRY", payload: { ...form, amount: parseFloat(form.amount) } });
        setForm(EMPTY_FORM);
        setErrors({});
        setShowForm(false);
    }

    function handleChange(field, value) {
        return (
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
        )}
    }
