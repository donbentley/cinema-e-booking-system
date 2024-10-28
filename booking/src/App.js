// src/App.js
import React from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPassword from "./components/ResetPassword";
import BillingAddress from "./components/BillingAddress";
import PaymentCard from "./components/PaymentCard";
import Verify from "./pages/Verify";
import AdminPage from "./pages/Admin/AdminPage";

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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
