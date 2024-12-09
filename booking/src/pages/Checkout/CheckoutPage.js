import React, { useState } from "react";

const CheckoutPage = () => {
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		paymentMethod: "Credit Card",
	});

	const [cartItems] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	const calculateTotal = () => {
		return cartItems
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Your order has been placed!");
		// Optionally clear cart after checkout
		localStorage.removeItem("cart");
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-lg font-semibold">Name</label>
					<input
						type="text"
						value={userInfo.name}
						onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
						required
						className="w-full p-2 border rounded"
					/>
				</div>

				<div>
					<label className="block text-lg font-semibold">Email</label>
					<input
						type="email"
						value={userInfo.email}
						onChange={(e) =>
							setUserInfo({ ...userInfo, email: e.target.value })
						}
						required
						className="w-full p-2 border rounded"
					/>
				</div>

				<div>
					<label className="block text-lg font-semibold">Payment Method</label>
					<select
						value={userInfo.paymentMethod}
						onChange={(e) =>
							setUserInfo({ ...userInfo, paymentMethod: e.target.value })
						}
						className="w-full p-2 border rounded"
					>
						<option value="Credit Card">Credit Card</option>
						<option value="PayPal">PayPal</option>
					</select>
				</div>

				<div className="mt-6 flex justify-between text-xl font-semibold">
					<span>Total: ${calculateTotal()}</span>
					<button
						type="submit"
						className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition-colors"
					>
						Place Order
					</button>
				</div>
			</form>
		</div>
	);
};

export default CheckoutPage;
