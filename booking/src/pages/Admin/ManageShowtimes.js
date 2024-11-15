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
	const [showtimes, setShowtimes] = useState([]);
	const [newShowtime, setNewShowtime] = useState({
		movieId: "",
		showTime: "",
		auditorium: "",
	});
	const [editingShowtime, setEditingShowtime] = useState(null);

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetchMovies();
		fetchShowtimes();
	}, []);

	const fetchMovies = () => {
		axios
			.get("http://localhost:8080/movie/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => setMovies(response.data))
			.catch((err) => console.error("Error fetching movies:", err));
	};

	const fetchShowtimes = () => {
		axios
			.get("http://localhost:8080/showtime/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => setShowtimes(response.data))
			.catch((err) => console.error("Error fetching showtimes:", err));
	};

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:8080/showtime/delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(fetchShowtimes)
			.catch((err) => console.error("Error deleting showtime:", err));
	};

	const handleEditClick = (showtime) => {
		setEditingShowtime({ ...showtime });
	};

	const handleSaveEdit = (id) => {
		axios
			.put(`http://localhost:8080/showtime/update/${id}`, editingShowtime, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchShowtimes();
				setEditingShowtime(null);
			})
			.catch((err) => console.error("Error updating showtime:", err));
	};

	const handleAddShowtime = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:8080/showtime/add", newShowtime, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchShowtimes();
				setNewShowtime({ movieId: "", showTime: "", auditorium: "" });
			})
			.catch((err) => console.error("Error adding showtime:", err));
	};

	return (
		<div className="container">
			<h2 className="text-2xl font-semibold mb-4">Manage Showtimes</h2>
			<div>
				{showtimes.map((showtime) => (
					<div
						key={showtime.id}
						className="flex items-center justify-between bg-white rounded-md shadow-md p-4"
					>
						{editingShowtime && editingShowtime.id === showtime.id ? (
							<div>
								<select
									value={editingShowtime.showTime}
									onChange={(e) =>
										setEditingShowtime({
											...editingShowtime,
											showTime: e.target.value,
										})
									}
									className="p-2 border rounded-md w-full mb-2"
								>
									<option value="1:30PM">1:30PM</option>
									<option value="4:30PM">4:30PM</option>
									{/* Add more times as needed */}
								</select>
								<select
									value={editingShowtime.auditorium}
									onChange={(e) =>
										setEditingShowtime({
											...editingShowtime,
											auditorium: e.target.value,
										})
									}
									className="p-2 border rounded-md w-full mb-2"
								>
									<option value="A">A</option>
									<option value="B">B</option>
									{/* Add more auditoriums as needed */}
								</select>
								<button
									onClick={() => handleSaveEdit(showtime.id)}
									className="bg-green-500 text-white px-4 py-2 rounded-md"
								>
									<ArrowDownTrayIcon className="h-5 w-5" />
								</button>
								<button
									onClick={() => setEditingShowtime(null)}
									className="bg-gray-500 text-white px-4 py-2 rounded-md"
								>
									<XMarkIcon className="h-5 w-5" />
								</button>
							</div>
						) : (
							<div className="flex justify-between w-full">
								<span>
									{showtime.movieName} - {showtime.showTime} - Auditorium:{" "}
									{showtime.auditorium}
								</span>
								<div>
									<button
										onClick={() => handleEditClick(showtime)}
										className="bg-blue-500 text-white px-2 py-1 rounded-md"
									>
										<PencilSquareIcon className="h-5 w-5" />
									</button>
									<button
										onClick={() => handleDelete(showtime.id)}
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

			<form onSubmit={handleAddShowtime} className="mt-4">
				<select
					value={newShowtime.movieId}
					onChange={(e) =>
						setNewShowtime({ ...newShowtime, movieId: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				>
					<option value="">Select Movie</option>
					{movies.map((movie) => (
						<option key={movie.id} value={movie.id}>
							{movie.name}
						</option>
					))}
				</select>
				<input
					type="text"
					placeholder="Showtime"
					value={newShowtime.showTime}
					onChange={(e) =>
						setNewShowtime({ ...newShowtime, showTime: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				/>
				<input
					type="text"
					placeholder="Auditorium"
					value={newShowtime.auditorium}
					onChange={(e) =>
						setNewShowtime({ ...newShowtime, auditorium: e.target.value })
					}
					className="p-2 border rounded-md w-full mb-2"
					required
				/>
				<button
					type="submit"
					className="bg-green-500 text-white px-4 py-2 rounded-md"
				>
					Add Showtime
				</button>
			</form>
		</div>
	);
};

export default ManageShowtimes;
