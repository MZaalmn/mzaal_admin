import React from "react";
import Button from "../../../components/Button";
import { FaEdit, FaList, FaTrash } from "react-icons/fa";

const UserList = ({ users, onEdit, onDelete, openEditModal }) => {
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
                            Role
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr
                            key={user._id}
                            className="bg-white border-b hover:bg-gray-50"
                        >
                            {/* Display row number instead of checkbox */}
                            <td className="py-4 px-6">{index + 1}</td>
                            <td className="py-4 px-6">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={user.image}
                                    alt={user.username}
                                />
                            </td>
                            <td className="py-4 px-10">
                                <div>
                                    <p className="text-gray-900 font-medium">
                                        {user.username}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {user.email}
                                    </p>
                                </div>
                            </td>
                            <td className="py-4 px-16">{user.role}</td>
                            <td className="py-4 px-6 flex space-x-2">
                                <Button
                                    onClick={() => openEditModal(user._id)}
                                    className="text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-4 py-2"
                                    text={"Засах"}
                                    Icon={FaEdit}
                                />
                                <Button
                                    onClick={() => onDelete(user.id)}
                                    className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
                                    text={"Устгах"}
                                    Icon={FaTrash}
                                />
                                <Button
                                    className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-4 py-2"
                                    text={"Захиалгууд"}
                                    Icon={FaList}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
