import React, { useState } from "react";
import Button from "../../../components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const HallTypeList = ({ hallTypes, onEdit, onDelete, onUpdate }) => {
    const [editingId, setEditingId] = useState(null);
    const [editableData, setEditableData] = useState({});

    const handleEditClick = (hallType) => {
        setEditingId(hallType._id);
        setEditableData({ ...hallType }); // Clone hallType data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(editableData); // Pass the updated data to parent
        setEditingId(null); // Exit edit mode
    };

    const handleCancel = () => {
        setEditingId(null); // Exit edit mode without saving
    };

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            №
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Зураг
                        </th>
                        <th scope="col" className="py-3 px-10">
                            Нэр
                        </th>
                        <th scope="col" className="py-3 px-16">
                            Төлөв
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {hallTypes.map((hallType, index) => (
                        <tr
                            key={hallType._id}
                            className="bg-white border-b hover:bg-gray-50"
                        >
                            <td className="py-4 px-6">{index + 1}</td>
                            <td className="py-4 px-6">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={hallType.icon}
                                    alt={hallType.name}
                                />
                            </td>
                            <td className="py-4 px-10">
                                {editingId === hallType._id ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={editableData.name || ""}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                ) : (
                                    <p className="text-gray-900 font-medium">
                                        {hallType.name}
                                    </p>
                                )}
                            </td>
                            <td className="py-4 px-16">
                                {editingId === hallType._id ? (
                                    <select
                                        name="status"
                                        value={editableData.status || ""}
                                        onChange={handleChange}
                                        className="p-2 border rounded"
                                    >
                                        <option value="selected">
                                            Selected
                                        </option>
                                        <option value="not_selected">
                                            not_selected
                                        </option>
                                    </select>
                                ) : (
                                    hallType.status
                                )}
                            </td>
                            <td className="py-4 px-6 flex space-x-2">
                                {editingId === hallType._id ? (
                                    <>
                                        <Button
                                            onClick={handleSave}
                                            className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-4 py-2"
                                            text={"Save"}
                                        />
                                        <Button
                                            onClick={handleCancel}
                                            className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2"
                                            text={"Cancel"}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            onClick={() =>
                                                handleEditClick(hallType)
                                            }
                                            className="text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-4 py-2"
                                            text={"Edit"}
                                            Icon={FaEdit}
                                        />
                                        <Button
                                            onClick={() =>
                                                onDelete(hallType._id)
                                            }
                                            className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
                                            text={"Delete"}
                                            Icon={FaTrash}
                                        />
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HallTypeList;
