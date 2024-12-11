import React, { useEffect, useState } from "react";
import HallTypeList from "./components/HallTypeList";
import { fetcher } from "../../utils/fetcher";
import axios from "axios";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa";

const HallsType = () => {
    const [hallTypes, setHallTypes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [newHallType, setNewHallType] = useState({
        name: "",
        status: "selected",
        icon: "",
    });

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const data = await fetcher("hallTypes");
                setHallTypes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTypes();
    }, []);

    const handleUpdate = async (updatedData) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/hallTypes/${updatedData._id}`,
                {
                    name: updatedData.name,
                    status: updatedData.status,
                    icon: updatedData.icon,
                }
            );

            console.log("Response from server:", response);
            window.location.reload();
        } catch (error) {
            console.error("Error during request:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/hallTypes/${id}`);
            setHallTypes((prev) => prev.filter((type) => type._id !== id));
        } catch (err) {
            console.error("Failed to delete hall type:", err);
            setError("Failed to delete hall type");
        }
    };

    const handleCreate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8000/hallTypes`,
                newHallType
            );
            console.log("Created Hall Type:", response.data);
            setHallTypes((prev) => [...prev, response.data]);
            setShowModal(false);
            setNewHallType({ name: "", status: "", icon: "" }); // Reset the form
        } catch (error) {
            console.error("Failed to create hall type:", error);
            setError("Failed to create hall type");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Заалны төрлүүд</h1>
            <div className="flex justify-between my-10">
                <Button
                    text="Нэмэх"
                    bgColor="bg-green-500"
                    className="transition"
                    hoverColor="hover:bg-green-600"
                    Icon={FaPlus}
                    iconPosition="right"
                    onClick={() => setShowModal(true)}
                />
            </div>
            <HallTypeList
                hallTypes={hallTypes}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">
                            Create New Hall Type
                        </h2>
                        <input
                            type="text"
                            placeholder="Нэр"
                            value={newHallType.name}
                            onChange={(e) =>
                                setNewHallType({
                                    ...newHallType,
                                    name: e.target.value,
                                })
                            }
                            className="border py-2 px-4 mb-4 w-full"
                        />
                        <input
                            type="text"
                            placeholder="Зураг URL"
                            value={newHallType.icon}
                            onChange={(e) =>
                                setNewHallType({
                                    ...newHallType,
                                    icon: e.target.value,
                                })
                            }
                            className="border py-2 px-4 mb-4 w-full"
                        />
                        <div className="flex justify-between mt-4">
                            <Button
                                text="Cancel"
                                bgColor="bg-red-500"
                                hoverColor="hover:bg-red-600"
                                className="text-white py-2 px-4 rounded"
                                onClick={() => setShowModal(false)}
                            />
                            <Button
                                text="Save"
                                bgColor="bg-green-500"
                                hoverColor="hover:bg-green-600"
                                className="text-white py-2 px-4 rounded"
                                onClick={handleCreate}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HallsType;
