import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetcher } from "../../../utils/fetcher";
import Button from "../../../components/Button";

const OwnerHallsPage = () => {
    const { ownerId } = useParams();
    const navigate = useNavigate();
    const [halls, setHalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const data = await fetcher(`halls/owner/${ownerId}`);
                setHalls(data);
            } catch (err) {
                setError("Failed to fetch halls.");
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHalls();
    }, [ownerId, error]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">
                Заал эзэмшигчийн Заалууд
            </h1>
            <Button
                text="Буцах"
                bgColor="bg-gray-500"
                className="mb-4"
                onClick={() => navigate(-1)}
            />
            {/* Check if no halls exist */}
            {halls.length === 0 ? (
                <div>
                    <p className="text-gray-600">
                        Энэ заал эзэмшигч дээр бүртгэлтэй заал байхгүй байна.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {halls.map((hall) => (
                        <div
                            key={hall._id}
                            className="p-4 border rounded-lg shadow-md flex items-center space-x-4"
                        >
                            <img
                                src={hall.heroImage}
                                alt={hall.title}
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <h3 className="text-lg font-medium mb-1">
                                    {hall.title}
                                </h3>
                                <p className="text-gray-600 mb-1">
                                    {hall.description}
                                </p>
                                <p className="font-medium text-blue-500">
                                    Price: {hall.price}₮ / hour
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OwnerHallsPage;
