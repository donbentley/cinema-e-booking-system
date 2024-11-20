import { TicketIcon } from "@heroicons/react/24/outline";
import React from "react";
import GetTicketsButton from "./GetTicketsButton";
import Showtimes from "../Showtimes/Showtimes"; // Import the Showtimes component

// MovieInfo Component
const MovieInfo = ({ movie }) => {
	if (!movie) return null;

	const handleReviewClick = () => {
		window.open(movie.reviewLink, "_blank"); // Opens review link in a new tab
	};
	const handleTrailerClick = () => {
		window.open(movie.trailerLink, "_blank"); // Opens trailer link in a new tab
	};

	return (
		<div className="bg-gray-800 text-white p-6 rounded-lg shadow-md mt-8 relative">
			{/* Set flex direction to row for all screen sizes */}
			<div className="flex flex-row items-start">
				{/* Movie Poster with hover effect */}
				<div className="w-48 h-72 flex-shrink-0 relative group">
					{/* Overlay and Text on Hover */}
					<div
						className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer"
						onClick={handleTrailerClick}
					>
						<span className="text-white text-sm font-semibold">
							View Trailer
						</span>
					</div>
					<img
						src={movie.pictureLink}
						alt={movie.title}
						className="rounded-md shadow-lg w-full h-full object-cover"
					/>
				</div>

				{/* Movie Details */}
				<div className="ml-8 flex flex-col justify-between w-full">
					<h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
					<p className="text-sm text-gray-400 mb-4">
						<strong>Category:</strong> {movie.category} <br />
						<strong>Director:</strong> {movie.director} <br />
						<strong>Producer:</strong> {movie.producer} <br />
						<strong>Cast:</strong> {movie.cast.join(", ")} <br />
						<strong>Rating:</strong> {movie.mpaaRating} <br />
						<strong
							onClick={handleReviewClick}
							className="underline cursor-pointer hover:text-gray-100"
						>
							Review
						</strong>
					</p>
					<p className="text-gray-300 mb-4">
						<strong>Synopsis:</strong> {movie.synopsis}
					</p>
				</div>
			</div>

			{/* Showtimes component to display showtimes for this movie */}
			<Showtimes movieTitle={movie.title} />
			{/* "Get Tickets" Button Below the Synopsis */}
			<GetTicketsButton />
		</div>
	);
};

export default MovieInfo;