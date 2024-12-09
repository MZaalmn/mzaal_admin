import React, { useState } from "react";
import axios from "axios";
import { FaSignInAlt } from "react-icons/fa";
import Button from "../../components/Button";

const AdminLoginPage = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                "http://localhost:8000/auth/loginAdmin",
                { email, password }
            );

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setError("");
                onLoginSuccess();
            } else {
                setError("Нэвтрэлт амжилтгүй. Дахин оролдно уу.");
            }
        } catch (error) {
            setError("Имэйл эсвэл нууц үг буруу байна.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">
                    Admin Login
                </h1>

                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}

                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Имэйл
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="admin@example.com"
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Нууц үг
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="******"
                    />
                </div>

                <Button
                    text={loading ? "Нэвтрэж байна..." : "Нэвтрэх"}
                    className={`text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm w-full px-4 py-2 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    Icon={FaSignInAlt}
                    onClick={handleLogin}
                    disabled={loading}
                />
            </div>
        </div>
    );
};

export default AdminLoginPage;
