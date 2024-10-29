document
	.getElementById("loginForm")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from submitting normally

		// Get the username or email and password from the form
		const usernameOrEmail = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		// Create the request body
		const requestBody = {
			usernameOrEmail: usernameOrEmail,
			password: password,
		};

		// Make the POST request using Axios
		axios
			.post("http://localhost:8080/auth/login", requestBody)
			.then(function (response) {
				// Handle the success response
				window.location.href = "homepage.html";
			})
			.catch(function (error) {
				// Handle errors
				console.error("Error during login:", error);
				alert("An error occurred during login. Please try again later.");
			});
	});
