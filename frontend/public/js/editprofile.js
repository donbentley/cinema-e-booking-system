document
	.getElementById("editProfileForm")
	.addEventListener("submit", function (event) {
		event.preventDefault(); // Prevent the form from submitting normally

		// Gather data from the form
		const customerId = document.getElementById("customerId").value;
		const username = document.getElementById("username").value;
		const firstName = document.getElementById("first-name").value;
		const lastName = document.getElementById("last-name").value;

		// Construct the request body
		const requestBody = {
			id: customerId,
			username: username,
			first: firstName,
			last: lastName
		};

		// Make the PUT request using Axios
		axios
			.put(`http://localhost:8080/customer/{customerId}`, requestBody)
			.then(function (response) {
				// Handle the success response
				if (response.status === 200) {
					// Adjust based on your actual response structure
					alert("Profile updated successfully!");
					window.location.href = "profile.html"; // Redirect to profile page upon success
				} else {
					alert("Failed to update profile. Please try again.");
				}
			})
			.catch(function (error) {
				// Handle errors
				console.error("Error updating profile:", error);
				alert(
					"An error occurred while updating your profile. Please try again later."
				);
			});
	});
