// src/app/UserList.js
import React, { useEffect, useState } from "react";
import { fetcher } from "../utils/fetcher";

//Comment
const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetcher("users");
                setUsers(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users: {error.message}</p>;

    return (
        <div>
            <h1>Бүртгүүлсэн хэрэглэгчид</h1>
            <ul className="bg-primary hover:bg-primary-light transition">
                {users.map((user) => (
                    <li key={user._id}>
                        {user.username} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
