import React from "react";

const CartItem = ({ item, updateQuantity, removeItem }) => {
	return (
		<div className="flex items-center justify-between p-4 border-b">
			<div className="flex items-center space-x-4">
				<img
					src={item.image}
					alt={item.name}
					className="w-20 h-20 object-cover"
				/>
				<div>
					<h3 className="font-semibold">{item.name}</h3>
					<p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
				</div>
			</div>

			<div className="flex items-center space-x-4">
				<input
					type="number"
					value={item.quantity}
					min="1"
					className="w-12 p-1 border rounded"
					onChange={(e) => updateQuantity(item.id, e.target.value)}
				/>
				<button
					onClick={() => removeItem(item.id)}
					className="text-red-600 hover:text-red-800"
				>
					Remove
				</button>
			</div>
		</div>
	);
};

export default CartItem;
