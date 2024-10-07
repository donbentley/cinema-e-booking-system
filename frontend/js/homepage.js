// Movie Search
function searchMovie() {
	let input = document.getElementById("movieSearch").value.toLowerCase();
	let movieCards = document.querySelectorAll(".movie-card");
	movieCards.forEach((card) => {
		let movieTitle = card.querySelector("h3").innerText.toLowerCase();
		if (movieTitle.includes(input)) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
}

// Search on Enter key
document
	.getElementById("movieSearch")
	.addEventListener("keypress", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			searchMovie();
		}
	});

// Fetch movies and display on the homepage
document.addEventListener('DOMContentLoaded', function() {
    // Fetch movies from the API
    fetch('/api/movies') // Adjust the API endpoint as needed
        .then(response => response.json())
        .then(movies => {
            // Limit to first 5 movies for both sections
            const selectedMovies = movies.slice(0, 5);

            // Display the same movies in both Currently Running and Coming Soon sections
            displayMovies(selectedMovies, 'currentlyRunningMovies');
            displayMovies(selectedMovies, 'comingSoonMovies');
        })
        .catch(error => console.error('Error fetching movies:', error));
});

// Function to display movies on the page
function displayMovies(movies, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous movie cards

    movies.forEach(movie => {
        // Create movie card
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        // Movie Poster
        const poster = document.createElement('img');
        poster.src = movie.pictureLink; // Image URL from the database
        poster.alt = movie.title + " Poster";
        movieCard.appendChild(poster);
        
        // Movie Title
        const title = document.createElement('h3');
        title.innerText = movie.title;
        movieCard.appendChild(title);
        
        // Movie Synopsis
        const synopsis = document.createElement('p');
        synopsis.innerText = movie.synopsis;
        movieCard.appendChild(synopsis);

        // Movie Trailer
        const trailer = document.createElement('iframe');
        trailer.src = movie.trailerLink;
        trailer.allowFullscreen = true;
        movieCard.appendChild(trailer);
        
        // Book Movie Link
        const bookLink = document.createElement('a');
        bookLink.href = `book-movie.html?movie=${encodeURIComponent(movie.title)}`;
        bookLink.classList.add('book-movie-btn');
        bookLink.innerText = 'Book Movie';
        movieCard.appendChild(bookLink);

        // Append the movie card to the movie container
        container.appendChild(movieCard);
    });
}

