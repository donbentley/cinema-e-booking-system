import React, { useState } from "react";
import { FilmIcon } from "@heroicons/react/24/outline";
import SeatGrid from "./SeatGrid";
const SeatSelection = () => {
	// Define a 3x4 grid of seats; initially, all are unselected
	const initialSeats = Array(3)
		.fill(null)
		.map(() => Array(4).fill(false));
	const [seats, setSeats] = useState(initialSeats);

	// Array to map row index to row letter
	const rowLetters = ["A", "B", "C"];

	// Handle seat selection
	const toggleSeat = (row, col) => {
		const updatedSeats = seats.map((seatRow, rowIndex) =>
			seatRow.map((seat, colIndex) =>
				rowIndex === row && colIndex === col ? !seat : seat
			)
		);
		setSeats(updatedSeats);
	};

	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-2xl font-bold mt-2 mb-10">Select your Seats</h1>

			{/* Main container for seat grid and selected seats */}
			<div className="flex flex-row items-start space-x-24">
				{/* Left Section: Seat Grid */}
				<SeatGrid
					seats={seats}
					toggleSeat={toggleSeat}
					rowLetters={rowLetters}
				/>

				{/* Right Section: Selected seats summary */}
				<div>
					<h2 className="text-lg font-semibold mb-4 ml-6">Your Seats:</h2>
					<ul className="transition ease-in list-inside space-y-1">
						{seats.flatMap((row, rowIndex) =>
							row.map((isSelected, colIndex) =>
								isSelected ? (
									<li key={`${rowIndex}-${colIndex}`}>
										Seat {rowLetters[rowIndex]}-{colIndex + 1}
									</li>
								) : null
							)
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default SeatSelection;
