import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import { fetcher } from "../../utils/fetcher";

import SearchInput from "./components/SearchInput";
// import { useNavigate } from "react-router-dom";
import EditUserModal from "./components/EditUserModal";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const navigate = useNavigate();

    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    const [userData, setUserData] = useState({});

    const handleSearch = (query) => {
        const filtered = users.filter(
            (user) =>
                user.username.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetcher("users");
                setUsers(data);
                setFilteredUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const openEditModal = (id) => {
        setSelectedUserId(id);
        setIsUserModalOpen(true);
    };

    const closeEditModal = () => {
        setIsUserModalOpen(false);
        setSelectedUserId(null);
    };

    const handleSave = async () => {};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users: {error.message}</p>;

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter((user) => user.id !== id));
        }
    };

    return (
        <div className="">
            <h1 className="text-2xl font-bold mb-4">Хэрэглэчид</h1>
            <div className="flex justify-between my-10">
                <SearchInput onSearch={handleSearch} />
            </div>
            <UserList
                users={filteredUsers}
                onDelete={handleDelete}
                openEditModal={openEditModal}
            />
            <EditUserModal
                isOpen={isUserModalOpen}
                onClose={closeEditModal}
                userId={selectedUserId}
                onSave={handleSave}
                userData={userData}
                setUserData={setUserData}
            />
        </div>
    );
};

export default UsersPage;
