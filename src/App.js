import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/SideBar";

import Dashboard from "./pages/dashboard/Dashboard";
import UserPage from "./pages/usersPage/UserPage";
import NewsPage from "./pages/newsPage/NewsPage";
import OwnersPage from "./pages/ownersPage/OwnersPage";
import Footer from "./components/layout/Footer";
import OwnerHallsPage from "./pages/ownersPage/ownerHalls/OwnerHallsPage";

const App = () => {
    return (
        <Router>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    {/* <Navbar /> */}
                    <div className="flex-1 overflow-y-auto p-5 m-3 border rounded-lg">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/news" element={<NewsPage />} />
                            <Route path="/owners" element={<OwnersPage />} />
                            <Route path="/users" element={<UserPage />} />
                            <Route
                                path="/ownersHalls/:ownerId"
                                element={<OwnerHallsPage />}
                            />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    );
};

export default App;
