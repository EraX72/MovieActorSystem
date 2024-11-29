function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Silme fonksiyonları
async function deleteActor(id) {
    try {
        const response = await fetch(`/api/actors/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Actor deleted successfully! 🗑️');
            loadActors();
        } else {
            showNotification('Error deleting actor!', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error deleting actor!', 'error');
    }
}

async function deleteMovie(id) {
    try {
        const response = await fetch(`/api/movies/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showNotification('Movie deleted successfully! 🗑️');
            loadMovies();
        } else {
            showNotification('Error deleting movie!', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error deleting movie!', 'error');
    }
}

async function loadActors() {
    try {
        const response = await fetch('/api/actors');
        const actors = await response.json();
        const actorsList = document.getElementById('actorsList');
        
        if (actors.length === 0) {
            actorsList.innerHTML = '<div class="empty-message">No actors added yet</div>';
            return;
        }

        actorsList.innerHTML = actors.map(actor => 
            `<div class="list-item">
                <span>
                    <i class="fas fa-user"></i> ${actor.name}
                    <span class="date">${new Date(actor.birthDate).toLocaleDateString()}</span>
                </span>
                <button onclick="deleteActor(${actor.id})" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
        ).join('');
    } catch (error) {
        console.error('Error loading actors:', error);
        showNotification('Error loading actors!', 'error');
    }
}

async function loadMovies() {
    try {
        const response = await fetch('/api/movies');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const movies = await response.json();
        const moviesList = document.getElementById('moviesList');

        if (!Array.isArray(movies) || movies.length === 0) {
            moviesList.innerHTML = '<div class="empty-message">No movies added yet</div>';
            return;
        }

        moviesList.innerHTML = movies.map(movie => 
            `<div class="list-item">
                <span>
                    <i class="fas fa-film"></i> ${movie.title}
                    <span class="year">${movie.releaseYear}</span>
                </span>
                <button onclick="deleteMovie(${movie.id})" class="delete-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`
        ).join('');
    } catch (error) {
        console.error('Error loading movies:', error);
        showNotification('Error loading movies!', 'error');
    }
}

document.getElementById('actorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const actor = {
        name: document.getElementById('actorName').value,
        birthDate: document.getElementById('actorBirthDate').value
    };

    try {
        const response = await fetch('/api/actors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(actor)
        });
        
        if (response.ok) {
            showNotification('Actor added successfully! 🎭');
            loadActors();
            e.target.reset();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error adding actor!', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error adding actor!', 'error');
    }
});

document.getElementById('movieForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const movie = {
        title: document.getElementById('movieTitle').value,
        releaseYear: document.getElementById('releaseYear').value
    };

    try {
        const response = await fetch('/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movie)
        });
        
        if (response.ok) {
            showNotification('Movie added successfully! 🎬');
            loadMovies();
            e.target.reset();
        } else {
            const error = await response.json();
            showNotification(error.message || 'Error adding movie!', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error adding movie!', 'error');
    }
});

// Sayfa yüklendiğinde listeleri güncelle
loadActors();
loadMovies();