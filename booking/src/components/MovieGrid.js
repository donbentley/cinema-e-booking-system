import React from "react";
import Slider from "react-slick";

const MovieGrid = ({ movies }) => {
	// Slider settings for react-slick
	const settings = {
		infinite: true,
		speed: 500,
		slidesToShow: 4, // Number of slides to show
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		cssEase: "linear",
		responsive: [
			{
				breakpoint: 1024, // Screens smaller than 1024px will show 3 slides
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768, // Screens smaller than 768px will show 2 slides
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640, // Screens smaller than 640px will show 1 slide
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold text-center">now playing</h1>
			<Slider {...settings}>
				{movies.map((movie) => (
					<div key={movie.id} className="px-2 py-4">
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
		</div>
	);
};

export default MovieGrid;
