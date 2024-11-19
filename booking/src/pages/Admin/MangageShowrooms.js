import axios from "axios";
import { useState, useEffect } from "react";
import {
	TrashIcon,
	PencilSquareIcon,
	PlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

const ManageShowrooms = () => {
	const [showrooms, setShowrooms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isAdding, setIsAdding] = useState(false);
	const [newShowroom, setNewShowroom] = useState({
		name: "",
		numOfSeats: "",
	});

	const token = localStorage.getItem("token");

	useEffect(() => {
		fetchShowrooms();
	}, []);

	const fetchShowrooms = () => {
		setLoading(true);
		axios
			.get("http://localhost:8080/showroom/getAll", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				setShowrooms(response.data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Error fetching showrooms:", err);
				setLoading(false);
			});
	};

	const handleDelete = (id) => {
		axios
			.delete(`http://localhost:8080/showroom/delete/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => fetchShowrooms())
			.catch((err) => console.error("Error deleting showroom:", err));
	};

	const handleAddShowroomClick = () => {
		setIsAdding(!isAdding);
	};

	const handleAddShowroom = (e) => {
		e.preventDefault();
		const showroomData = {
			...newShowroom,
			numOfSeats: parseInt(newShowroom.numOfSeats),
		};

		axios
			.post("http://localhost:8080/showroom/addNew", showroomData, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				fetchShowrooms();
				setNewShowroom({ name: "", numOfSeats: "" });
				setIsAdding(false);
			})
			.catch((err) => console.error("Error adding showroom:", err));
	};

	return (
		<div className="container">
			<h2 className="text-2xl font-semibold mb-4">Manage Showrooms</h2>
			<p className="text-gray-600">Here you can add or remove showrooms.</p>

			{loading ? (
				<p>Loading showrooms...</p>
			) : (
				<div className="flex flex-col">
					{showrooms.length > 0 ? (
						showrooms.map((showroom) => (
							<div
								key={showroom.id}
								className="flex items-center justify-between bg-white rounded-md shadow-md overflow-hidden p-4 mb-2"
							>
								<h2 className="text-lg font-semibold">{showroom.name}</h2>
								<p>Seats: {showroom.numOfSeats}</p>
								<button
									onClick={() => handleDelete(showroom.id)}
									className="px-2 py-1 bg-red-500 text-white rounded-md flex items-center"
								>
									<TrashIcon className="h-5 w-5" aria-hidden="true" />
								</button>
							</div>
						))
					) : (
						<p>No showrooms available.</p>
					)}
				</div>
			)}

			{/* Add Showroom Button */}
			<button
				onClick={handleAddShowroomClick}
				className="px-4 py-2 bg-green-500 text-white rounded-md mt-6"
			>
				{isAdding ? "Cancel Adding Showroom" : "Add Showroom"}
			</button>

			{/* Add Showroom Form */}
			{isAdding && (
				<form
					onSubmit={handleAddShowroom}
					className="flex flex-col space-y-2 mt-4"
				>
					<input
						type="text"
						placeholder="Showroom Name"
						value={newShowroom.name}
						onChange={(e) =>
							setNewShowroom({ ...newShowroom, name: e.target.value })
						}
						className="p-2 border rounded-md"
						required
					/>
					<input
						type="number"
						placeholder="Number of Seats"
						value={newShowroom.numOfSeats}
						onChange={(e) =>
							setNewShowroom({ ...newShowroom, numOfSeats: e.target.value })
						}
						className="p-2 border rounded-md"
						required
					/>
					<button
						type="submit"
						className="px-4 py-2 bg-green-500 text-white rounded-md mt-2"
					>
						Add Showroom
					</button>
				</form>
			)}
		</div>
	);
};

export default ManageShowrooms;
