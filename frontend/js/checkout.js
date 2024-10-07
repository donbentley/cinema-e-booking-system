window.onload = function() {
    // Check if user is logged in (Placeholder logic for actual authentication check)
    var isLoggedIn = true; // Replace with real authentication check
    if (!isLoggedIn) {
        window.location.href = 'login.html'; // Redirect to login page if not logged in
    }

    // Retrieve order data from localStorage
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (orderData && orderData.seats.length > 0) {
        let totalPrice = 0;
        orderData.seats.forEach(ticket => {
            totalPrice += parseFloat(ticket.price.replace('$', ''));
        });
        document.getElementById('orderTotal').textContent = `$${totalPrice.toFixed(2)}`;
    } else {
        alert('No order data found!');
        window.location.href = 'order-summary.html'; // Redirect back if no order data
    }

    // Show/hide credit card fields based on selected payment method
    document.getElementById('paymentMethod').addEventListener('change', function() {
        const creditCardInfo = document.getElementById('creditCardInfo');
        if (this.value === 'credit') {
            creditCardInfo.style.display = 'block';
        } else {
            creditCardInfo.style.display = 'none';
        }
    });

    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Mock successful payment
        alert('Order confirmed! Redirecting to confirmation page.');
        
        // Store order details and redirect to confirmation page
        window.location.href = 'orderconfirmation.html';
    });    

    // Handle checkout cancellation
    document.getElementById('cancelCheckout').addEventListener('click', function() {
        window.location.href = 'order-summary.html'; // Redirect back to order summary
    });
};