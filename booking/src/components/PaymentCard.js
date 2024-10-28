import React, { useState } from "react";

const PaymentCard = () => {
	const [cards, setCards] = useState([]);
	const [editIndex, setEditIndex] = useState(null);

	const handleCardChange = (index, e) => {
		const newCards = [...cards];
		newCards[index][e.target.name] = e.target.value;
		setCards(newCards);
	};

	const addCard = () => {
		if (cards.length < 3) {
			setCards([
				...cards,
				{ nickname: "", cardNumber: "", expirationDate: "", cvv: "", name: "" },
			]);
			setEditIndex(cards.length);
		}
	};

	const handleEdit = (index) => {
		setEditIndex(index);
	};

	const handleDelete = (index) => {
		setCards(cards.filter((_, i) => i !== index));
		setEditIndex(null);
	};

	const handleSave = () => {
		setEditIndex(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		alert("Payment cards saved!");
	};

	return (
		<div className="mx-auto max-w-4xl p-8 bg-white rounded-lg shadow-md mt-8">
			<h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
				Manage Payment Cards
			</h1>
			<form onSubmit={handleSubmit} className="space-y-6">
				{cards.map((card, index) => (
					<div
						key={index}
						className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
					>
						<div className="flex-1">
							<label className="block text-gray-700 mb-1">Card Nickname</label>
							<input
								type="text"
								name="nickname"
								value={card.nickname}
								onChange={(e) => handleCardChange(index, e)}
								disabled={editIndex !== index}
								className={`w-full p-2 border ${
									editIndex === index ? "border-blue-400" : "border-gray-300"
								} rounded-lg focus:outline-none focus:ring-2`}
							/>
						</div>
						{editIndex === index ? (
							<>
								<div className="flex-1">
									<label className="block text-gray-700 mb-1">
										Card Number
									</label>
									<input
										type="text"
										name="cardNumber"
										value={card.cardNumber}
										onChange={(e) => handleCardChange(index, e)}
										className="w-full p-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2"
									/>
								</div>
								<div className="flex-1">
									<label className="block text-gray-700 mb-1">
										Expiration Date
									</label>
									<input
										type="text"
										name="expirationDate"
										value={card.expirationDate}
										onChange={(e) => handleCardChange(index, e)}
										placeholder="MM/YY"
										className="w-full p-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2"
									/>
								</div>
								<div className="flex-1">
									<label className="block text-gray-700 mb-1">CVV</label>
									<input
										type="text"
										name="cvv"
										value={card.cvv}
										onChange={(e) => handleCardChange(index, e)}
										className="w-full p-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2"
									/>
								</div>
								<div className="flex-1">
									<label className="block text-gray-700 mb-1">
										Cardholder Name
									</label>
									<input
										type="text"
										name="name"
										value={card.name}
										onChange={(e) => handleCardChange(index, e)}
										className="w-full p-2 border border-blue-400 rounded-lg focus:outline-none focus:ring-2"
									/>
								</div>
								<button
									type="button"
									onClick={handleSave}
									className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mt-4 md:mt-0"
								>
									Save
								</button>
							</>
						) : (
							<>
								<p className="text-gray-600 text-center">
									Card Information Hidden
								</p>
								<div className="flex gap-2 justify-center">
									<button
										type="button"
										onClick={() => handleEdit(index)}
										className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
									>
										Edit
									</button>
									<button
										type="button"
										onClick={() => handleDelete(index)}
										className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
									>
										Delete
									</button>
								</div>
							</>
						)}
					</div>
				))}
				<div className="flex justify-between items-center mt-6">
					<button
						type="button"
						onClick={addCard}
						disabled={cards.length >= 3}
						className="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
					>
						Add Card
					</button>
					<button
						type="submit"
						className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
					>
						Save All
					</button>
				</div>
			</form>
		</div>
	);
};

export default PaymentCard;
