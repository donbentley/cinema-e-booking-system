import React from "react";

const BookingDetails = ({ booking }) => {
	if (!booking) {
		return (
			<div className="p-6 text-center">
				<p className="text-lg text-gray-600">No booking details available.</p>
			</div>
		);
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
			<h1 className="text-3xl font-bold text-teal-500 mb-6">
				🎉 Congrats! You're Booked! 🎉
			</h1>
			<div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
				<img
					src={booking.moviePicture}
					alt={`${booking.movieTitle} Poster`}
					className="w-full h-64 object-cover"
				/>
				<div className="p-6">
					<h2 className="text-2xl font-semibold text-gray-800">
						{booking.movieTitle}
					</h2>
					<p className="text-sm text-gray-500 mb-4">
						{new Date(booking.date).toLocaleDateString()} - {booking.time}
					</p>
					<div className="mb-4">
						<h3 className="font-medium text-gray-700">Ticket Details:</h3>
						<ul className="text-gray-600 mt-2">
							{booking.tickets.map((ticket, index) => (
								<li key={index} className="flex justify-between text-sm">
									<span>Seat: {ticket.seat}</span>
									<span>${ticket.price.toFixed(2)}</span>
								</li>
							))}
						</ul>
					</div>
					<p className="text-sm text-gray-700">
						<strong>Total Paid:</strong> ${booking.total.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default BookingDetails;
