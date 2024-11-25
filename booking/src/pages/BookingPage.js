import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SeatSelection from "../components/Show/SeatSelection";
import Tickets from "../components/Tickets/Tickets";
import { Navbar } from "../components/Global/Navbar";

const BookingPage = () => {
	const location = useLocation();
	const { movieTitle, showtime } = location.state || {}; // Retrieve data passed from MovieInfo

	// State to manage selected seats
	const [selectedSeats, setSelectedSeats] = useState([]);

	if (!movieTitle || !showtime) {
		return (
			<p className="text-center mt-8 text-red-500">Invalid booking details.</p>
		);
	}

	return (
		<div>
			<Navbar />
			<div className="p-6">
				<h1 className="text-3xl font-bold text-center mb-6">
					Booking for {movieTitle}
				</h1>
				<h2 className="text-xl text-center mb-4">Showtime: {showtime}</h2>

				{/* Seat Selection Component */}
				<div className="mb-8">
					<SeatSelection
						selectedSeats={selectedSeats}
						setSelectedSeats={setSelectedSeats}
					/>
				</div>

				{/* Tickets Component */}
				{selectedSeats.length > 0 && (
					<Tickets
						selectedSeats={selectedSeats}
						movieTitle={movieTitle}
						showtime={showtime}
					/>
				)}
			</div>
		</div>
	);
};

export default BookingPage;