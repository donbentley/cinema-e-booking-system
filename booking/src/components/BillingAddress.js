import React, { useState } from "react";

const BillingAddress = () => {
	const [address, setAddress] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add billing address save logic here
	};

	return (
		<div className="mx-auto max-w-4xl p-6 md:p-10 bg-white rounded-lg">
			<h1 className="text-3xl font-semibold text-center mt-1 ">
				Edit Billing Address
			</h1>
			<form onSubmit={handleSubmit}>
				<h2>Billing Address</h2>
				<div>
					<label>Address</label>
					<input
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Save Address</button>
			</form>
		</div>
	);
};

export default BillingAddress;
