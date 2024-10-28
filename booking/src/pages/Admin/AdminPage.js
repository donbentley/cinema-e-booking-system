import React, { useState } from "react";
import ManageMovies from "./ManageMovies";
import ManagePromotions from "./ManagePromotions";
import ManageUsers from "./ManageUsers";

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("movies"); // Default tab

	const renderContent = () => {
		switch (activeTab) {
			case "movies":
				return <ManageMovies />;
			case "promotions":
				return <ManagePromotions />;
			case "users":
				return <ManageUsers />;
			default:
				return <ManageMovies />;
		}
	};

	return (
		<div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
			<h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
			<div className="flex space-x-4 mb-6">
				<button
					className={`px-4 py-2 rounded-md text-white transition-all duration-300 
						${activeTab === "movies" ? "bg-gray-600" : "bg-gray-300 hover:bg-gray-400"}`}
					onClick={() => setActiveTab("movies")}
				>
					Manage Movies
				</button>
				<button
					className={`px-4 py-2 rounded-md text-white transition-all duration-300 
						${
							activeTab === "promotions"
								? "bg-gray-600"
								: "bg-gray-300 hover:bg-gray-400"
						}`}
					onClick={() => setActiveTab("promotions")}
				>
					Manage Promotions
				</button>
				<button
					className={`px-4 py-2 rounded-md text-white transition-all duration-300 
						${activeTab === "users" ? "bg-gray-600" : "bg-gray-300 hover:bg-gray-400"}`}
					onClick={() => setActiveTab("users")}
				>
					Manage Users
				</button>
			</div>
			<div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
				{renderContent()}
			</div>
		</div>
	);
};

export default AdminPage;
