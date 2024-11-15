import React from "react";

const showTimeInfo = [
	{
		movie: "A Minecraft Movie",
		showDate: "Today",
		showTime: "1:30PM",
		auditorium: "A",
	},
	{
		movie: "A Minecraft Movie",
		showDate: "Today",
		showTime: "4:30PM",
		auditorium: "A",
	},
	{
		movie: "A Minecraft Movie",
		showDate: "Today",
		showTime: "5:00PM",
		auditorium: "B",
	},
	{
		movie: "A Minecraft Movie",
		showDate: "Today",
		showTime: "11:30PM",
		auditorium: "A",
	},
];

const Showtimes = ({ movieTitle }) => {
	// Filter showtimes by the specified movie title
	const filteredShowtimes = showTimeInfo.filter(
		(show) => show.movie === movieTitle
	);

	return (
		<div className="flex flex-col items-center px-3 py-3">
			<h2 className="text-xl font-bold mb-2">Showtimes for {movieTitle}</h2>
			<div className="flex justify-center gap-4 flex-wrap">
				{filteredShowtimes.map((show, index) => (
					<button
						key={index}
						className="px-4 py-2 bg-slate-600 text-white rounded-full hover:bg-slate-700"
					>
						{show.showTime}
					</button>
				))}
			</div>
		</div>
	);
};

export default Showtimes;
