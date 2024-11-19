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
		movieId: "",
		showroomId: "",
		dateTime: "",
	});
	const [editingShowing, setEditingShowing] = useState(null);

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetchMovies();
		fetchShowrooms();
		fetchShowings();
	}, []);

	// Fetch the list of movies
	const fetchMovies = () => {
		axios
			.get("http://localhost:8080/movie/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setMovies(response.data);
			})
			.catch((err) => console.error("Error fetching movies:", err));
	};

	// Fetch the list of showrooms
	const fetchShowrooms = () => {
		axios
			.get("http://localhost:8080/showroom/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setShowrooms(response.data);
				console.log("Fetched showrooms:", response.data); // Log the fetched showrooms
			})
			.catch((err) => console.error("Error fetching showrooms:", err));
	};

	// Fetch the list of showings
	const fetchShowings = () => {
		axios
			.get("http://localhost:8080/showing/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => setShowings(response.data))
			.catch((err) => console.error("Error fetching showings:", err));
	};

	// Handle delete of a showing
	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:8080/showing/delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(fetchShowings)
			.catch((err) => console.error("Error deleting showing:", err));
	};

	// Handle edit click to modify a showing
	const handleEditClick = (showing) => {
		setEditingShowing({ ...showing });
	};

	// Handle saving edited showing
	const handleSaveEdit = (id) => {
		axios
			.put(`http://localhost:8080/showing/update/${id}`, editingShowing, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchShowings();
				setEditingShowing(null);
			})
			.catch((err) => console.error("Error updating showing:", err));
	};

	// Handle adding new showing
	const handleAddShowing = (e) => {
		e.preventDefault();

		// Log the new showing data to check if it's correct
		console.log("Adding new showing:", newShowing);

		axios
			.post("http://localhost:8080/showing/addNew", newShowing, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchShowings();
				setNewShowing({ movieId: "", showroomId: "", dateTime: "" });
			})
			.catch((err) => console.error("Error adding showing:", err));
	};

	return (
		<div className="container">
			<h2 className="text-2xl font-semibold mb-4">Manage Showings</h2>

			{/* Displaying showings */}
			<div>
				{showings.map((showing) => (
					<div
						key={showing.id}
						className="flex items-center justify-between bg-white rounded-md shadow-md p-4"
					>
						{editingShowing && editingShowing.id === showing.id ? (
							<div>
								<input
									type="datetime-local"
									value={editingShowing.dateTime}
									onChange={(e) =>
										setEditingShowing({
											...editingShowing,
											dateTime: e.target.value,
										})
									}
									className="p-2 border rounded-md w-full mb-2"
								/>
								<button
									onClick={() => handleSaveEdit(showing.id)}
									className="bg-green-500 text-white px-4 py-2 rounded-md"
								>
									<ArrowDownTrayIcon className="h-5 w-5" />
								</button>
								<button
									onClick={() => setEditingShowing(null)}
									className="bg-gray-500 text-white px-4 py-2 rounded-md"
								>
									<XMarkIcon className="h-5 w-5" />
								</button>
							</div>
						) : (
							<div className="flex justify-between w-full">
								<span>
									Title:{showing.movie?.title} - Showroom: {showing.showroom?.showroomId.name} -
									Time: {showing.dateTime}
								</span>
								<div>
									<button
										onClick={() => handleEditClick(showing)}
										className="bg-blue-500 text-white px-2 py-1 rounded-md"
									>
										<PencilSquareIcon className="h-5 w-5" />
									</button>
									<button
										onClick={() => handleDelete(showing.id)}
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

			{/* Add Showing Form */}
			<form onSubmit={handleAddShowing} className="mt-4">
				{/* Movie dropdown */}
				<select
					value={newShowing.movieId}
					onChange={(e) =>
						setNewShowing({ ...newShowing, movieId: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				>
					<option value="">Select Movie</option>
					{movies.map((movie) => (
						<option key={movie.id} value={movie.id}>
							{movie.title}
						</option>
					))}
				</select>

				{/* Showroom dropdown */}
				<select
					value={newShowing.showroomId}
					onChange={(e) => {
						setNewShowing({ ...newShowing, showroomId: e.target.value });
						// Log the showroom ID and its details when the user selects a showroom
						const selectedShowroom = showrooms.find(
							(showroom) => showroom.id === e.target.value
						);
						console.log("Selected showroom:", selectedShowroom); // Log selected showroom info
					}}
					className="p-2 border rounded-md w-full mb-2"
					required
				>
					<option value="">Select Showroom</option>
					{showrooms.map((showroom) => (
						<option key={showroom.id} value={showroom.id}>
							{showroom.name}
						</option>
					))}
				</select>

				{/* Date and time input */}
				<input
					type="datetime-local"
					value={newShowing.dateTime}
					onChange={(e) =>
						setNewShowing({ ...newShowing, dateTime: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				/>

				{/* Add Showing Button */}
				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded-md"
				>
					Add Showing
				</button>
			</form>
		</div>
	);
};

export default ManageShowtimes;
