import React from "react";
import SeatSelection from "./SeatSelection";
import { Navbar } from "../Global/Navbar";

const Showroom = () => {
	return (
		<div className="">
			<Navbar />
			<h1 className="text-3xl font-bold text-black mb-4"></h1>
			<SeatSelection />
		</div>
	);
};

export default Showroom;
