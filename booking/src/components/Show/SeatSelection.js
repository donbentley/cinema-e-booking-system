import React, { useState } from "react";
import SeatGrid from "./SeatGrid";

const SeatSelection = ({ selectedSeats, setSelectedSeats }) => {
	const initialSeats = Array(3)
		.fill(null)
		.map(() => Array(4).fill(false));
	const [seats, setSeats] = useState(initialSeats);
	const rowLetters = ["A", "B", "C"];

	const toggleSeat = (row, col) => {
		const updatedSeats = seats.map((seatRow, rowIndex) =>
			seatRow.map((seat, colIndex) =>
				rowIndex === row && colIndex === col ? !seat : seat
			)
		);
		setSeats(updatedSeats);

		// Update selectedSeats array
		const seatLabel = `${rowLetters[row]}-${col + 1}`;
		if (updatedSeats[row][col]) {
			setSelectedSeats((prev) => [...prev, seatLabel]);
		} else {
			setSelectedSeats((prev) => prev.filter((seat) => seat !== seatLabel));
		}
	};

	return (
		<div>
			<SeatGrid seats={seats} toggleSeat={toggleSeat} rowLetters={rowLetters} />
		</div>
	);
};

export default SeatSelection;
