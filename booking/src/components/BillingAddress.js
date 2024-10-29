import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const BillingAddress = (props) => {

	const navigate = useNavigate();

	const [address, setAddress] = useState({
		customer: null,
		id: null,
		line1: "",
		line2: "",
		city: "",
		state: "",
		zip: null
	});
	const [isEditing, setIsEditing] = useState(true);

	const [isNewAddress, setNewAddress] = useState(true);

	useEffect(() => {
		if (localStorage.getItem("token") == null) {
			navigate("/");
		}
		axios
			.get("http://localhost:8080/customer/customer-info", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((response) => {
				if (response.status >= 400) {
					throw new Error("Error fetching user data");
				}
				if (response.data.billingAddress != null) {
					const existingAddress = response.data.billingAddress;
					setNewAddress(false);
					setAddress((prevAddress) => ({
						customer: response.data,
						id: existingAddress.id,
						line1: existingAddress.line1,
						line2: existingAddress.line2,
						city: existingAddress.city,
						state: existingAddress.state, 
						zip: existingAddress.zip
					}))
				} else {
					setAddress((prevAddress) => ({
						...prevAddress,
						customer: response.data
					}))
				}
			})
			.catch((err) => {
				alert(err);
			});
	}, [navigate]);

	const handleAddressChange = (e) => {
		const { name, value } = e.target;
		setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
	};

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = async () => {
		// Add address save logic here, e.g., send to an API or save in local storage
		try {
			if (isNewAddress) {
				const addAddressResponse = await fetch(
					`http://localhost:8080/address/addNew`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						body: JSON.stringify({
							customer: address.customer,
							line1: address.line1,
							line2: address.line2,
							city: address.city,
							state: address.state, 
							zip: address.zip
						}),
					}
				);
				const responseJson = await addAddressResponse.json();
				if (!addAddressResponse.ok) {
					throw new Error(responseJson.error);
				}
			} else {
				const addAddressResponse = await fetch(
					`http://localhost:8080/address/update/${address.id}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
						body: JSON.stringify({
							customer: address.customer,
							id: address.id,
							line1: address.line1,
							line2: address.line2,
							city: address.city,
							state: address.state, 
							zip: address.zip
						}),
					}
				);
				const responseJson = await addAddressResponse.json();
				if (!addAddressResponse.ok) {
					throw new Error(responseJson.error);
				}
			}
		} catch (error) {
			console.log(error);
			alert(error);
		}
		setIsEditing(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleSave();
		alert("Billing address saved!");
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
