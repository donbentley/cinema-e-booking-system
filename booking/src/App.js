// src/App.js
import React from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
import ResetPassword from "./components/Profile/ResetPassword";
import BillingAddress from "./components/Profile/BillingAddress";
import PaymentCard from "./components/Profile/PaymentCard";
import Verify from "./pages/Auth/Verify";
import AdminPage from "./pages/Admin/AdminPage";
import HardResetPassword from "./pages/Auth/ForgotPasswordForm";
import ResetPasswordPage from "./pages/Auth/ResetPasswordForm";
import BookingPage from "./pages/BookingPage";
import CartPage from "./pages/Checkout/CartPage";
import BookingDetails from "./components/Tickets/BookingDetails";

function App() {
	return (
		<BrowserRouter>
			<div>
				{/* Routes define which component to render for each path */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="profile/reset-password" element={<ResetPassword />} />
					<Route path="profile/billing-address" element={<BillingAddress />} />
					<Route path="profile/payment-card" element={<PaymentCard />} />
					<Route path="auth/verify/:code" element={<Verify />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="/resetpassword" element={<HardResetPassword />} />"
					<Route path="resetpassword/:code" element={<ResetPasswordPage />} />
					<Route path="/booking" element={<BookingPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/booking-details" element={<BookingDetails />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
