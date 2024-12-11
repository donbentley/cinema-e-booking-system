import React, { useState } from "react";
import SeatGrid from "./SeatGrid";

const SeatSelection = ({ selectedSeats, setSelectedSeats, showingId }) => {
	const rows = 3; // Number of rows
	const cols = 4; // Number of columns
	const totalSeats = rows * cols;
	const initialSeats = Array(rows)
		.fill(null)
		.map(() => Array(cols).fill(false));

	const [seats, setSeats] = useState(initialSeats);

	const toggleSeat = (row, col) => {
		const updatedSeats = seats.map((seatRow, rowIndex) =>
			seatRow.map((seat, colIndex) =>
				rowIndex === row && colIndex === col ? !seat : seat
			)
		);
		setSeats(updatedSeats);

		// Update selectedSeats array
		const seatNumber = row * cols + col + 1; // Sequential seat numbering
		if (updatedSeats[row][col]) {
			setSelectedSeats((prev) => [...prev, `${seatNumber}`]);
		} else {
			setSelectedSeats((prev) =>
				prev.filter((seat) => seat !== `${seatNumber}`)
			);
		}
	};

	// Example: If showingId is needed for external operations
	console.log(`Managing seat selection for showing ID: ${showingId}`);

	return (
		<div>
			<SeatGrid seats={seats} toggleSeat={toggleSeat} />
		</div>
	);
};

export default SeatSelection;
