import React from "react";

const Button = ({
    onClick,
    text,
    bgColor = "",
    hoverColor = "",
    size = "text-sm px-4 py-2",
    borderRadius = "rounded-lg",
    type = "button",
    className = "",
    Icon,
    iconPosition = "left",
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`${bgColor} ${hoverColor} ${size} ${borderRadius} ${className} transition text-white font-medium flex items-center justify-center space-x-2`}
        >
            {iconPosition === "left" && Icon && <Icon className="mr-2" />}
            {text}
            {iconPosition === "right" && Icon && <Icon className="ml-2" />}
        </button>
    );
};

export default Button;
