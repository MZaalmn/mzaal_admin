import React, { useState } from "react";
import Button from "../../../components/Button";

const UserSelectList = ({ users, onSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Handle the search query change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-2 max-h-60 overflow-y-auto">
            {/* Search Input */}
            <input
                type="text"
                className="border w-full p-2 rounded-lg"
                placeholder="Нэр эсвэл цахим шуудангаар хайх..."
                value={searchQuery}
                onChange={handleSearchChange}
            />

            {/* Filtered user list */}
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <div
                        key={user._id}
                        className="flex justify-between items-center border p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={() => onSelect(user)}
                    >
                        <div className="flex items-center gap-5">
                            <div className="ml-2">
                                {user.image && (
                                    <img
                                        src={user.image}
                                        alt="Owner Preview"
                                        className="w-10 h-10 rounded-full border"
                                    />
                                )}
                            </div>
                            <p>
                                {user.username} - {user.email}
                            </p>
                        </div>
                        <Button
                            hoverColor="hover:bg-green-500"
                            className="transition"
                            text="Сонгох"
                        />
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Ийм хэрэглэгч олдсонгүй.</p>
            )}
        </div>
    );
};

export default UserSelectList;
