import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchInput = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
    return (
        <div>
            <form className="flex items-center w-[500px] max-w-sm mx-auto">
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Хэрэглэгчийн нэр эсвэл имэйлийг оруулна уу..."
                    />
                </div>
                <button
                    type="submit"
                    className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-500 rounded-lg border border-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    <FaSearch />
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </div>
    );
};

export default SearchInput;
