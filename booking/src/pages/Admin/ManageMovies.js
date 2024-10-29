import axios from "axios";
import { useState, useEffect } from "react";
import {
	TrashIcon,
	PencilSquareIcon,
	ArrowDownTrayIcon,
	XCircleIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const ManageMovies = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isAdding, setIsAdding] = useState(false); // State for toggling add form
	const [editingMovie, setEditingMovie] = useState(null); // State for movie being edited
	const [newMovie, setNewMovie] = useState({
		title: "",
		category: "",
		cast: "",
		director: "",
		producer: "",
		synopsis: "",
		reviewLink: "",
		pictureLink: "",
		trailerLink: "",
		mpaaRating: "",
	});

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = () => {
		setLoading(true);
		axios
			.get("http://localhost:8080/movie/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setMovies(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching movies:", err);
				setLoading(false);
			});
	};

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:8080/movie/delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => fetchMovies())
			.catch((err) => console.error("Error deleting movie:", err));
	};

	const handleEditClick = (movie) => {
		setEditingMovie({ ...movie, cast: movie.cast.join(", ") });
	};

	const handleCancelEdit = () => {
		setEditingMovie(null);
	};

	const handleSaveEdit = (id) => {
		const updatedMovie = {
			...editingMovie,
			cast: editingMovie.cast.split(","),
		};
		axios
			.put(`http://localhost:8080/movie/update/${id}`, updatedMovie, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchMovies();
				setEditingMovie(null);
			})
			.catch((err) => console.error("Error updating movie:", err));
	};

	const handleAddMovieClick = () => {
		setIsAdding(!isAdding);
	};

	const handleAddMovie = (e) => {
		e.preventDefault();
		const movieData = { ...newMovie, cast: newMovie.cast.split(",") };
		axios
			.post("http://localhost:8080/movie/addNew", movieData, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchMovies();
				setNewMovie({
					title: "",
					category: "",
					cast: "",
					director: "",
					producer: "",
					synopsis: "",
					reviewLink: "",
					pictureLink: "",
					trailerLink: "",
					mpaaRating: "",
				});
				setIsAdding(false);
			})
			.catch((err) => console.error("Error adding movie:", err));
	};

	return (
		<div className="container">
			<h2 className="text-2xl font-semibold mb-4">Manage Movies</h2>
			<p className="text-gray-600">Here you can add, edit, or remove movies.</p>

			{loading ? (
				<p>Loading movies...</p>
			) : (
				<div className="flex flex-col">
					{movies.length > 0 ? (
						movies.map((movie) => (
							<div key={movie.id} className="px-2 py-4">
								{editingMovie && editingMovie.id === movie.id ? (
									// Edit Form
									<div className="bg-white rounded-md shadow-md overflow-hidden p-4">
										<input
											type="text"
											value={editingMovie.title}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													title: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Title"
											required
										/>
										<input
											type="text"
											value={editingMovie.category}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													category: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Category"
											required
										/>
										<input
											type="text"
											value={editingMovie.cast}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													cast: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Cast (comma-separated)"
											required
										/>
										<input
											type="text"
											value={editingMovie.director}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													director: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Director"
											required
										/>
										<input
											type="text"
											value={editingMovie.producer}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													producer: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Producer"
											required
										/>
										<textarea
											value={editingMovie.synopsis}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													synopsis: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Synopsis"
											required
										/>
										<input
											type="text"
											value={editingMovie.reviewLink}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													reviewLink: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Review Link"
										/>
										<input
											type="text"
											value={editingMovie.pictureLink}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													pictureLink: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Picture Link"
										/>
										<input
											type="text"
											value={editingMovie.trailerLink}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													trailerLink: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="Trailer Link"
										/>
										<input
											type="text"
											value={editingMovie.mpaaRating}
											onChange={(e) =>
												setEditingMovie({
													...editingMovie,
													mpaaRating: e.target.value,
												})
											}
											className="p-2 border rounded-md w-full mb-2"
											placeholder="MPAA Rating"
										/>
										<div className="flex justify-end space-x-2 mt-4">
											<button
												onClick={() => handleSaveEdit(movie.id)}
												className="px-4 py-2 bg-green-500 text-white rounded-md"
											>
												<ArrowDownTrayIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</button>
											<button
												onClick={handleCancelEdit}
												className="px-4 py-2 bg-gray-500 text-white rounded-md"
											>
												<XMarkIcon className="h-5 w-5" aria-hidden="true" />
											</button>
										</div>
									</div>
								) : (
									// Movie Display
									<div className="flex items-center justify-between bg-white rounded-md shadow-md overflow-hidden p-4">
										<h2 className="text-lg font-semibold">{movie.title}</h2>
										<div className="flex space-x-2 ml-auto">
											<button
												onClick={() => handleEditClick(movie)}
												className="px-2 py-1 bg-blue-500 text-white rounded-md"
											>
												<PencilSquareIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											</button>
											<button
												onClick={() => handleDelete(movie.id)}
												className="px-2 py-1 bg-red-500 text-white rounded-md flex items-center"
											>
												<TrashIcon className="h-5 w-5" aria-hidden="true" />
											</button>
										</div>
									</div>
								)}
							</div>
						))
					) : (
						<p>No movies available.</p>
					)}
				</div>
			)}

			{/* Add Movie Button */}
			<button
				onClick={handleAddMovieClick}
				className=" justify-centertext-center px-4 py-2 bg-green-500 text-white rounded-md mt-6"
			>
				{isAdding ? "Cancel Adding Movie" : "Add Movie"}
			</button>

			{/* Add Movie Form */}
			{isAdding && (
				<form
					onSubmit={handleAddMovie}
					className="flex flex-col space-y-2 mt-4"
				>
					<input
						type="text"
						placeholder="Title"
						value={newMovie.title}
						onChange={(e) =>
							setNewMovie({ ...newMovie, title: e.target.value })
						}
						className="p-2 border rounded-md"
						required
					/>
					<input
						type="text"
						placeholder="Category"
						value={newMovie.category}
						onChange={(e) =>
							setNewMovie({ ...newMovie, category: e.target.value })
						}
						className="p-2 border rounded-md"
						required
					/>
					<input
						type="text"
						placeholder="Cast (comma-separated)"
						value={newMovie.cast}
						onChange={(e) => setNewMovie({ ...newMovie, cast: e.target.value })}
						className="p-2 border rounded-md"
					/>
					<input
						type="text"
						placeholder="Director"
						value={newMovie.director}
						onChange={(e) =>
							setNewMovie({ ...newMovie, director: e.target.value })
						}
						className="p-2 border rounded-md"
					/>
					<input
						type="text"
						placeholder="Producer"
						value={newMovie.producer}
						onChange={(e) =>
							setNewMovie({ ...newMovie, producer: e.target.value })
						}
						className="p-2 border rounded-md"
					/>
					<textarea
						placeholder="Synopsis"
						value={newMovie.synopsis}
						onChange={(e) =>
							setNewMovie({ ...newMovie, synopsis: e.target.value })
						}
						className="p-2 border rounded-md"
					/>
					<input
						type="text"
						placeholder="Review Link"
						value={newMovie.reviewLink}
						onChange={(e) =>
							setNewMovie({ ...newMovie, reviewLink: e.target.value })
						}
						className="p-2 border rounded-md"
					/>
					<input
						type="text"
						placeholder="Picture Link"
						value={newMovie.pictureLink}
						onChange={(e) =>
							setNewMovie({ ...newMovie, pictureLink: e.target.value })
						}
						className="p-2 border rounded-md"
					/>
					<input
						type="text"
						placeholder="Trailer Link"
						value={newMovie.trailerLink}
						onChange={(e) =>
							setNewMovie({ ...newMovie, trailerLink: e.target.value })
						}
						className="p-2 border rounded-md"
					/>
					<input
						type="text"
						placeholder="MPAA Rating"
						value={newMovie.mpaaRating}
						onChange={(e) =>
							setNewMovie({ ...newMovie, mpaaRating: e.target.value })
						}
						className="p-2 border rounded-md"
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
					>
						Add Movie
					</button>
				</form>
			)}
		</div>
	);
};

export default ManageMovies;
