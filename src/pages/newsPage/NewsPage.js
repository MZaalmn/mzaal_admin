import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/Button";
import SearchInput from "./components/SearchInput";
import NewsList from "./components/NewsList";
import { fetcher } from "../../utils/fetcher";
import NewsCreateModal from "./components/NewsCreateModal";

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await fetcher("news");
                setNewsItems(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const addNewsItem = (newItem) => {
        setNewsItems((prevItems) => [newItem, ...prevItems]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users: {error.message}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Мэдээ</h1>
            <div className="flex justify-between my-10">
                <SearchInput />
                <Button
                    text="Нэмэх"
                    bgColor="bg-green-500"
                    className="transition"
                    hoverColor="hover:bg-green-600"
                    Icon={FaPlus}
                    iconPosition="right"
                    onClick={toggleModal}
                />
            </div>
            <NewsList newsItems={newsItems} />
            {isModalOpen && (
                <NewsCreateModal
                    onClose={toggleModal}
                    onAddNews={addNewsItem}
                />
            )}
        </div>
    );
};

export default NewsPage;
