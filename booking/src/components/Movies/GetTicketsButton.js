import React from "react";
import { TicketIcon } from "@heroicons/react/24/outline";
const GetTicketsButton = () => {
	return (
		<button className="w-full h-14 bg-red-800 text-white rounded-md py-2 px-4 flex justify-center items-center relative overflow-hidden transition-all duration-300 transform hover:bg-red-700 hover:scale-105">
			{/* Ticket Icon */}
			<TicketIcon className="h-6 w-6 text-white mr-2" />
			{/* Always visible text */}
			<span className="text-lg font-semibold">Get Tickets</span>
		</button>
	);
};

export default GetTicketsButton;