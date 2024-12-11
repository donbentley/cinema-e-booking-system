import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "../../components/Global/Navbar";
import TicketItem from "../../components/Tickets/TicketItem";
import CartPaymentCard from "../../components/Tickets/CartPaymentCard";
import PromoCode from "../../components/Tickets/PromoCode";
const CartPage = () => {
	const location = useLocation();
	const navigate = useNavigate();

	// Extract cart data from location state
	const {
		selectedSeats,
		ticketDetails = {},
		totalCost,
		movieTitle,
		showtime,
	} = location.state || {};

	// State for user data
	const [user, setUser] = useState(null);

	// Fetch user data on component mount
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/"); // Redirect to login if not authenticated
			return;
		}

		axios
			.get("http://localhost:8080/customer/customer-info", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Error fetching user data");
				}
				setUser(response.data);
			})
			.catch((error) => {
				console.error("Failed to fetch user data:", error);
				alert("Unable to fetch user data. Please try again.");
			});
	}, [navigate]);
	const [updatedTotalCost, setUpdatedTotalCost] = useState(totalCost);
	const handlePromoApplied = (newPrice) => {
		setUpdatedTotalCost(newPrice);
	};
	// Recalculate total cost dynamically

	return (
		<div>
			<Navbar />
			<div className="flex flex-col items-center p-6 bg-white min-h-screen">
				<h1 className="text-3xl font-bold text-center mb-6">
					Your Cart - {movieTitle} @ ({showtime})
				</h1>

				<div className="grid gap-5 mt-6 w-full max-w-xl">
					{/* Cart Items Section */}
					<div className="bg-white shadow-md rounded-lg">
						<label className="flex items-center px-5 h-10 border-b text-xs font-bold text-gray-600">
							Your Cart
						</label>
						<div className="flex flex-col p-3">
							{/* Pass the seat and its details to TicketItem */}
							{Object.entries(ticketDetails).map(([seat, ticket], index) => (
								<TicketItem key={index} seat={seat} details={ticket} />
							))}
						</div>
					</div>

					{/* Payment Section */}
					<CartPaymentCard
						user={user}
						onCardSelect={(card) => console.log("Selected Card:", card)}
					/>
					<PromoCode
						tickets={Object.values(ticketDetails)}
						onPromoApplied={handlePromoApplied}
					/>

					{/* Checkout Section */}
					<div className="bg-white shadow-md rounded-lg">
						<label className="flex items-center px-5 h-10 border-b text-xs font-bold text-gray-600">
							Checkout
						</label>
						<div className="flex items-center justify-between p-3 bg-gray-100">
							<label className="text-xl font-black text-gray-900">
								Total: ${updatedTotalCost.toFixed(2)}
							</label>
							<button className="flex items-center justify-center w-36 h-9 bg-red-700 text-white font-semibold text-sm rounded-lg shadow">
								Book Tickets
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
