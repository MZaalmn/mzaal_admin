import axios from "axios";
import React, { useState } from "react";

const NewsCreateModal = ({ onClose, onAddNews }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        heroImage: "",
        author: "",
        published: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                "http://localhost:8000/news",
                formData
            );

            if (response.status === 201) {
                onAddNews(response.data.news);
                onClose();
            } else {
                console.error("Failed to create news:", response.data.message);
                setError(response.data.message || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Error:", err.message);
            setError("Failed to create news. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Мэдээ Нэмэх</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">
                            Гарчиг
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="border rounded w-full p-2"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">
                            Тайлбар
                        </label>
                        <textarea
                            name="description"
                            className="border rounded w-full p-2"
                            rows="4"
                            value={formData.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {/* Hero Image */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">
                            Зураг (URL)
                        </label>
                        <input
                            type="text"
                            name="heroImage"
                            className="border rounded w-full p-2"
                            value={formData.heroImage}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Author */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">
                            Нийтлэгч
                        </label>
                        <input
                            type="text"
                            name="author"
                            className="border rounded w-full p-2"
                            value={formData.author}
                            onChange={handleChange}
                        />
                    </div>
                    {/* Published */}
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="published"
                                className="mr-2"
                                checked={formData.published}
                                onChange={handleChange}
                            />
                            Нийтлэх
                        </label>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="text-gray-500 mr-4"
                            onClick={onClose}
                        >
                            Болих
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                            disabled={loading}
                        >
                            {loading ? "Хадгалж байна..." : "Нэмэх"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsCreateModal;
