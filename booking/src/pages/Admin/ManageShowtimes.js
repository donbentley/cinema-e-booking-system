import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	TrashIcon,
	PencilSquareIcon,
	ArrowDownTrayIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const ManageShowtimes = () => {
	const [movies, setMovies] = useState([]);
	const [showrooms, setShowrooms] = useState([]);
	const [showings, setShowings] = useState([]);
	const [newShowing, setNewShowing] = useState({
		movie: null,
		showroom: null,
		dateTime: "",
	});
	const [editingShowing, setEditingShowing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const token = localStorage.getItem("token");

	const api = axios.create({
		baseURL: "http://localhost:8080",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	useEffect(() => {
		if (!token) {
			setError("No authentication token found. Please log in.");
			setLoading(false);
			return;
		}
		fetchInitialData();
	}, []);

	const fetchInitialData = async () => {
		try {
			setLoading(true);
			const [moviesRes, showroomsRes, showingsRes] = await Promise.all([
				api.get("/movie/getAll"),
				api.get("/showroom/getAll"),
				api.get("/showing/getAll"),
			]);

			setMovies(moviesRes.data);
			setShowrooms(showroomsRes.data);
			setShowings(
				showingsRes.data.filter((showing) => showing.movie && showing.showroom)
			);
			setError(null);
		} catch (err) {
			console.error("Error fetching initial data:", err);
			setError(
				"Failed to load data. Please check your connection and try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/showing/delete/${id}`);
			await fetchInitialData();
		} catch (err) {
			console.error("Error deleting showing:", err);
			setError("Failed to delete showing. Please try again.");
		}
	};

	const handleEditClick = (showing) => {
		if (!showing.movie || !showing.showroom) {
			setError(
				"Cannot edit showing with missing movie or showroom information"
			);
			return;
		}

		setEditingShowing({
			...showing,
			movie: showing.movie,
			showroom: showing.showroom,
		});
	};

	const handleSaveEdit = async (id) => {
		if (
			!editingShowing.movie ||
			!editingShowing.showroom ||
			!editingShowing.dateTime
		) {
			setError("Please fill in all fields");
			return;
		}

		try {
			const updateData = {
				movie: { id: editingShowing.movie.id },
				showroom: { id: editingShowing.showroom.id },
				dateTime: editingShowing.dateTime,
			};

			await api.put(`/showing/update/${id}`, updateData);
			await fetchInitialData();
			setEditingShowing(null);
			setError(null);
		} catch (err) {
			console.error("Error updating showing:", err);
			setError("Failed to update showing. Please try again.");
		}
	};

	const handleAddShowing = async (e) => {
		e.preventDefault();

		if (!newShowing.movie || !newShowing.showroom || !newShowing.dateTime) {
			setError("Please fill in all fields");
			return;
		}

		try {
			const showingData = {
				movie: { id: parseInt(newShowing.movie) },
				showroom: { id: parseInt(newShowing.showroom) },
				dateTime: newShowing.dateTime,
			};

			await api.post("/showing/addNew", showingData);
			await fetchInitialData();
			setNewShowing({ movie: null, showroom: null, dateTime: "" });
			setError(null);
		} catch (err) {
			console.error("Error adding showing:", err);
			setError(
				"Cannot add showing at the same time in the same showroom. Try again."
			);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto p-4">
				<div className="text-center text-sm">Loading showings...</div>
			</div>
		);
	}

	return (
		<div className="p-4">
			<div className="w-full max-w-5xl mx-auto">
				{" "}
				{/* Ensures the container has a max width and is centered */}
				<h2 className="text-xl font-bold mb-4">Manage Showtimes</h2>
				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm">
						{error}
					</div>
				)}
				<form
					onSubmit={handleAddShowing}
					className="grid grid-cols-3 gap-3 mb-6"
				>
					<select
						value={newShowing.movie || ""}
						onChange={(e) =>
							setNewShowing({ ...newShowing, movie: e.target.value })
						}
						className="p-2 text-sm border rounded"
						required
					>
						<option value="">Select Movie</option>
						{movies.map((movie) => (
							<option key={movie.id} value={movie.id}>
								{movie.title}
							</option>
						))}
					</select>

					<select
						value={newShowing.showroom || ""}
						onChange={(e) =>
							setNewShowing({ ...newShowing, showroom: e.target.value })
						}
						className="p-2 text-sm border rounded"
						required
					>
						<option value="">Select Showroom</option>
						{showrooms.map((showroom) => (
							<option key={showroom.id} value={showroom.id}>
								{showroom.name}
							</option>
						))}
					</select>

					<input
						type="datetime-local"
						value={newShowing.dateTime}
						onChange={(e) =>
							setNewShowing({ ...newShowing, dateTime: e.target.value })
						}
						className="p-2 text-sm border rounded"
						required
					/>

					<button
						type="submit"
						className="bg-green-500 text-white text-sm px-3 py-1 rounded col-span-3"
					>
						Add Showing
					</button>
				</form>
				{/* Table section with centering */}
				<div className="overflow-x-auto">
					<table className="table-auto w-full text-sm mx-auto">
						{" "}
						{/* 'mx-auto' for centering */}
						<thead>
							<tr className="bg-gray-200">
								<th className="p-2">Movie</th>
								<th className="p-2">Showroom</th>
								<th className="p-2">Time</th>
								<th className="p-2">Actions</th>
							</tr>
						</thead>
						<tbody>
							{showings.map((showing) =>
								editingShowing?.id === showing.id ? (
									<tr key={showing.id} className="border-t">
										<td className="p-2">
											<select
												value={editingShowing.movie?.id || ""}
												onChange={(e) =>
													setEditingShowing({
														...editingShowing,
														movie: movies.find(
															(movie) => movie.id === parseInt(e.target.value)
														),
													})
												}
												className="p-2 text-sm border rounded"
												required
											>
												<option value="">Select Movie</option>
												{movies.map((movie) => (
													<option key={movie.id} value={movie.id}>
														{movie.title}
													</option>
												))}
											</select>
										</td>
										<td className="p-2">
											<select
												value={editingShowing.showroom?.id || ""}
												onChange={(e) =>
													setEditingShowing({
														...editingShowing,
														showroom: showrooms.find(
															(showroom) =>
																showroom.id === parseInt(e.target.value)
														),
													})
												}
												className="p-2 text-sm border rounded"
												required
											>
												<option value="">Select Showroom</option>
												{showrooms.map((showroom) => (
													<option key={showroom.id} value={showroom.id}>
														{showroom.name}
													</option>
												))}
											</select>
										</td>
										<td className="p-2">
											<input
												type="datetime-local"
												value={editingShowing.dateTime}
												onChange={(e) =>
													setEditingShowing({
														...editingShowing,
														dateTime: e.target.value,
													})
												}
												className="p-2 text-sm border rounded"
												required
											/>
										</td>
										<td className="p-2 flex space-x-2">
											<button
												onClick={() => handleSaveEdit(showing.id)}
												className="bg-green-500 text-white text-sm px-2 py-1 rounded"
											>
												Save
											</button>
											<button
												onClick={() => setEditingShowing(null)}
												className="bg-gray-500 text-white text-sm px-2 py-1 rounded"
											>
												Cancel
											</button>
										</td>
									</tr>
								) : (
									<tr key={showing.id} className="border-t">
										<td className="p-2">{showing.movie?.title}</td>
										<td className="p-2">{showing.showroom?.name}</td>
										<td className="p-2">
											{new Date(showing.dateTime).toLocaleString()}
										</td>
										<td className="p-2 flex space-x-2">
											<button
												onClick={() => handleEditClick(showing)}
												className="bg-blue-500 text-white text-sm px-2 py-1 rounded"
											>
												<PencilSquareIcon className="h-4 w-4" />
											</button>
											<button
												onClick={() => handleDelete(showing.id)}
												className="bg-red-500 text-white text-sm px-2 py-1 rounded"
											>
												<TrashIcon className="h-4 w-4" />
											</button>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ManageShowtimes;
