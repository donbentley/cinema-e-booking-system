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
				"cannot add showing at the same time in the same showroom. try again"
			);
		}
	};

	if (loading) {
		return (
			<div className="container mx-auto p-4">
				<div className="text-center">Loading showings...</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-6">Manage Showtimes</h2>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{error}
				</div>
			)}

			<form onSubmit={handleAddShowing} className="grid grid-cols-3 gap-4 mb-6">
				<select
					value={newShowing.movie || ""}
					onChange={(e) =>
						setNewShowing({ ...newShowing, movie: e.target.value })
					}
					className="p-2 border rounded"
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
					className="p-2 border rounded"
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
					className="p-2 border rounded"
					required
				/>

				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded col-span-3"
				>
					Add Showing
				</button>
			</form>

			<table className="table-auto w-full bg-white shadow-md rounded">
				<thead>
					<tr className="bg-gray-200">
						<th className="p-4">Movie</th>
						<th className="p-4">Showroom</th>
						<th className="p-4">Time</th>
						<th className="p-4">Actions</th>
					</tr>
				</thead>
				<tbody>
					{showings.map((showing) => (
						<tr key={showing.id} className="border-t">
							<td className="p-4">{showing.movie?.title}</td>
							<td className="p-4">{showing.showroom?.name}</td>
							<td className="p-4">
								{new Date(showing.dateTime).toLocaleString()}
							</td>
							<td className="p-4 flex space-x-2">
								<button
									onClick={() => handleEditClick(showing)}
									className="bg-blue-500 text-white px-2 py-1 rounded"
								>
									<PencilSquareIcon className="h-5 w-5" />
								</button>
								<button
									onClick={() => handleDelete(showing.id)}
									className="bg-red-500 text-white px-2 py-1 rounded"
								>
									<TrashIcon className="h-5 w-5" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ManageShowtimes;
