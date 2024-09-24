// Variable to store the selected date text and time text
let selectedDateText = '';
let selectedTimeText = '';
let selectedSeats = [];

// Read the movie from the URL and display it on the booking page
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedMovie = urlParams.get('movie');
    const showtime = urlParams.get('showtime');
    const showdate = urlParams.get('showdate');
    const seatToEdit = urlParams.get('seat');
    const ageToEdit = urlParams.get('age');
    const step = urlParams.get('step');  // Step from the URL

    if (selectedMovie) {
        document.getElementById('selectedMovieTitle').textContent = `Booking for: ${selectedMovie}`;
    } else {
        alert('No movie selected!');
        window.location.href = 'index.html';
    }

    // Set the date limits (today to two weeks out) and prevent typing
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 14);  // Limit to 14 days from today

    const showDateInput = document.getElementById('showdate');
    showDateInput.setAttribute('min', today.toISOString().split('T')[0]);
    showDateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);

    showDateInput.addEventListener('keydown', function(event) {
        event.preventDefault();
    });

    // Set pre-filled data if available
    if (showdate) {
        document.getElementById('showdate').value = showdate;
        selectedDateText = new Date(showdate).toLocaleDateString();
        document.getElementById('displaySelectedDate').textContent = `Selected Date: ${selectedDateText}`;
    }
    
    if (showtime) {
        document.getElementById('showtime').value = showtime;
        selectedTimeText = showtime;
        document.getElementById('displayDateTimeSeats').textContent = `Selected Date: ${selectedDateText}, Time: ${selectedTimeText}`;
    }

    // If step is "seats", go directly to seat selection
    if (step === 'seats') {
        nextStep(3);  // Move directly to the seat selection step
        setUpSeatSelection();

        // If seat and age to edit are provided, pre-select the seat and move to the next step
        if (seatToEdit && ageToEdit) {
            selectedSeats.push(seatToEdit);
            nextStep(4);  // Move to age selection step
            updateAgeSelection();
            const ageSelectElement = document.getElementById(`age-${seatToEdit}`);
            if (ageSelectElement) {
                ageSelectElement.value = ageToEdit;
                console.log(`Pre-filling age for seat ${seatToEdit}: ${ageToEdit}`);
            }
        }
    }
};

// Handle form navigation between steps
function nextStep(step) {
    const currentStep = document.querySelector('.booking-step.active');
    currentStep.classList.remove('active');

    const nextStep = document.getElementById(`step${step}`);
    nextStep.classList.add('active');
}

function previousStep(step) {
    const currentStep = document.querySelector('.booking-step.active');
    currentStep.classList.remove('active');

    const previousStep = document.getElementById(`step${step}`);
    previousStep.classList.add('active');
}

// Automatically move to the time selection step after selecting a day
document.getElementById("showdate").addEventListener("change", function() {
    if (this.value) {
        console.log('Date selected:', this.value);  // Debugging log
        selectedDateText = new Date(this.value).toLocaleDateString();
        const displaySelectedDate = document.getElementById('displaySelectedDate');
        displaySelectedDate.textContent = `Selected Date: ${selectedDateText}`;

        nextStep(2);  // Automatically move to the showtime selection step
    }
});

// Automatically move to the seat selection step after selecting a showtime
document.getElementById("showtime").addEventListener("change", function() {
    if (this.value) {
        selectedTimeText = document.getElementById("showtime").value;

        // Display the selected date and time in the "Select Seats" step
        const displayDateTimeSeats = document.getElementById('displayDateTimeSeats');
        displayDateTimeSeats.textContent = `Selected Date: ${selectedDateText}, Time: ${selectedTimeText}`;

        // Move to the seat selection step
        nextStep(3);

        // Set up seat selection event listeners again
        setUpSeatSelection();
    }
});

// Set up event listeners for seat selection
function setUpSeatSelection() {
    selectedSeats = [];  // Clear previous selections

    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', function() {
            const seatNumber = this.getAttribute('data-seat');
            if (selectedSeats.includes(seatNumber)) {
                selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
                this.classList.remove('selected');
            } else {
                selectedSeats.push(seatNumber);
                this.classList.add('selected');
            }
        });
    });
}

// Update age and ticket type selection for each selected seat
function updateAgeSelection() {
    // Display the selected date and time in the "Specify Age" step
    const displayDateTimeAge = document.getElementById('displayDateTimeAge');
    displayDateTimeAge.textContent = `Selected Date: ${selectedDateText}, Time: ${selectedTimeText}`;

    const ageContainer = document.getElementById('ageContainer');
    ageContainer.innerHTML = '';  // Clear previous selections

    selectedSeats.forEach(seat => {
        console.log(`Creating dropdown for seat: ${seat}`);  // Debugging log for each seat
        const seatAgeDiv = document.createElement('div');
        seatAgeDiv.classList.add('age-row');
        seatAgeDiv.innerHTML = `
            <div class="ticket">
                <h3>Seat ${seat}</h3>
                <label for="age-${seat}">Select Ticket Type: </label>
                <select id="age-${seat}" name="age-${seat}" class="ticket-type" onchange="updateTicketPrice('${seat}')" required>
                    <option value="" disabled selected>Select Age Group</option>
                    <option value="Adult" data-price="12.00">Adult - $12.00</option>
                    <option value="Child" data-price="8.00">Child - $8.00</option>
                    <option value="Senior" data-price="8.00">Senior - $8.00</option>
                </select>
                <span id="price-${seat}" class="ticket-price">$0.00</span>
            </div>
        `;
        ageContainer.appendChild(seatAgeDiv); // Appending to the existing container in the DOM
    });    
}

// Function to update ticket price
function updateTicketPrice(seat) {
    console.log(`updateTicketPrice called for seat: ${seat}`);  // Debugging log

    const ticketType = document.getElementById(`age-${seat}`);
    const priceElement = document.getElementById(`price-${seat}`);  // Get the price span element

    if (ticketType && priceElement) {
        const selectedOption = ticketType.options[ticketType.selectedIndex];
        const price = selectedOption.getAttribute('data-price');  // Get the price from the selected option

        console.log(`Seat: ${seat}, Ticket Type: ${selectedOption.value}, Price: $${price}`);
        
        // Update the price in the DOM
        priceElement.textContent = `$${price}`;  // Display the price for this seat in the UI
    } else {
        console.log(`Dropdown or price element not found for seat: ${seat}`);
    }
}

// Handle form submission and ensure booking data is stored correctly
document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if showdate is filled before submission
    const showdateInput = document.getElementById('showdate');
    if (!showdateInput.value) {
        alert('Please select a valid showdate.');
        showdateInput.focus();  // Focus the input so the user can fill it
        return;
    }

    console.log('Selected Seats:', selectedSeats);

    const seatAges = selectedSeats.map(seat => {
        const ageElement = document.getElementById(`age-${seat}`);
        const priceElement = document.getElementById(`price-${seat}`);

        if (ageElement && priceElement) {
            const age = ageElement.value;
            const price = priceElement.textContent;  // Get the price from the DOM
            console.log(`Seat: ${seat}, Age: ${age}, Price: ${price}`);
            return { seat, age, price };
        } else {
            console.error(`Elements for seat ${seat} not found!`);
            return null;
        }
    }).filter(Boolean);  // Filter out null values

    if (seatAges.length === 0) {
        console.error('No seat data available for booking.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const selectedMovie = urlParams.get('movie');  // Get movie from URL

    // Store the order data including movie information
    const orderData = {
        movie: selectedMovie,
        showtime: selectedTimeText,
        showdate: selectedDateText,
        seats: seatAges,
    };

    console.log('Storing orderData:', orderData);  // Debugging log to verify the stored data

    localStorage.setItem('orderData', JSON.stringify(orderData));

    window.location.href = 'order-summary.html';  // Redirect to the summary page
});