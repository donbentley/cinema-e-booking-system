window.onload = function() {
    // Generate a mock booking number
    const bookingNumber = 'CIN-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    document.getElementById('bookingNumber').textContent = bookingNumber;

    // Retrieve order data from localStorage
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (orderData) {
        let orderDetailsHtml = '';
        orderData.seats.forEach(ticket => {
            orderDetailsHtml += `<p>Seat: ${ticket.seat} - ${ticket.age} - ${ticket.price}</p>`;
        });
        document.getElementById('orderDetails').innerHTML = orderDetailsHtml;
        document.getElementById('orderTotal').textContent = `$${orderData.seats.reduce((acc, ticket) => acc + parseFloat(ticket.price.replace('$', '')), 0).toFixed(2)}`;
        
        // Send confirmation email
        sendConfirmationEmail(orderData);
    } else {
        alert('No order data found.');
        window.location.href = 'homepage.html';
    }
};

// Function to redirect to the homepage
function goToHomePage() {
    window.location.href = 'homepage.html';
}

// Send confirmation email (backend integration required)
function sendConfirmationEmail(orderData) {
    const emailContent = `
        Dear customer,
        Thank you for booking with Cinema E-Booking. Your booking number is ${document.getElementById('bookingNumber').textContent}.
        Order details:
        ${orderData.seats.map(ticket => `Seat: ${ticket.seat}, ${ticket.age}, ${ticket.price}`).join(', ')}
        Total: ${document.getElementById('orderTotal').textContent}
    `;
    console.log('Sending confirmation email with content:', emailContent);
    // Backend integration to send the email goes here.
}
