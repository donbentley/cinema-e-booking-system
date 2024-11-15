import React, { useState } from "react";
import Slider from "react-slick";
import MovieInfo from "./MovieInfo";

const MovieGrid = ({ movies }) => {
	// State to keep track of the selected movie
	const [selectedMovie, setSelectedMovie] = useState(null);

	// Function to handle single and double-clicks on a movie
	const handleMovieClick = (movie) => {
		if (selectedMovie?.id === movie.id) {
			setSelectedMovie(null); // Close if double-clicked on the same movie
		} else {
			setSelectedMovie(movie); // Open the clicked movie info
		}
	};

	// Slider settings for react-slick
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold text-center mb-6">Now Playing</h1>

			{/* Movie Carousel */}
			<Slider {...settings}>
				{movies.map((movie) => (
					<div
						key={movie.id}
						className="px-2 py-4 cursor-pointer"
						onClick={() => handleMovieClick(movie)}
						onDoubleClick={() => setSelectedMovie(null)} // Double-click to close
					>
						<div className="bg-white rounded-md shadow-md overflow-hidden">
							<div className="relative pb-[150%] w-full overflow-hidden">
								<img
									src={movie.pictureLink}
									alt={movie.title}
									className="absolute inset-0 w-full h-full object-cover"
								/>
							</div>
							<div className="h-14 flex items-center justify-center">
								<h2 className="text-xs font-normal">{movie.title}</h2>
							</div>
						</div>
					</div>
				))}
			</Slider>

			{/* Movie Info Section */}
			{selectedMovie && <MovieInfo movie={selectedMovie} />}
		</div>
	);
};

export default MovieGrid;
