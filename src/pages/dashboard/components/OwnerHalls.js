import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const OwnersHallsChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchHalls = async () => {
            try {
                const response = await axios.get("http://localhost:8000/halls");
                const halls = response.data;

                const ownerHallCount = halls.reduce((acc, hall) => {
                    acc[hall.owner] = (acc[hall.owner] || 0) + 1;
                    return acc;
                }, {});

                const labels = Object.keys(ownerHallCount);
                const data = Object.values(ownerHallCount);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Заалны тоо",
                            data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgba(255, 205, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(201, 203, 207, 0.2)",
                            ],
                            borderColor: [
                                "rgb(255, 99, 132)",
                                "rgb(255, 159, 64)",
                                "rgb(255, 205, 86)",
                                "rgb(75, 192, 192)",
                                "rgb(54, 162, 235)",
                                "rgb(153, 102, 255)",
                                "rgb(201, 203, 207)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching halls data:", error);
            }
        };

        fetchHalls();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Заал эзэмшигчийн нэр дээрх заалны тоо",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Заал эзэмшигчийн ID",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Заалны тоо",
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">
                Заал эзэмшигчийн нэр дээрх заалны тоо
            </h2>
            {chartData ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default OwnersHallsChart;