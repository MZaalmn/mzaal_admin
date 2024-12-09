import React, { useEffect, useState } from "react";
import { fetcher } from "../../utils/fetcher";
import SearchInput from "./components/SearchInput";
import OwnerList from "./components/OwnerList";
import OwnerModal from "./components/OwnerModal";
import Button from "../../components/Button";
import { FaPlus } from "react-icons/fa";
import UserSelectList from "./components/UserSelectList";
import axios from "axios";
import EditOwnerModal from "./components/EditOwnerModal";
import { useNavigate } from "react-router-dom";

const OwnersPage = () => {
    const navigate = useNavigate();

    const [selectedOwnerId, setSelectedOwnerId] = useState(null);
    const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

    const [owners, setOwners] = useState([]);
    const [filteredOwners, setFilteredOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState("");

    const [ownerData, setOwnerData] = useState({});

    const handleSearch = (query) => {
        const filtered = owners.filter(
            (owner) =>
                owner.username.toLowerCase().includes(query.toLowerCase()) ||
                owner.email.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredOwners(filtered);
    };

    //get owners
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetcher("owners");
                setOwners(data);
                setFilteredOwners(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // ---------------------------- Add User ---------------------------- //
    const openModal = async () => {
        try {
            const data = await fetcher("users");
            setUsers(data);
            setIsModalOpen(true);
        } catch (err) {
            setError(err);
        }
    };

    const handleAddUser = async () => {
        if (!selectedUser) {
            setMessage("Please select a user first.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await axios.post(
                    "http://localhost:8000/owners/add-owner",
                    {
                        userId: selectedUser._id,
                    }
                );

                if (response.status === 200) {
                    setMessage("User successfully added to owners.");
                    setTimeout(() => closeModal(), 1000);
                    // window.location.reload();
                } else {
                    setMessage("Unexpected response.");
                }
            } catch (error) {
                console.error("Error adding user:", error);
                setMessage("Failed to add user.");
            }
        }
    };

    // ---------------------------- Add User Modal ---------------------------- //
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setMessage("");
    };

    // ---------------------------- Add User Modal ---------------------------- //

    // ---------------------------- Edit Owner Modal ---------------------------- //
    const openEditModal = (id) => {
        setSelectedOwnerId(id);
        setIsOwnerModalOpen(true);
    };

    const closeEditModal = () => {
        setIsOwnerModalOpen(false);
        setSelectedOwnerId(null);
    };

    // ---------------------------- Edit Owner Modal ---------------------------- //

    const handleSave = async () => {};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users: {error.message}</p>;

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setOwners(owners.filter((owner) => owner.id !== id));
        }
    };

    const fetchOwnerHalls = (ownerId) => {
        navigate(`/ownersHalls/${ownerId}`);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Заал эзэмшигчид</h1>
            <div className="flex justify-between my-10">
                <SearchInput onSearch={handleSearch} />
                <Button
                    text="Нэмэх"
                    bgColor="bg-green-500"
                    className="transition"
                    hoverColor="hover:bg-green-600"
                    Icon={FaPlus}
                    iconPosition="right"
                    onClick={openModal}
                />
            </div>
            <OwnerList
                onViewHalls={fetchOwnerHalls}
                owners={filteredOwners}
                onDelete={handleDelete}
                openEditModal={openEditModal}
            />
            {/* Modal with owner edit */}
            <EditOwnerModal
                isOpen={isOwnerModalOpen}
                onClose={closeEditModal}
                ownerId={selectedOwnerId}
                onSave={handleSave}
                ownerData={ownerData}
                setOwnerData={setOwnerData}
            />
            {/* Modal with user selection */}
            <OwnerModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">
                        Заал эзэмшигчид нэмэх
                    </h2>
                    <UserSelectList users={users} onSelect={handleUserSelect} />
                    {selectedUser && (
                        <div className="mt-4">
                            <div className="flex justify-start mx-10 gap-5 items-center">
                                <img
                                    src={selectedUser.image}
                                    alt={selectedUser.username}
                                    className="w-20 h-20 rounded-full border-4 border-amber-500 "
                                />
                                <div>
                                    <p>Нэр: {selectedUser.username}</p>
                                    <p>Цахим хаяг: {selectedUser.email}</p>
                                    сонгосон байна.
                                </div>
                            </div>
                            <button
                                className="mt-5 w-full bg-blue-500 hover:bg-green-500 transition text-white px-3 py-1 rounded"
                                onClick={handleAddUser}
                            >
                                Нэмэх
                            </button>
                        </div>
                    )}
                    {message && (
                        <p className="mt-2 text-sm text-green-500">{message}</p>
                    )}
                </div>
            </OwnerModal>
        </div>
    );
};

export default OwnersPage;
