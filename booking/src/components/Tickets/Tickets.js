import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Tickets = ({ selectedSeats, movieTitle, showtime, showingId }) => {
	const [ticketDetails, setTicketDetails] = useState({});
	const [ticketTypes, setTicketTypes] = useState([]);
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			axios
				.get("http://localhost:8080/order/getTicketPrices", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setTicketTypes(response.data);
				})
				.catch((error) => {
					console.error("Error fetching ticket types:", error);
				});
		} else {
			console.error("No token found, user is not authenticated");
		}
	}, [token]);

	const updateTicketPrice = (seat, ticketType, price, ticketTypeId) => {
		setTicketDetails((prev) => ({
			...prev,
			[seat]: { ticketType, price, ticketTypeId },
		}));
	};

	const totalCost = Object.values(ticketDetails).reduce(
		(sum, ticket) => sum + parseFloat(ticket.price || 0),
		0
	);

	const handleCheckout = () => {
		// Prepare ticket details for the request
		const tickets = selectedSeats.map((seat) => {
			const { ticketType } = ticketDetails[seat] || {};
			return {
				showing: { id: showingId },
				ticketType: { name: ticketType },
				seatNumber: parseInt(seat, 10),
			};
		});

		// Passing necessary data to CartPage via navigation state
		navigate("/cart", {
			state: {
				selectedSeats,
				ticketDetails,
				totalCost,
				movieTitle,
				showtime,
				showingId,
			},
		});
	};

	return (
		<div className="flex flex-col items-center px-6 py-4">
			<h2 className="text-lg text-center mb-4">
				You have selected {selectedSeats.length} seats for the {showtime}{" "}
				showing.
			</h2>

			{selectedSeats.length > 0 && (
				<div className="mt-6 flex flex-col items-center">
					<h2 className="text-xl font-bold mb-4">Ticket Details</h2>
					<div className="space-y-4">
						{selectedSeats.map((seat, index) => (
							<div
								key={index}
								className="flex items-center space-x-4 justify-center"
							>
								<span className="font-medium">{seat}</span>
								<select
									className="ticket-type bg-gray-100 border border-gray-400 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-md transition-all"
									onChange={(e) => {
										const selectedOption =
											e.target.options[e.target.selectedIndex];
										const ticketType = selectedOption.value;
										const price = selectedOption.dataset.price;
										const ticketTypeId = selectedOption.dataset.id; // Ensure ticketTypeId is passed
										updateTicketPrice(seat, ticketType, price, ticketTypeId);
									}}
									value={ticketDetails[seat]?.ticketType || ""}
									required
								>
									<option value="" disabled>
										Select Age Group
									</option>
									{ticketTypes.map((ticket) => (
										<option
											key={ticket.id}
											value={ticket.name}
											data-price={ticket.price}
											data-id={ticket.id} // Add ticketTypeId as a data attribute
										>
											{ticket.name} - ${ticket.price.toFixed(2)}
										</option>
									))}
								</select>
							</div>
						))}
					</div>
				</div>
			)}

			<div className="mt-6 text-xl font-bold text-center">
				Total Cost: ${totalCost.toFixed(2)}
			</div>

			<button
				className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
				onClick={handleCheckout}
			>
				Continue to Checkout
			</button>
		</div>
	);
};

export default Tickets;
