import React from "react";
import HallsPriceChart from "./components/HallsPrice";
import OwnersHallsChart from "./components/OwnerHalls";

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Анализ</h1>
            <div className="my-10">
                <HallsPriceChart />
            </div>
            <div className="my-10">
                <OwnersHallsChart />
            </div>
        </div>
    );
};

export default Dashboard;
