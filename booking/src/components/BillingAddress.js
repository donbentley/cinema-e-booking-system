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
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="billing-address"
						className="block text-sm font-medium text-gray-700"
					>
						Address
					</label>
					<input
						id="billing-address"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						required
					/>
				</div>
				<button
					type="submit"
					className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
				>
					Save Address
				</button>
			</form>
		</div>
	);
};

export default BillingAddress;
