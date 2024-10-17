// Dummy movie data
const moviesData = {
    "Movie Title 1": {
        title: "Movie Title 1",
        category: "Action, Adventure",
        cast: "Actor 1, Actor 2, Actor 3",
        director: "Director Name",
        producer: "Producer Name",
        synopsis: "A thrilling adventure...",
        reviews: "4.5/5",
        rating: "PG-13",
        trailer: "https://www.youtube.com/embed/trailerID1"
    },
    "Movie Title 2": {
        title: "Movie Title 2",
        category: "Drama, Romance",
        cast: "Actor 4, Actor 5, Actor 6",
        director: "Director 2",
        producer: "Producer 2",
        synopsis: "A touching love story...",
        reviews: "4.2/5",
        rating: "PG",
        trailer: "https://www.youtube.com/embed/trailerID2"
    }
    // Add more movies here...
};

// Function to get the movie title from URL
function getMovieTitleFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('movie');
}

// Populate the movie details on the page
function populateMovieDetails(movieTitle) {
    const movie = moviesData[movieTitle];
    if (movie) {
        document.getElementById('movie-title').textContent = movie.title;
        document.getElementById('movie-category').textContent = movie.category;
        document.getElementById('movie-cast').textContent = movie.cast;
        document.getElementById('movie-director').textContent = movie.director;
        document.getElementById('movie-producer').textContent = movie.producer;
        document.getElementById('movie-synopsis').textContent = movie.synopsis;
        document.getElementById('movie-reviews').textContent = movie.reviews;
        document.getElementById('movie-rating').textContent = movie.rating;
        document.getElementById('movie-trailer').src = movie.trailer;

        // Update the "Book Movie" button link
        document.getElementById('bookMovieBtn').href = `book-movie.html?movie=${encodeURIComponent(movie.title)}`;
    } else {
        alert("Movie not found!");
    }
}

// Add event listener for the back button on movie-details page
document.getElementById('backToHomepage').addEventListener('click', function() {
    window.location.href = 'homepage.html';  // Replace 'homepage.html' with the actual path to your homepage
});


// Initialize the page by loading the movie data
window.onload = function() {
    const movieTitle = getMovieTitleFromURL();
    if (movieTitle) {
        populateMovieDetails(movieTitle);
    } else {
        alert("No movie selected!");
    }
};