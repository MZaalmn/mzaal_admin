import React, { useState, useEffect } from "react";
import axios from "axios";

const EditOwnerModal = ({ isOpen, onClose, ownerId, onSave }) => {
    const [ownerData, setOwnerData] = useState({
        username: "",
        email: "",
        role: "",
        image: "",
    });

    // Fetch owner data when modal is opened
    useEffect(() => {
        if (isOpen && ownerId) {
            axios
                .get(`http://localhost:8000/owners/${ownerId}`)
                .then((response) => {
                    setOwnerData({
                        username: response.data.username || "",
                        email: response.data.email || "",
                        role: response.data.role || "",
                        image: response.data.image || "",
                    });
                })
                .catch((error) =>
                    console.error("Error loading owner data", error)
                );
        }
    }, [isOpen, ownerId]);

    // Handle input change for text fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOwnerData({
            ...ownerData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            await axios.put(
                `http://localhost:8000/owners/edit/${ownerId}`,
                ownerData
            );
            onSave();
        } catch (error) {
            console.error("Error saving data", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[50%]">
                <h3 className="text-lg font-bold mb-4">
                    Заал эзэмшигчийн мэдээллийг засах
                </h3>
                <form>
                    {/* Display owner image */}
                    <div className="flex items-center gap-10">
                        <div className="my-2 flex justify-center">
                            {ownerData.image && (
                                <img
                                    src={ownerData.image}
                                    alt="Owner Preview"
                                    className="w-20 h-20 rounded-full border"
                                />
                            )}
                        </div>
                        <div>
                            <label htmlFor="image">Зураг</label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-3 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={handleChange}
                                value={ownerData.image}
                            />
                        </div>
                    </div>
                    {/* Username */}
                    <div>
                        <label htmlFor="username">Нэр</label>

                        <input
                            name="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={ownerData.username}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label htmlFor="email">Цахим хаяг</label>
                        <input
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={ownerData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Role */}
                    <div>
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 my-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={ownerData.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="owner">Owner</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {/* Buttons */}
                    <div className="mt-4 flex justify-between">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Болих
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleSave}
                        >
                            Хадгалах
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditOwnerModal;
