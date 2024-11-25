import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Global/Navbar";
import MovieGrid from "../components/Movies/MovieGrid";
import axios from "axios";
import Search from "../components/Search/Search";

const Home = () => {
	const [movies, setMovies] = useState(null);
	const [selectedTab, setSelectedTab] = useState("nowShowing"); // Manage the selected tab

	useEffect(() => {
		axios
			.get("http://localhost:8080/movie/getAll")
			.then((response) => {
				setMovies(response.data);
			})
			.catch((err) => {
				console.error("Error fetching movies:", err);
			});
	}, []);

	// Filter movies into "Now Showing" and "Coming Soon"
	const nowShowing = movies?.filter(
		(movie) => movie.showtimes && movie.showtimes.length > 0
	);
	const comingSoon = movies?.filter(
		(movie) => !movie.showtimes || movie.showtimes.length === 0
	);

	return (
		<div>
			<Navbar />
			{movies && <Search movies={movies} />}

			{/* Tab Navigation */}
			<div className="flex justify-center space-x-4">
				<button
					className={`text-xlg font-semibold ${
						selectedTab === "nowShowing" ? "text-gray-800" : "text-gray-600"
					}`}
					onClick={() => setSelectedTab("nowShowing")}
				>
					Now Showing
				</button>
				<button
					className={`text-xlg font-semibold ${
						selectedTab === "comingSoon" ? "text-gray-800" : "text-gray-600"
					}`}
					onClick={() => setSelectedTab("comingSoon")}
				>
					Coming Soon
				</button>
			</div>

			{/* Display movies based on the selected tab */}
			{selectedTab === "nowShowing" && nowShowing && (
				<MovieGrid movies={nowShowing} title="Now Showing" />
			)}
			{selectedTab === "comingSoon" && comingSoon && (
				<MovieGrid movies={comingSoon} title="Coming Soon" />
			)}
		</div>
	);
};

export default Home;
