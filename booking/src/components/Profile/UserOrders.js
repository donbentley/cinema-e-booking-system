import React, { useState, useEffect } from "react";
import axios from "axios";

const UserOrders = ({ userId }) => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch user orders
	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8080/api/orders?userId=${userId}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				);
				setOrders(response.data);
			} catch (err) {
				console.error("Error fetching orders:", err);
				setError("Failed to fetch orders.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, [userId]);

	if (loading) {
		return <div className="p-6 text-center">Loading orders...</div>;
	}

	if (error) {
		return <div className="p-6 text-center text-red-600">{error}</div>;
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<h1 className="text-2xl font-semibold text-gray-800 mb-6">Your Orders</h1>
			{orders.length === 0 ? (
				<p className="text-gray-600">You have no orders yet.</p>
			) : (
				<div className="space-y-4">
					{orders.map((order) => (
						<OrderCard key={order.id} order={order} />
					))}
				</div>
			)}
		</div>
	);
};

const OrderCard = ({ order }) => {
	const [expanded, setExpanded] = useState(false);

	const toggleExpanded = () => setExpanded(!expanded);

	return (
		<div className="bg-white shadow-md rounded-lg border border-gray-200">
			<div className="p-4 flex justify-between items-center">
				<div>
					<p className="text-sm text-gray-600">
						Order #{order.id} - {new Date(order.date).toLocaleDateString()}
					</p>
					<p className="font-medium text-gray-800">
						Total: ${order.total.toFixed(2)}
					</p>
				</div>
				<button
					onClick={toggleExpanded}
					className="text-sm text-teal-500 hover:underline"
				>
					{expanded ? "Hide Details" : "View Details"}
				</button>
			</div>
			{expanded && (
				<div className="border-t border-gray-200 p-4">
					<h3 className="font-semibold text-gray-700 mb-2">Items</h3>
					<ul className="space-y-2">
						{order.items.map((item, index) => (
							<li key={index} className="flex justify-between">
								<span>{item.name}</span>
								<span>
									${item.price.toFixed(2)} x {item.quantity}
								</span>
							</li>
						))}
					</ul>
					<div className="mt-4">
						<p className="text-sm text-gray-600">
							<strong>Status:</strong> {order.status}
						</p>
						<p className="text-sm text-gray-600">
							<strong>Shipping Address:</strong> {order.shippingAddress}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default UserOrders;
