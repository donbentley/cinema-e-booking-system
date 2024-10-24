// src/App.js
import React from "react";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Join from "./pages/Join";

function App() {
	return (
		<BrowserRouter>
			<div>
				{/* Routes define which component to render for each path */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/join" element={<Join />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
