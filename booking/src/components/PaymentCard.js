import React, { useState } from "react";

const PaymentCard = () => {
	const [cards, setCards] = useState([{ nickname: "", cardNumber: "" }]);

	const handleCardChange = (index, e) => {
		const newCards = [...cards];
		newCards[index][e.target.name] = e.target.value;
		setCards(newCards);
	};

	const addCard = () => {
		if (cards.length < 3) {
			setCards([...cards, { nickname: "", cardNumber: "" }]);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Add payment card save logic here
	};

	return (
		<div className="mx-auto max-w-4xl p-6 md:p-10 bg-white rounded-lg">
			<h1 className="text-3xl font-semibold text-center mt-1 ">Edit Payment Card</h1>
			<form onSubmit={handleSubmit}>
				<h2>Payment Cards</h2>
				{cards.map((card, index) => (
					<div key={index}>
						<label>Card Nickname</label>
						<input
							type="text"
							name="nickname"
							value={card.nickname}
							onChange={(e) => handleCardChange(index, e)}
							required
						/>
						<label>Card Number</label>
						<input
							type="text"
							name="cardNumber"
							value={card.cardNumber}
							onChange={(e) => handleCardChange(index, e)}
							required
						/>
					</div>
				))}
				<button type="button" onClick={addCard} disabled={cards.length >= 3}>
					Add Card
				</button>
				<button type="submit">Save Cards</button>
			</form>
		</div>
	);
};

export default PaymentCard;
