import React, { useState, useEffect } from "react";
import { fetcher } from "../../../utils/fetcher";
import axios from "axios";

const HallCreatePage = () => {
    const [hallsTypes, setHallTypes] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        discount: "",
        heroImage: "",
        images: [],
        location: "",
        contactNumber: "",
        types: [],
        owner: "fa000593-eab2-4393-bbd7-65b9af554339",
        perHour: 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await fetcher("hallTypes/checked");
                setHallTypes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    const handleTypeChange = (typeId) => {
        setForm((prev) => ({
            ...prev,
            types: prev.types.includes(typeId)
                ? prev.types.filter((id) => id !== typeId) // Deselect
                : [...prev.types, typeId], // Select
        }));
    };

    const handleImageChange = (e, index) => {
        const { value } = e.target;
        setForm((prev) => {
            const updatedImages = [...prev.images];
            updatedImages[index] = value; // Update the specific image URL
            return { ...prev, images: updatedImages };
        });
    };

    const addImageField = () => {
        setForm((prev) => ({
            ...prev,
            images: [...prev.images, ""], // Add an empty string for a new image URL
        }));
    };

    const removeImage = (index) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index), // Remove the image URL at the specified index
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with types:", form.types);
        setLoading(true);
        setError(null);
        setSuccess(false);

        console.log("Form data to submit:", form);

        try {
            await axios.post("http://localhost:8000/halls", form);
            setSuccess(true);
            setForm({
                title: "",
                description: "",
                price: "",
                discount: "",
                heroImage: "",
                images: [],
                location: "",
                contactNumber: "",
                types: [],
            });
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create hall");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Заал нэмэх</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && (
                <p className="text-green-500 mb-4">Заал амжилттай нэмэгдлээ!</p>
            )}

            <br />
            <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Hall Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block font-medium mb-1"
                        >
                            Заалны нэр
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Hall Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block font-medium mb-1"
                        >
                            Заалны дэлгэрэнгүй
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>

                    {/* Hall Price */}
                    <div>
                        <label
                            htmlFor="price"
                            className="block font-medium mb-1"
                        >
                            Заалны үнэ
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Hall Discount */}
                    <div>
                        <label
                            htmlFor="discount"
                            className="block font-medium mb-1"
                        >
                            Заалны хямдрал
                        </label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Hero Image */}
                    <div>
                        <label
                            htmlFor="heroImage"
                            className="block font-medium mb-1"
                        >
                            Заалны нүүр зураг
                        </label>
                        <input
                            type="text"
                            id="heroImage"
                            name="heroImage"
                            value={form.heroImage}
                            onChange={handleChange}
                            required
                            placeholder="Image URL"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="images"
                            className="block font-medium mb-1"
                        >
                            Заалны зургууд
                        </label>
                        <div>
                            {form.images.map((url, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2 mb-2"
                                >
                                    <input
                                        type="text"
                                        value={url}
                                        onChange={(e) =>
                                            handleImageChange(e, index)
                                        }
                                        placeholder="Image URL"
                                        className="w-full p-2 border rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addImageField}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Image
                        </button>
                    </div>

                    {/* Hall owner */}
                    <div>
                        <label
                            htmlFor="owner"
                            className="block font-medium mb-1"
                        >
                            Заалны owner
                        </label>
                        <input
                            type="text"
                            id="owner"
                            name="owner"
                            value={form.owner}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label
                            htmlFor="location"
                            className="block font-medium mb-1"
                        >
                            Заалны байршил
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label
                            htmlFor="contactNumber"
                            className="block font-medium mb-1"
                        >
                            Заалны холбогдох дугаар
                        </label>
                        <input
                            type="text"
                            id="contactNumber"
                            name="contactNumber"
                            value={form.contactNumber}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Hall Types Section */}
                    <div>
                        <label className="block font-medium mb-1">
                            Заалны төрлүүд
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {hallsTypes.map((type) => (
                                <label
                                    key={type._id}
                                    className="flex border px-3 py-2 items-center space-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={type._id}
                                        checked={form.types.includes(type._id)} // Keep the UI in sync with the state
                                        onChange={() =>
                                            handleTypeChange(type._id)
                                        }
                                    />
                                    <img
                                        src={type.icon}
                                        alt={type.icon}
                                        className="w-10 h-10"
                                    />
                                    <span>{type.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? "Creating..." : "Заал нэмэх"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HallCreatePage;
