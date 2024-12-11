import React, { useState, useEffect } from "react";
import axios from "axios";

const CartPaymentCard = ({ user, onCardSelect }) => {
	const [cards, setCards] = useState([]);
	const [useNewCard, setUseNewCard] = useState(false);
	const [selectedCardIndex, setSelectedCardIndex] = useState(null);
	const [newCard, setNewCard] = useState({
		nickname: "",
		cardNumber: "",
		expDate: "",
		cvv: "",
		name: "",
	});

	// Update cards whenever the user data changes
	useEffect(() => {
		if (user?.paymentCards) {
			setCards(
				user.paymentCards.map((card) => ({
					...card,
					isNewCard: false,
				}))
			);
		}
	}, [user]);

	// Toggle between saved card and new card
	const handleToggleNewCard = () => {
		setUseNewCard(!useNewCard);
		setSelectedCardIndex(null); // Reset selection when toggling
	};

	// Handle changes for new card inputs
	const handleCardChange = (e) => {
		setNewCard({ ...newCard, [e.target.name]: e.target.value });
	};

	// Add a new card
	const addCard = async () => {
		try {
			const response = await axios.post(
				"http://localhost:8080/payment-card/addNew",
				{
					...newCard,
					customer: user,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				}
			);
			setCards([
				...cards,
				{ ...newCard, id: response.data.id, isNewCard: false },
			]);
			setNewCard({
				nickname: "",
				cardNumber: "",
				expDate: "",
				cvv: "",
				name: "",
			});
			setUseNewCard(false);
		} catch (error) {
			console.error("Failed to add card:", error);
			alert("Failed to save the card.");
		}
	};

	// Confirm card selection
	const handleConfirmSelection = () => {
		if (selectedCardIndex !== null) {
			onCardSelect(cards[selectedCardIndex]);
		} else {
			alert("Please select a card.");
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Select Payment Method
			</h2>
			{!useNewCard ? (
				<div>
					<h3 className="text-gray-700 font-medium mb-2">Your Saved Cards</h3>
					{cards.length === 0 ? (
						<p className="text-sm text-gray-600">No saved cards available.</p>
					) : (
						<div className="space-y-4">
							{cards.map((card, index) => (
								<label
									key={index}
									className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
										selectedCardIndex === index
											? "border-teal-500 bg-teal-50"
											: "border-gray-200"
									}`}
								>
									<div>
										<p className="text-sm font-medium text-gray-800">
											{card.nickname} - **** **** ****{" "}
											{card.cardNumber.slice(-4)}
										</p>
										<p className="text-xs text-gray-600">
											Expires: {card.expDate}
										</p>
									</div>
									<input
										type="radio"
										name="selectedCard"
										value={index}
										checked={selectedCardIndex === index}
										onChange={() => setSelectedCardIndex(index)}
										className="h-5 w-5 text-teal-500 focus:ring-teal-400"
									/>
								</label>
							))}
						</div>
					)}
					<button
						className="mt-4 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-gray-600"
						onClick={handleToggleNewCard}
					>
						Use a Different Card
					</button>
					{cards.length > 0 && (
						<button
							className="mt-4 px-4 py-2 ml-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
							onClick={handleConfirmSelection}
						>
							Confirm Selection
						</button>
					)}
				</div>
			) : (
				<div>
					<h3 className="text-slate-600 font-medium mb-2">
						Enter Card Details
					</h3>
					<div className="space-y-4">
						<input
							type="text"
							name="name"
							value={newCard.name}
							onChange={handleCardChange}
							placeholder="Cardholder Name"
							className="w-full p-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="text"
							name="cardNumber"
							value={newCard.cardNumber}
							onChange={handleCardChange}
							placeholder="Card Number"
							className="w-full p-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="text"
							name="expDate"
							value={newCard.expDate}
							onChange={handleCardChange}
							placeholder="MM/YY"
							className="w-full p-2 border border-gray-300 rounded-lg"
						/>
						<input
							type="text"
							name="cvv"
							value={newCard.cvv}
							onChange={handleCardChange}
							placeholder="CVV"
							className="w-full p-2 border border-gray-300 rounded-lg"
						/>
					</div>
					<div className="mt-4 flex justify-between">
						<button
							className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-gray-600"
							onClick={handleToggleNewCard}
						>
							Back to Saved Cards
						</button>
						<button
							className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
							onClick={() => onCardSelect(newCard)}
						>
							Use Without Saving
						</button>
						<button
							className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
							onClick={addCard}
						>
							Save and Use
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CartPaymentCard;
