import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	TrashIcon,
	PencilSquareIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const ManagePromotions = () => {
	const [promotions, setPromotions] = useState([]);
	const [newPromotion, setNewPromotion] = useState({ event: "", discount: 0 });
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

	const handleSaveEdit = (e) => {
		e.preventDefault();
		axios
			.put(
				`http://localhost:8080/promotion/update/${editingPromotion.id}`,
				editingPromotion,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then(() => {
				fetchPromotions();
				setEditingPromotion(null);
			})
			.catch((err) => console.error("Error updating promotion:", err));
	};
	const handleSendPromotion = (id) => {
		axios
			.post(
				`http://localhost:8080/promotion/send/${id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((response) => alert(response.data.msg))
			.catch((err) => {
				console.error("Error sending promotion:", err);
				alert(
					err.response?.data?.msg ||
						"An error occurred while sending the promotion."
				);
			});
	};

	const handleAddPromotion = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/promotion/addNew", newPromotion, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchPromotions();
				setNewPromotion({ event: "", discount: 0 });
			})
			.catch((err) => console.error("Error adding promotion:", err));
	};
	const handleActivate = async (id) => {
		try {
			console.log("Activating promotion with ID:", id);
			const response = await axios.put(
				`http://localhost:8080/promotion/activate/${id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			console.log("Activation response:", response.data);
			fetchPromotions(); // Refresh the promotions list
		} catch (error) {
			console.error("Error activating promotion:", error);
		}
	};
	return (
		<div className="container py-2 my-2">
			<h2 className="text-2xl font-semibold mb-4">Manage Promotions</h2>

			{/* Add New Promotion */}
			<form onSubmit={handleAddPromotion} className="mt-4 mb-4">
				<input
					type="text"
					placeholder="Event name"
					value={newPromotion.event}
					onChange={(e) =>
						setNewPromotion({ ...newPromotion, event: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				/>
				<input
					type="number"
					placeholder="Discount (%)"
					value={newPromotion.discount}
					onChange={(e) =>
						setNewPromotion({
							...newPromotion,
							discount: e.target.value ? parseFloat(e.target.value) : "",
						})
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

			{/* Edit Promotion */}
			{editingPromotion && (
				<form
					onSubmit={handleSaveEdit}
					className="mb-4 bg-gray-100 p-4 rounded"
				>
					<h3 className="text-lg font-medium mb-2">Edit Promotion</h3>
					<input
						type="text"
						placeholder="Event name"
						value={editingPromotion.event}
						onChange={(e) =>
							setEditingPromotion({
								...editingPromotion,
								event: e.target.value,
							})
						}
						className="p-2 border rounded-md w-full mb-2"
						required
					/>
					<input
						type="number"
						placeholder="Discount (%)"
						value={editingPromotion.discount}
						onChange={(e) =>
							setEditingPromotion({
								...editingPromotion,
								discount: e.target.value ? parseFloat(e.target.value) : "",
							})
						}
						className="p-2 border rounded-md w-full mb-2"
						required
					/>
					<div className="flex space-x-2">
						<button
							type="submit"
							className="bg-blue-500 text-white px-4 py-2 rounded-md"
						>
							Save
						</button>
						<button
							type="button"
							onClick={() => setEditingPromotion(null)}
							className="bg-gray-500 text-white px-4 py-2 rounded-md"
						>
							Cancel
						</button>
					</div>
				</form>
			)}

			{/* List Promotions */}
			<table className="table-auto w-full  bg-white shadow-md rounded">
				<thead>
					<tr className="bg-gray-200">
						<th className="p-4">Promo</th>
						<th className="p-4">Discount (%)</th>
						<th className="p-4">Status</th>
						<th className="p-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{promotions.map((promotion) => (
						<tr key={promotion.id} className="border-t">
							<td className="p-4">{promotion.event}</td>
							<td className="p-4">{promotion.discount}% Off</td>
							<td className="p-4">
								{promotion.active ? "(Active)" : "(Inactive)"}
							</td>
							<td className="p-4">
								<div className="flex justify-center items-center space-x-4">
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
									{!promotion.active && (
										<button
											onClick={() => handleActivate(promotion.id)}
											className="bg-yellow-500 text-white px-2 py-1 rounded-md"
										>
											Activate
										</button>
									)}
									{promotion.active && (
										<button
											onClick={() => handleSendPromotion(promotion.id)}
											className="bg-purple-500 text-white px-2 py-1 rounded-md"
										>
											send
										</button>
									)}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ManagePromotions;
