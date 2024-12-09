import React from "react";

const Header = ({ toggleSidebar }) => {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-4 shadow-md">
            <button
                onClick={toggleSidebar}
                className="text-gray-500 focus:outline-none sm:hidden"
            >
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                </svg>
            </button>
            <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
        </header>
    );
};

export default Header;
