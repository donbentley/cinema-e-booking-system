document
	.getElementById("registration-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		// Collecting form data
		const firstName = document.getElementById("first-name").value;
		const lastName = document.getElementById("last-name").value;
		const email = document.getElementById("email").value;
		const username = document.getElementById("username").value;
		const password = document.getElementById("password").value;

		const data = {
			first: firstName,
			last: lastName,
			email: email,
			username: username,
			password: password,
		};

		// Sending data to the signup endpoint using Axios
		axios
			.post("http://localhost:8080/auth/signup", data)
			.then((response) => {
				console.log(response); // Check the success response
				// Assuming the response is a success message
				alert("Registration successful! Please check your email to verify your account.");
				// Redirect to login or another page if needed
				window.location.href = "login.html";
			})
			.catch((error) => {
				if (error.response) {
					// Log the full error response for more details
					console.log(error.response);

					// Check if the server provided a specific error message
					if (error.response.data) {
						alert("Error: " + (error.response.data.message || "An error occurred."));
					} else {
						alert("Error: Something went wrong. Please try again.");
					}
				} else if (error.request) {
					// No response received from the server
					console.log(error.request);
					alert("No response received from the server. Please try again later.");
				} else {
					// Something else went wrong in setting up the request
					console.log("Error", error.message);
					alert("Error: " + error.message);
				}
			});
	});
