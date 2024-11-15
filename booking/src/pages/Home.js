import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Global/Navbar";
import MovieGrid from "../components/Movies/MovieGrid";
import axios from "axios";
import Search from "../components/Search/Search"; // Make sure this path is correct
import Showtimes from "../components/Showtimes/Showtimes";
const Home = () => {
	const [movies, setMovies] = useState(null);

	useEffect(() => {
		axios
			.get("http://localhost:8080/movie/getAll")
			.then((response) => {
				setMovies(response.data); // Ensure the correct response data structure
			})
			.catch((err) => {
				console.error("Error fetching movies:", err);
			});
	}, []);

	return (
		<div>
			<Navbar />
			{movies && <Search movies={movies} />}
			<MovieGrid movies={movies || []} />
		</div>
	);
};

export default Home;
