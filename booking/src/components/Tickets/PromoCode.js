import React, { useState } from "react";
import axios from "axios";

const PromoCode = ({ tickets, onPromoApplied }) => {
	const [promoCode, setPromoCode] = useState("");
	const [promoMessage, setPromoMessage] = useState("");

	// Retrieve the token from localStorage or wherever you store it
	const token = localStorage.getItem("token"); // Or use another method to get the token

	const applyPromo = async () => {
		try {
			const response = await axios.get("http://localhost:8080/order/getPrice", {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
				},
				data: {
					tickets: tickets,
					promotionString: promoCode,
				},
			});
			if (response.status === 200) {
				const updatedOrder = response.data;
				onPromoApplied(updatedOrder.price); // Call parent function to update total
				setPromoMessage("Promotion applied successfully!");
			}
		} catch (error) {
			setPromoMessage(error.response?.data?.msg || "Invalid promotion code.");
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
