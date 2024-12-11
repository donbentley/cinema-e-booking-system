import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Tickets = ({ selectedSeats, movieTitle, showtime }) => {
	const [ticketDetails, setTicketDetails] = useState({});
	const [ticketTypes, setTicketTypes] = useState([]); // State to hold ticket types
	const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
	const navigate = useNavigate(); // Initialize navigate hook

	// Fetch ticket types when the component mounts
	useEffect(() => {
		// Check if token exists
		if (token) {
			// Fetch ticket types from the backend with Authorization header
			axios
				.get("http://localhost:8080/order/getTicketPrices", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					setTicketTypes(response.data); // Set the fetched ticket types to state
				})
				.catch((error) => {
					console.error("Error fetching ticket types:", error);
					// You may handle the error more gracefully here, e.g., show a notification
				});
		} else {
			console.error("No token found, user is not authenticated");
		}
	}, [token]); // Empty dependency array ensures it runs once when the component mounts

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

	// Handle checkout button click
	const handleCheckout = () => {
		// Pass the ticket details and total cost to the cart page
		navigate("/cart", {
			state: {
				selectedSeats,
				ticketDetails,
				totalCost,
				movieTitle,
				showtime,
			},
		});
	};

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
									value={ticketDetails[seat]?.ticketType || ""} // Set the value here
									required
								>
									<option value="" disabled>
										Select Age Group
									</option>
									{/* Dynamically render ticket types from the backend */}
									{ticketTypes.map((ticket) => (
										<option
											key={ticket.id}
											value={ticket.name}
											data-price={ticket.price}
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

			{/* Total Cost */}
			<div className="mt-6 text-xl font-bold text-center">
				Total Cost: ${totalCost.toFixed(2)}
			</div>

			<button
				className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
				onClick={handleCheckout} // Call handleCheckout to navigate to the cart
			>
				Continue to Checkout
			</button>
		</div>
	);
};

export default Tickets;
