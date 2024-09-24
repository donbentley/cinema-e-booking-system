// Get the order data from localStorage
const orderData = JSON.parse(localStorage.getItem("orderData"));

console.log("Retrieved orderData:", orderData);

if (orderData && orderData.seats.length > 0) {
	document.getElementById(
		"selectedMovieTitle"
	).textContent = `Movie: ${orderData.movie}`; // Display movie title
	const ticketDetailsContainer = document.getElementById("ticketDetails");
	let totalPrice = 0;

	orderData.seats.forEach((ticket) => {
		const price = parseFloat(ticket.price.replace("$", ""));
		totalPrice += price;

		const ticketDetailDiv = document.createElement("div");
		ticketDetailDiv.classList.add("ticket-detail");
		ticketDetailDiv.innerHTML = `
            <p>Seat: ${ticket.seat} | Ticket Type: 
            <select id="age-${ticket.seat}" name="age-${
			ticket.seat
		}" class="ticket-type" onchange="updateTicketPrice('${
			ticket.seat
		}')" required>
                <option value="Adult" ${
									ticket.age === "Adult" ? "selected" : ""
								} data-price="12.00">Adult - $12.00</option>
                <option value="Child" ${
									ticket.age === "Child" ? "selected" : ""
								} data-price="8.00">Child - $8.00</option>
                <option value="Senior" ${
									ticket.age === "Senior" ? "selected" : ""
								} data-price="8.00">Senior - $8.00</option>
            </select>
            | Price: <span id="price-${ticket.seat}">${ticket.price}</span>
            <button onclick="editTicket('${
							ticket.seat
						}')">Edit</button>  <!-- Edit button first -->
            <button onclick="removeTicket('${
							ticket.seat
						}')">Remove</button>  <!-- Remove button second -->
        `;
		ticketDetailsContainer.appendChild(ticketDetailDiv);
	});

	document.getElementById("totalPrice").textContent = `$${totalPrice.toFixed(
		2
	)}`;
} else {
	console.error("No order data found or no seats selected.");
	document.getElementById("ticketDetails").textContent = "No tickets found.";
}

// Function to remove a ticket
function removeTicket(seat) {
	const updatedSeats = orderData.seats.filter((ticket) => ticket.seat !== seat);
	orderData.seats = updatedSeats;
	localStorage.setItem("orderData", JSON.stringify(orderData));
	location.reload();
}

// Function to edit a ticket
function editTicket(seat) {
	const ticketToEdit = orderData.seats.find((ticket) => ticket.seat === seat);
	if (ticketToEdit) {
		const selectedMovie = orderData.movie;
		const showtime = orderData.showtime;
		const showdate = orderData.showdate;

		// Redirect back to book-movie.html with pre-filled data and go to the seat selection step
		const queryString = `book-movie.html?movie=${encodeURIComponent(
			selectedMovie
		)}&showtime=${encodeURIComponent(showtime)}&showdate=${encodeURIComponent(
			showdate
		)}&seat=${seat}&age=${ticketToEdit.age}&step=seats`;
		window.location.href = queryString;
	}
}

// Function to update ticket price when the ticket type (age) is changed
function updateTicketPrice(seat) {
	const ticketType = document.getElementById(`age-${seat}`);
	const priceElement = document.getElementById(`price-${seat}`);

	if (ticketType && priceElement) {
		const selectedOption = ticketType.options[ticketType.selectedIndex];
		const price = selectedOption.getAttribute("data-price");

		priceElement.textContent = `$${price}`; // Update price for this seat in the UI

		// Update the seat price in localStorage
		const ticketIndex = orderData.seats.findIndex(
			(ticket) => ticket.seat === seat
		);
		if (ticketIndex !== -1) {
			orderData.seats[ticketIndex].price = `$${price}`;
			orderData.seats[ticketIndex].age = selectedOption.value;
			localStorage.setItem("orderData", JSON.stringify(orderData));
			updateTotalPrice(); // Update the total price
		}
	}
}

// Function to update the total price after editing
function updateTotalPrice() {
	let newTotalPrice = 0;
	orderData.seats.forEach((ticket) => {
		const price = parseFloat(ticket.price.replace("$", ""));
		newTotalPrice += price;
	});
	document.getElementById("totalPrice").textContent = `$${newTotalPrice.toFixed(
		2
	)}`;
}

// Add redirection to checkout or login
document.getElementById("confirmOrder").addEventListener("click", function () {
	// Check if the user is logged in
	const isLoggedIn = true; // Placeholder: Replace with actual authentication check
	if (isLoggedIn) {
		window.location.href = "checkout.html"; // Redirect to checkout page if logged in
	} else {
		window.location.href = "login.html"; // Redirect to login page if not logged in
	}
});
