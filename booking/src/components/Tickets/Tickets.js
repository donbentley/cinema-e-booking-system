import React, { useState } from "react";

const Tickets = ({ selectedSeats, movieTitle, showtime }) => {
	const [ticketDetails, setTicketDetails] = useState({});

	// Update ticket type and price for a seat
	const updateTicketPrice = (seat, ticketType, price) => {
		setTicketDetails((prev) => ({
			...prev,
			[seat]: { ticketType, price },
		}));
	};

	// Calculate total cost
	const totalCost = Object.values(ticketDetails).reduce(
		(sum, ticket) => sum + parseFloat(ticket.price || 0),
		0
	);

	return (
		<div className="flex flex-col items-center px-6 py-4">
			<h2 className="text-lg text-center mb-4">
				You have selected {selectedSeats.length} seats for the {showtime}{" "}
				showing.
			</h2>

			{/* Ticket Details */}
			{selectedSeats.length > 0 && (
				<div className="mt-6 flex flex-col items-center">
					<h2 className="text-xl font-bold mb-4">Ticket Details</h2>
					<div className="space-y-4">
						{selectedSeats.map((seat, index) => (
							<div
								key={index}
								className="flex items-center space-x-4 justify-center"
							>
								<span className="font-medium">Seat {seat}</span>
								<select
									className="ticket-type bg-gray-100 border border-gray-400 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-md transition-all"
									onChange={(e) => {
										const selectedOption =
											e.target.options[e.target.selectedIndex];
										const ticketType = selectedOption.value;
										const price = selectedOption.dataset.price;
										updateTicketPrice(seat, ticketType, price);
									}}
									required
								>
									<option value="" disabled selected>
										Select Age Group
									</option>
									<option value="Adult" data-price="12.00">
										Adult - $12.00
									</option>
									<option value="Child" data-price="8.00">
										Child - $8.00
									</option>
									<option value="Senior" data-price="8.00">
										Senior - $8.00
									</option>
								</select>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Total Cost */}
			<div className="mt-6 text-xl font-bold text-center">
				Total Cost: ${totalCost.toFixed(2)}
			</div>

			<button
				className="mt-4 bg-red-800 text-white px-4 py-2 rounded hover:bg-red-900 transition-colors"
				onClick={() => alert("Tickets booked!")}
			>
				Confirm Tickets
			</button>
		</div>
	);
};

export default Tickets;
