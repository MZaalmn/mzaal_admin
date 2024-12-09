import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Button from "../../components/Button";
import SearchInput from "./components/SearchInput";
import NewsList from "./components/NewsList";
import { fetcher } from "../../utils/fetcher";
import NewsCreateModal from "./components/NewsCreateModal";
import EditNewsModal from "./components/EditNewsModal";
import axios from "axios";

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedNewsId, setSelectedNewsId] = useState(null);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [newsData, setNewsData] = useState({});

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

    const openEditModal = (id) => {
        setSelectedNewsId(id);
        setIsNewsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsNewsModalOpen(false);
        setSelectedNewsId(null);
    };

    const handleSave = async () => {};

    //-------------- Add News Modal ---------------//
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const addNewsItem = (newItem) => {
        setNewsItems((prevItems) => [newItem, ...prevItems]);
    };

    //-------------- Add News Modal ---------------//

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this news item?")) {
            try {
                await axios.delete(`http://localhost:8000/news/${id}`);
                setNewsItems((prevItems) =>
                    prevItems.filter((item) => item._id !== id)
                );
                alert("News item deleted successfully.");
            } catch (error) {
                console.error("Error deleting news item:", error);
                alert("An error occurred while deleting the news item.");
            }
        }
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
            <NewsList
                newsItems={newsItems}
                onDelete={handleDelete}
                openEditModal={openEditModal}
            />
            <EditNewsModal
                newsId={selectedNewsId}
                isOpen={isNewsModalOpen}
                onClose={closeEditModal}
                onSave={handleSave}
                newsData={newsData}
                setNewsData={setNewsData}
            />
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
