import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	ShoppingCartIcon,
	UserIcon,
	UserPlusIcon,
} from "@heroicons/react/20/solid";

const Navbar = () => {
	const navigate = useNavigate();

	// State to track if the user is logged in and the cart count
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		// Check if the token exists in localStorage or other means (you can use sessionStorage, context, etc.)
		const token = localStorage.getItem("token");
		setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true

		// Check if the user is an admin based on the stored role in localStorage
		const role = localStorage.getItem("role");
		setIsAdmin(role === "ROLE_ADMIN"); // If role is 'admin', set isAdmin to true

		// Fetch cart count if logged in
		if (token) {
			// Example: Replace with real cart fetching logic, such as calling an API endpoint
			const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
			setCartCount(cartItems.length);
		}
	}, []);

	// Navigate to cart page when the cart icon is clicked
	const goToCart = () => {
		navigate("/cart");
	};

	// Navigate to profile page
	const goToProfile = () => {
		navigate("/profile");
	};

	// Navigate to admin page
	const goToAdmin = () => {
		navigate("/admin");
	};

	// Handle logout
	const handleLogout = () => {
		localStorage.removeItem("token"); // Remove the token from localStorage
		localStorage.removeItem("role"); // Remove the role from localStorage
		setIsLoggedIn(false); // Update the state
		setCartCount(0); // Reset cart count on logout
		setIsAdmin(false); // Reset admin state on logout
		navigate("/"); // Navigate to the homepage
	};

	// Navigate to home page
	const goToHome = () => {
		navigate("/");
	};

	return (
		<div className="bg-gray-800 p-4">
			<div className="relative flex justify-between items-center">
				{/* Left Side - Navigation Options */}
				<div className="flex space-x-6 z-10">
					{/* Profile Button (if logged in) */}
					{isLoggedIn && (
						<button
							onClick={goToProfile}
							className="text-white hover:text-gray-400 transition-colors"
						>
							<UserIcon className="w-6 h-6" />
						</button>
					)}

					{/* Admin Button (only visible if logged in and user is an admin) */}
					{isAdmin && (
						<button
							onClick={goToAdmin}
							className="text-red-700 hover:text-gray-400 transition-colors"
						>
							<UserPlusIcon className="w-6 h-6" />
						</button>
					)}

					{/* Login or Logout Button */}
					{!isLoggedIn ? (
						<button
							onClick={() => navigate("/login")}
							className="text-white hover:text-gray-400 transition-colors"
						>
							Login
						</button>
					) : (
						<button
							onClick={handleLogout}
							className="text-white hover:text-gray-400 transition-colors"
						>
							Logout
						</button>
					)}
				</div>

				{/* Centered Title */}
				<div className="absolute inset-0 flex justify-center items-center">
					<div
						className="text-white text-2xl font-bold cursor-pointer"
						onClick={goToHome}
					>
						e-cinema
					</div>
				</div>

				{/* Right Side - Cart Button with Counter */}

				{isLoggedIn && (
					<div
						className="relative cursor-pointer text-white hover:text-gray-400 transition-colors ml-6 z-10"
						onClick={goToCart}
					>
						<ShoppingCartIcon className="w-6 h-6" />
						{cartCount > 0 && (
							<span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 rounded-full">
								{cartCount}
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

// Named export for Navbar
export { Navbar };
