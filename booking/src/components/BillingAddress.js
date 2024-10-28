import React, { useState } from "react";

const BillingAddress = () => {
	const [address, setAddress] = useState({
		line1: "",
		line2: "",
		city: "",
		state: "",
		zip: "",
	});
	const [isEditing, setIsEditing] = useState(true);

	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		setIsEditing(false);
		// Add address save logic here, e.g., send to an API or save in local storage
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Billing address saved!");
		handleSave();
	};

	return (
		<div className="mx-auto max-w-4xl p-8 bg-white rounded-lg">
			<h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
				Edit Billing Address
			</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				{isEditing ? (
					<>
						<div>
							<label className="block text-gray-700 mb-1">Address Line 1</label>
							<input
								type="text"
								name="line1"
								value={address.line1}
								onChange={handleAddressChange}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-500"
								required
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1">Address Line 2</label>
							<input
								type="text"
								name="line2"
								value={address.line2}
								onChange={handleAddressChange}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-500"
							/>
						</div>
						<div>
							<label className="block text-gray-700 mb-1">City</label>
							<input
								type="text"
								name="city"
								value={address.city}
								onChange={handleAddressChange}
								className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-500"
								required
							/>
						</div>
						<div className="flex gap-4">
							<div className="flex-1">
								<label className="block text-gray-700 mb-1">State</label>
								<input
									type="text"
									name="state"
									value={address.state}
									onChange={handleAddressChange}
									className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-500"
									required
								/>
							</div>
							<div className="flex-1">
								<label className="block text-gray-700 mb-1">ZIP Code</label>
								<input
									type="text"
									name="zip"
									value={address.zip}
									onChange={handleAddressChange}
									className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-gray-500"
									required
								/>
							</div>
						</div>
						<button
							type="submit"
							className="w-full mt-4 bg-gray-600 px-4 py-2 text-white rounded-lg hover:bg-gray-500"
						>
							Save Address
						</button>
					</>
				) : (
					<div className="space-y-2">
						<p>
							<strong>Line 1:</strong> {address.line1}
						</p>
						<p>
							<strong>Line 2:</strong> {address.line2}
						</p>
						<p>
							<strong>City:</strong> {address.city}
						</p>
						<p>
							<strong>State:</strong> {address.state}
						</p>
						<p>
							<strong>ZIP:</strong> {address.zip}
						</p>
						<div className="flex justify-end">
							<button
								type="button"
								onClick={handleEdit}
								className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
							>
								Edit
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	);
};

export default BillingAddress;
