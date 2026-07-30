import React from "react";
import { useState, useEffect } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    });

    const toggleVisibility = () => {
        if (window.pageYOffset > 200) {
            setIsVisible(true);
        }
        else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="scroll-to-top">
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="scroll-to-top h-12 w-12 fixed bottom-5 right-5 bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 transition-opacity duration-300 ease-in-out flex items-center justify-center cursor-pointer z-5">
                    <FaLongArrowAltUp className="text-white text-lg" />
                </button>
            )}
        </div>
    );

}