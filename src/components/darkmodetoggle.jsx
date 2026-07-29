import React from "react";
import { useState, useEffect } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { IoIosMoon } from "react-icons/io";



export default function DarkModeToggle() {
  const [ dark, setDark ] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const syncfromDOM = () => {
      setDark(document.documentElement.classList.contains("dark"));
    };

    window.addEventListener("focus", syncfromDOM);
    return () => {
      window.removeEventListener("focus", syncfromDOM);
    };
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch (_) { }
  };

  return (
    <>
      <button
        onClick={toggle}
        className="border border-gray-400 dark:border-gray-600 p-2 text-center rounded-full cursor-pointer">
        {dark ? <IoSunnyOutline className="text-xl text-gray-400" /> : <IoIosMoon className="text-xl text-black dark:text-white" />}
      </button>
    </>
  );
}
