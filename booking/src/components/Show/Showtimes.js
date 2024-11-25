import React, { useEffect, useState } from "react";
import axios from "axios";

const Showtimes = ({ movieId, onSelectShowtime }) => {
	const [showtimes, setShowtimes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Helper function to format dateTime
	const formatDateTime = (dateTimeString) => {
		const dateTime = new Date(dateTimeString);
		let hours = dateTime.getHours();
		const minutes = dateTime.getMinutes();
		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12 || 12; // Convert 0 hours to 12 for 12-hour format
		const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Ensure two digits for minutes
		return `${hours}:${formattedMinutes} ${ampm}`;
	};

	useEffect(() => {
		// Fetch showtimes for the selected movie from the backend
		const fetchShowtimes = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/showing/getAll/movie/${movieId}`
				);
				setShowtimes(response.data); // Set showtimes from response
			} catch (err) {
				setError("Failed to fetch showtimes");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchShowtimes();
	}, [movieId]); // Re-fetch if movieId changes

	if (loading) return <div>Loading showtimes...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="flex flex-col items-center px-3 py-3">
			<h2 className="text-xl font-bold mb-2">Showtimes</h2>
			<div className="flex justify-center gap-4 flex-wrap">
				{showtimes.length > 0 ? (
					showtimes.map((show, index) => (
						<button
							key={index}
							className="px-4 py-2 bg-slate-600 text-white rounded-full hover:bg-slate-700"
							onClick={() => onSelectShowtime(formatDateTime(show.dateTime))}
						>
							{formatDateTime(show.dateTime)}
						</button>
					))
				) : (
					<p>No showtimes available for this movie.</p>
				)}
			</div>
		</div>
	);
};

export default Showtimes;
