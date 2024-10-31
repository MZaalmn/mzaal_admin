// src/components/Button.js
import React from "react";

const Button = ({ onClick, children, className = "", variant = "primary" }) => {
    const baseStyles =
        "px-4 py-2 font-semibold rounded focus:outline-none focus:ring-2 focus:ring-opacity-50";
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400",
        secondary:
            "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-400",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
