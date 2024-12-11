import React from "react";
import { Link } from "react-router-dom"; // Import Link

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <div className="p-4 text-center text-2xl font-bold border-b border-gray-700">
                Admin Panel
            </div>
            <ul className="mt-4 space-y-2 px-4">
                <li>
                    <Link
                        to="/"
                        className="block rounded-lg py-2 px-3 hover:bg-gray-700"
                    >
                        Хянах самбар
                    </Link>
                </li>
                <li>
                    <Link
                        to="/news"
                        className="block rounded-lg py-2 px-3 hover:bg-gray-700"
                    >
                        Мэдээ
                    </Link>
                </li>
                <li>
                    <Link
                        to="/owners"
                        className="block rounded-lg py-2 px-3 hover:bg-gray-700"
                    >
                        Заал эзэмшигчид
                    </Link>
                </li>
                <li>
                    <Link
                        to="/users"
                        className="block rounded-lg py-2 px-3 hover:bg-gray-700"
                    >
                        Хэрэглэгчид
                    </Link>
                </li>
                <li>
                    <Link
                        to="/hallsType"
                        className="block rounded-lg py-2 px-3 hover:bg-gray-700"
                    >
                        Заалны төрлүүд
                    </Link>
                </li>
                <li>
                    <Link
                        to="/hallCreate"
                        className="block rounded-lg py-2 px-3 hover:bg-gray-700"
                    >
                        Заал нэмэх
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
