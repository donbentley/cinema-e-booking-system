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
