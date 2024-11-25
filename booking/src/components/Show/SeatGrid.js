import React, { useState } from "react";
import { FilmIcon } from "@heroicons/react/24/outline";

// SeatGrid Component
const SeatGrid = ({ seats, toggleSeat, rowLetters }) => {
	return (
		<div className="flex flex-col items-center">
			{/* Screen area */}
			<div className="w-72 h-2 bg-gray-700 rounded text-center text-gray-500 mb-2"></div>
			<h2 className="font-extralight mb-4">screen</h2>

			{/* Seat Grid */}
			<div className="grid grid-cols-4 gap-6">
				{seats.map((row, rowIndex) =>
					row.map((isSelected, colIndex) => (
						<button
							key={`${rowIndex}-${colIndex}`}
							onClick={() => toggleSeat(rowIndex, colIndex)}
							className={`transition ease-in w-12 h-12 rounded-lg ${
								isSelected ? "bg-yellow-500" : "bg-gray-300"
							} hover: focus:outline-none`}
						>
							<span className="font-light">
								{rowLetters[rowIndex]}-{colIndex + 1}
							</span>
							<FilmIcon className="transition ease-in w-4 h-4 m-auto" />
						</button>
					))
				)}
			</div>
		</div>
	);
};

export default SeatGrid;
