import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/Tickets/CartItem"; // Child component for rendering individual cart items

const CartPage = () => {
	const navigate = useNavigate();

	// Fetch cart items from localStorage or initialize with an empty array
	const [cartItems, setCartItems] = useState(() => {
		const savedCart = localStorage.getItem("cart");
		return savedCart ? JSON.parse(savedCart) : [];
	});

	// Calculate the total cost
	const calculateTotal = () => {
		return cartItems
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	// Handle removing an item from the cart
	const removeItem = (id) => {
		const updatedCart = cartItems.filter((item) => item.id !== id);
		setCartItems(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	// Handle updating item quantity
	const updateQuantity = (id, quantity) => {
		const updatedCart = cartItems.map((item) =>
			item.id === id ? { ...item, quantity: parseInt(quantity) } : item
		);
		setCartItems(updatedCart);
		localStorage.setItem("cart", JSON.stringify(updatedCart));
	};

	// Handle checkout
	const handleCheckout = () => {
		if (cartItems.length === 0) {
			alert("Your cart is empty!");
		} else {
			navigate("/checkout");
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

			{cartItems.length === 0 ? (
				<p className="text-center">Your cart is empty.</p>
			) : (
				<div>
					<div className="space-y-4">
						{cartItems.map((item) => (
							<CartItem
								key={item.id}
								item={item}
								updateQuantity={updateQuantity}
								removeItem={removeItem}
							/>
						))}
					</div>

					<div className="mt-6 flex justify-between text-xl font-semibold">
						<span>Total: ${calculateTotal()}</span>
						<button
							onClick={handleCheckout}
							className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors"
						>
							Checkout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPage;
