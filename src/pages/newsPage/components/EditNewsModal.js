import React, { useState, useEffect } from "react";
import axios from "axios";

const EditNewsModal = ({ isOpen, onClose, newsId, onSave }) => {
    const [newsData, setNewsData] = useState({
        title: "",
        description: "",
        author: "",
        heroImage: "",
    });

    useEffect(() => {
        if (isOpen && newsId) {
            axios
                .get(`http://localhost:8000/news/${newsId}`)
                .then((response) => {
                    setNewsData({
                        title: response.data.title || "",
                        description: response.data.description || "",
                        author: response.data.author || "",
                        heroImage: response.data.heroImage || "",
                    });
                })
                .catch((error) =>
                    console.error("Error loading news data:", error)
                );
        }
    }, [isOpen, newsId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsData({
            ...newsData,
            [name]: value,
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8000/news/edit/${newsId}`,
                newsData
            );
            window.location.reload();
            onSave();
            onClose();
        } catch (error) {
            console.error("Error saving news:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-2 max-h-[70%] overflow-y-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Мэдээ засах
                </h3>
                <form onSubmit={handleSave}>
                    {/* Image Preview */}
                    <div className="mb-4">
                        {newsData.heroImage && (
                            <div className="flex justify-center mb-4">
                                <img
                                    src={newsData.heroImage}
                                    alt="News Preview"
                                    className="w-full max-w-md rounded border"
                                />
                            </div>
                        )}
                        <label
                            htmlFor="heroImage"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Зураг (URL)
                        </label>
                        <input
                            type="text"
                            name="heroImage"
                            className="w-full border rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={newsData.heroImage}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Title */}
                    <div className="mb-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Гарчиг
                        </label>
                        <textarea
                            name="title"
                            className="w-full border rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={newsData.title}
                            onChange={handleChange}
                            rows={2}
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Мэдээ
                        </label>
                        <textarea
                            name="description"
                            className="w-full border rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={newsData.description}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                    {/* Author */}
                    <div className="mb-4">
                        <label
                            htmlFor="author"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Нийтлэгч
                        </label>
                        <input
                            type="text"
                            name="author"
                            className="w-full border rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                            value={newsData.author}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 focus:outline-none"
                            onClick={onClose}
                        >
                            Болих
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
                        >
                            Хадгалах
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNewsModal;
