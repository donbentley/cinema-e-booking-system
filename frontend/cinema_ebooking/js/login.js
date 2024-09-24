/* Log in */
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Perform a simple client-side check for demo purposes
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to the homepage upon success
    } else {
        alert('Invalid username or password');
    }
});