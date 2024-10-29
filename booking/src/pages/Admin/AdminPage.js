import React, { useState, useEffect } from "react";
import ManageMovies from "./ManageMovies";
import ManagePromotions from "./ManagePromotions";
import ManageUsers from "./ManageUsers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("movies"); // Default tab
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}
		axios
			.get("http://localhost:8080/customer/customer-info", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Error fetching user data");
				}
				setUser(response.data);
			})
			.catch((err) => {
				alert(err);
			});
	}, [navigate]);

	const renderContent = () => {
		switch (activeTab) {
			case "movies":
				return <ManageMovies user={user} />;

			case "promotions":
				return <ManagePromotions user={user}/>;
			case "users":
				return <ManageUsers users={user}/>;
			default:
				return <ManageMovies />;
		}
	};

	return (
		<div>
			<Navbar />
			<div className="flex flex-col items-center p-6 bg-gray-800 min-h-screen">
				<h1 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h1>
				<div className="flex space-x-4 mb-6">
					<button
						className={`px-4 py-2 rounded-full text-white transition-all duration-300 
						${
							activeTab === "movies"
								? "bg-gray-600 ring-2 ring-slate-500 ring-inset"
								: "bg-gray-600 hover:bg-gray-400 "
						}`}
						onClick={() => setActiveTab("movies")}
					>
						Manage Movies
					</button>
					<button
						className={`px-4 py-2 rounded-full text-white transition-all duration-300 
						${
							activeTab === "promotions"
								? "bg-gray-600 ring-2 ring-slate-500 ring-inset"
								: "bg-gray-600 hover:bg-gray-400"
						}`}
						onClick={() => setActiveTab("promotions")}
					>
						Manage Promotions
					</button>
					<button
						className={`px-4 py-2 rounded-full text-white transition-all duration-300 
						${
							activeTab === "users"
								? "bg-gray-600 ring-2 ring-slate-500 ring-inset"
								: "bg-gray-600 hover:bg-gray-400"
						}`}
						onClick={() => setActiveTab("users")}
					>
						Manage Users
					</button>
				</div>
				<div className="w-full max-w-2xl bg-white p-6 rounded-lg  ring-2">
					{renderContent()}
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
