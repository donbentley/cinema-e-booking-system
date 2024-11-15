import { useState } from "react";
import React from "react";
import MovieInfo from "../Movies/MovieInfo"; // Import MovieInfo for displaying details

const SearchGrid = ({ movies }) => {
	const [selectedMovie, setSelectedMovie] = useState(null); // State to track selected movie

	// Function to handle single and double-click on a movie
	const handleMovieClick = (movie) => {
		if (selectedMovie?.id === movie.id) {
			setSelectedMovie(null); // Close if double-clicked on the same movie
		} else {
			setSelectedMovie(movie); // Open the clicked movie info
		}
	};

	return (
		<div className="container mx-auto p-4">
			{/* Display movies in a grid layout */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
				{movies.map((movie) => (
					<div
						key={movie.id}
						className="cursor-pointer bg-white rounded-md shadow-md overflow-hidden p-2"
						onClick={() => handleMovieClick(movie)} // Handle single and double-click
						onDoubleClick={() => setSelectedMovie(null)} // Double-click to close
					>
						<div className="relative pb-[150%] w-full overflow-hidden">
							<img
								src={movie.pictureLink}
								alt={movie.title}
								className="absolute inset-0 w-full h-full object-cover rounded-md"
							/>
						</div>
						<div className="mt-2 text-center">
							<h2 className="text-xs font-medium">{movie.title}</h2>
						</div>
					</div>
				))}
			</div>

			{/* Display selected movie details */}
			{selectedMovie && (
				<div className="mt-6">
					<MovieInfo movie={selectedMovie} />
				</div>
			)}
		</div>
	);
};

export default SearchGrid;
