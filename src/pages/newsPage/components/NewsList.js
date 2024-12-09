import React from "react";
import Button from "../../../components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const NewsList = ({ newsItems, onDelete, openEditModal }) => {
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
                        <th scope="col" className="py-3 px-6">
                            Гарчиг
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Мэдээ
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Нийтлэгч
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {newsItems.map((newsItem, index) => (
                        <tr
                            key={newsItem._id}
                            className="bg-white border-b hover:bg-gray-50"
                        >
                            {/* Display row number instead of checkbox */}
                            <td className="py-4 px-6">{index + 1}</td>
                            <td className="py-4 px-6">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={newsItem.heroImage}
                                    alt={newsItem.heroImage}
                                />
                            </td>
                            <td className="py-4 px-6">
                                <div>
                                    <p className="text-gray-900 font-medium line-clamp-2">
                                        {newsItem.title}
                                    </p>
                                </div>
                            </td>
                            <td className="py-4 px-6">
                                <p className="text-gray-500 text-sm line-clamp-2">
                                    {newsItem.description}
                                </p>
                            </td>
                            <td className="py-4 px-6">
                                <div>
                                    <p className="text-gray-900 font-medium line-clamp-2">
                                        {newsItem.author}
                                    </p>
                                </div>
                            </td>
                            <td className="py-4 px-6 flex space-x-2">
                                <Button
                                    onClick={() => openEditModal(newsItem._id)}
                                    className="text-white bg-amber-500 hover:bg-amber-600 font-medium rounded-lg text-sm px-4 py-2"
                                    text={"Засах"}
                                    Icon={FaEdit}
                                />
                                <Button
                                    onClick={() => onDelete(newsItem._id)}
                                    className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2"
                                    text={"Устгах"}
                                    Icon={FaTrash}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NewsList;
