import { TicketIcon } from "@heroicons/react/20/solid";
import React from "react";

const TicketItem = ({ seat, details }) => {
	return (
		<div className="grid grid-cols-[60px_1fr_80px] gap-3 items-center p-4 bg-white border rounded-md shadow-sm">
			{/* Icon Section */}
			<div className="flex items-center justify-center bg-gray-100 rounded-full h-10 w-10">
				<TicketIcon className="h-8 w-6 text-red-700" />
			</div>

			{/* Ticket Info Section */}
			<div>
				<span className="text-sm font-semibold text-gray-800">
					1 x {details.ticketType} Ticket
				</span>
				<p className="text-xs font-semibold text-gray-500">Seat: {seat}</p>
				{details.additionalInfo && (
					<p className="text-xs font-medium text-gray-400">
						{details.additionalInfo}
					</p>
				)}
			</div>

			{/* Price Label */}
			<label className="text-sm font-bold text-gray-800">
				${parseFloat(details.price).toFixed(2)}
			</label>
		</div>
	);
};

export default TicketItem;
