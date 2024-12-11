import React, { useState } from "react";
import axios from "axios";

const PromoCode = ({ tickets, onPromoApplied }) => {
	const [promoCode, setPromoCode] = useState("");
	const [promoMessage, setPromoMessage] = useState("");

	// Retrieve the token from localStorage or wherever you store it
	const token = localStorage.getItem("token");

	const applyPromo = async () => {
		try {
			// Validate tickets before transformation
			tickets.forEach((ticket, index) => {
				if (!ticket.showingId) {
					throw new Error(
						`Missing showingId for ticket at index ${index}: ${JSON.stringify(
							ticket
						)}`
					);
				}
				if (!ticket.seatNumber) {
					throw new Error(
						`Missing seatNumber for ticket at index ${index}: ${JSON.stringify(
							ticket
						)}`
					);
				}
			});

			// Fetch the full showing object for each ticket
			const updatedTickets = await Promise.all(
				tickets.map(async (ticket) => {
					const response = await axios.get(
						`http://localhost:8080/showing/get/${ticket.showingId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);

					return {
						showing: response.data, // Replace showingId with full Showing object
						ticketType: ticket.ticketType,
						seatNumber: ticket.seatNumber, // Ensure seatNumber is included
					};
				})
			);

			console.log("Updated Tickets:", updatedTickets);

			// Send data to the backend
			const response = await axios.get(
				"http://localhost:8080/order/getPrice",
				{ tickets: updatedTickets, promotionString: promoCode },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				onPromoApplied(response.data.price);
				const successMessage = "Promotion applied successfully!";
				setPromoMessage(successMessage);
				console.log(successMessage); // Log success message
				setPromoMessage(successMessage);
				console.log("Promo message updated:", successMessage);
			}
		} catch (error) {
			console.error("Error applying promo code:", error);
			const errorMessage =
				error.response?.data?.msg || "Invalid promotion code.";
			setPromoMessage(errorMessage);
			console.log("Promo application error:", errorMessage); // Log error message
		}
	};

	return (
		<div className="bg-white shadow-md rounded-lg">
			<label className="flex items-center px-5 h-10 border-b text-xs font-bold text-gray-600">
				Apply promotion
			</label>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					applyPromo();
				}}
				className="grid grid-cols-[1fr_80px] gap-3 p-3"
			>
				<input
					type="text"
					placeholder="Add promotions here"
					className="h-9 px-3 border border-gray-200 rounded-lg focus:ring focus:ring-black focus:outline-none"
					value={promoCode}
					onChange={(e) => setPromoCode(e.target.value)}
				/>
				<button
					type="submit"
					className="flex items-center justify-center bg-slate-600 text-white font-semibold text-xs rounded-lg shadow"
				>
					Add Promo
				</button>
			</form>
			{promoMessage && (
				<div className="text-sm text-center text-gray-700 mt-2">
					{promoMessage}
				</div>
			)}
		</div>
	);
};

export default PromoCode;
