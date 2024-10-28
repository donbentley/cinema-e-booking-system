import React from "react";
import { Navbar } from "../components/Navbar";
import MovieGrid from "../components/MovieGrid";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
	const [movies, setMovies] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:8080/movie/getAll") // No token required
			.then((response) => {
				setMovies(response.data); // Ensure you’re accessing the correct property of response
			})
			.catch((err) => {
				console.error("Error fetching movies:", err); // Log errors to identify issues
			});
	}, []);

	return (
		<div>
			<Navbar />
			<MovieGrid movies={movies || []} />
		</div>
	);
};

export default Home;
