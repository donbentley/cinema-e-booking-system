// Movie Search
function searchMovie() {
    let input = document.getElementById('movieSearch').value.toLowerCase();
    let movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        let movieTitle = card.querySelector('h3').innerText.toLowerCase();
        if (movieTitle.includes(input)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search on Enter key
document.getElementById('movieSearch').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchMovie();
    }
});

// Toggle between Currently Running and Coming Soon
function showSection(sectionId) {
    const currentlyRunning = document.getElementById('currentlyRunning');
    const comingSoon = document.getElementById('comingSoon');
    const currentlyRunningBtn = document.getElementById('currentlyRunningBtn');
    const comingSoonBtn = document.getElementById('comingSoonBtn');

    // Hide both sections
    currentlyRunning.classList.remove('active');
    comingSoon.classList.remove('active');

    // Deactivate both buttons
    currentlyRunningBtn.classList.remove('active');
    comingSoonBtn.classList.remove('active');

    // Show the selected section and activate the button
    if (sectionId === 'currentlyRunning') {
        currentlyRunning.classList.add('active');
        currentlyRunningBtn.classList.add('active');
    } else if (sectionId === 'comingSoon') {
        comingSoon.classList.add('active');
        comingSoonBtn.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const currentlyRunningSection = document.querySelector("#currentlyRunning .movie-grid");
    const comingSoonSection = document.querySelector("#comingSoon .movie-grid");

    // Fetch movies from the Spring Boot backend
    axios.get('http://localhost:8080/movie/getAll')
        .then(response => {
            const movies = response.data;
            movies.forEach(movie => {
                // Create movie card HTML
                const movieCard = `
                    <div class="movie-card">
                        <a href="movie-details.html?movie=${encodeURIComponent(movie.title)}">
                            <img src="${movie.posterUrl}" alt="${movie.title} Poster">
                            <h3>${movie.title}</h3>
                        </a>
                        <iframe src="https://www.youtube.com/embed/${movie.trailerUrl}" allowfullscreen></iframe>
                        <a href="book-movie.html?movie=${encodeURIComponent(movie.title)}" class="book-movie-btn">Book Movie</a>
                    </div>
                `;

                // Check movie status and append to the correct section
                if (movie.status === "Currently Running") {
                    currentlyRunningSection.innerHTML += movieCard;
                } else if (movie.status === "Coming Soon") {
                    comingSoonSection.innerHTML += movieCard;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
});
