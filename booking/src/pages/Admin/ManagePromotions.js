import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	TrashIcon,
	PencilSquareIcon,
	ArrowDownTrayIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const ManagePromotions = () => {
	const [promotions, setPromotions] = useState([]);
	const [newPromotion, setNewPromotion] = useState({ name: "", value: "" });
	const [editingPromotion, setEditingPromotion] = useState(null);

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetchPromotions();
	}, []);

	const fetchPromotions = () => {
		axios
			.get("http://localhost:8080/promotion/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => setPromotions(response.data))
			.catch((err) => console.error("Error fetching promotions:", err));
	};

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:8080/promotion/delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(fetchPromotions)
			.catch((err) => console.error("Error deleting promotion:", err));
	};

	const handleEditClick = (promotion) => {
		setEditingPromotion({ ...promotion });
	};

	const handleSaveEdit = (id) => {
		axios
			.put(`http://localhost:8080/promotion/update/${id}`, editingPromotion, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchPromotions();
				setEditingPromotion(null);
			})
			.catch((err) => console.error("Error updating promotion:", err));
	};

	const handleAddPromotion = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/promotion/add", newPromotion, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchPromotions();
				setNewPromotion({ name: "", value: "" });
			})
			.catch((err) => console.error("Error adding promotion:", err));
	};

	return (
		<div className="container">
			<h2 className="text-2xl font-semibold mb-4">Manage Promotions</h2>
			<div>
				{promotions.map((promotion) => (
					<div
						key={promotion.id}
						className="flex items-center justify-between bg-white rounded-md shadow-md p-4"
					>
						{editingPromotion && editingPromotion.id === promotion.id ? (
							<div>
								<input
									type="text"
									value={editingPromotion.value}
									onChange={(e) =>
										setEditingPromotion({
											...editingPromotion,
											value: e.target.value,
										})
									}
									className="p-2 border rounded-md w-full mb-2"
									placeholder="Promotion Value"
								/>
								<button
									onClick={() => handleSaveEdit(promotion.id)}
									className="bg-green-500 text-white px-4 py-2 rounded-md"
								>
									<ArrowDownTrayIcon className="h-5 w-5" />
								</button>
								<button
									onClick={() => setEditingPromotion(null)}
									className="bg-gray-500 text-white px-4 py-2 rounded-md"
								>
									<XMarkIcon className="h-5 w-5" />
								</button>
							</div>
						) : (
							<div className="flex justify-between w-full">
								<span>
									{promotion.name}: {promotion.value}
								</span>
								<div>
									<button
										onClick={() => handleEditClick(promotion)}
										className="bg-blue-500 text-white px-2 py-1 rounded-md"
									>
										<PencilSquareIcon className="h-5 w-5" />
									</button>
									<button
										onClick={() => handleDelete(promotion.id)}
										className="bg-red-500 text-white px-2 py-1 rounded-md"
									>
										<TrashIcon className="h-5 w-5" />
									</button>
								</div>
							</div>
						)}
					</div>
				))}
			</div>

			<form onSubmit={handleAddPromotion} className="mt-4">
				<input
					type="text"
					placeholder="Promotion Name"
					value={newPromotion.name}
					onChange={(e) =>
						setNewPromotion({ ...newPromotion, name: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				/>
				<input
					type="text"
					placeholder="Promotion Value"
					value={newPromotion.value}
					onChange={(e) =>
						setNewPromotion({ ...newPromotion, value: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				/>
				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded-md"
				>
					Add Promotion
				</button>
			</form>
		</div>
	);
};

export default ManagePromotions;
