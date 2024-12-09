import axios from "axios";
import React, { useState } from "react";

const NewsCreateModal = ({ onClose, onAddNews }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        heroImage: "",
        images: [],
        author: "",
        published: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8000/news",
                formData
            );
            const data = await response.json();
            if (response.ok) {
                onAddNews(data.news);
                onClose();
            } else {
                console.log(data);
                console.error("Failed to create news:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Мэдээ Нэмэх</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">
                            Гарчиг
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="border rounded w-full p-2"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">
                            Тайлбар
                        </label>
                        <textarea
                            name="description"
                            className="border rounded w-full p-2"
                            rows="4"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block font-semibold mb-2">
                            Зураг (URL)
                        </label>
                        <input
                            type="text"
                            name="heroImage"
                            className="border rounded w-full p-2"
                            onChange={handleChange}
                        />
                    </div>
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
                        >
                            Нэмэх
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewsCreateModal;
