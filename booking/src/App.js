// src/App.js
import React from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
	return (
		<BrowserRouter>
			<div>
				{/* Routes define which component to render for each path */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/profile" element={<ProfilePage />} />"
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
