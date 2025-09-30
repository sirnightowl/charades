// Movie display component
// Handles the display of movie information in the UI

class MovieComponent {
  constructor(movie, containerId) {
    this.movie = movie;
    this.containerId = containerId;
    this.container = typeof containerId === 'string' ? 
      document.getElementById(containerId) : containerId;
  }

  // Render the movie information in the container
  render() {
    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found`);
      return;
    }

    // Create the movie display HTML
    const movieHtml = this.createMovieHtml();

    // Set the HTML content
    this.container.innerHTML = movieHtml;

    // Add event listeners if needed
    this.addEventListeners();
  }

  // Create the HTML structure for a movie
  createMovieHtml() {
    return `
      <div class="movie-card">
        <div class="movie-header">
          <h3 class="movie-title">${this.escapeHtml(this.movie.title)}</h3>
          <span class="movie-year">${this.movie.year}</span>
        </div>
        
        ${this.movie.poster ? 
          `<div class="movie-poster">
            <img src="${this.escapeHtml(this.movie.poster)}" 
                 alt="${this.escapeHtml(this.movie.title)} poster" 
                 class="poster-image">
          </div>` : ''}
        
        <div class="movie-details">
          <p class="movie-director"><strong>Director:</strong> ${this.escapeHtml(this.movie.director)}</p>
          <p class="movie-rating"><strong>Rating:</strong> ${this.movie.rating}/10</p>
          <p class="movie-genre"><strong>Genre:</strong> ${this.escapeHtml(this.movie.genre.join(', '))}</p>
          <p class="movie-language"><strong>Language:</strong> ${this.escapeHtml(this.movie.language)}</p>
          ${this.movie.duration ? 
            `<p class="movie-duration"><strong>Duration:</strong> ${this.movie.duration} min</p>` : ''}
        </div>
        
        <div class="movie-description">
          <h4>Description</h4>
          <p>${this.escapeHtml(this.movie.description)}</p>
        </div>
        
        ${this.movie.cast.length > 0 ? 
          `<div class="movie-cast">
            <h4>Cast</h4>
            <p>${this.escapeHtml(this.movie.cast.join(', '))}</p>
          </div>` : ''}
        
        ${this.movie.trailer ? 
          `<div class="movie-trailer">
            <a href="${this.escapeHtml(this.movie.trailer)}" target="_blank">Watch Trailer</a>
          </div>` : ''}
      </div>
    `;
  }

  // Add event listeners to interactive elements
  addEventListeners() {
    // Add click event to trailer link if it exists
    const trailerLink = this.container.querySelector('.movie-trailer a');
    if (trailerLink) {
      trailerLink.addEventListener('click', (e) => {
        this.onTrailerClick(e, this.movie);
      });
    }
  }

  // Handle trailer click
  onTrailerClick(event, movie) {
    console.log('Trailer clicked for movie:', movie.title);
    // Additional handling can be added here
  }

  // Update the movie data and re-render
  updateMovie(newMovie) {
    this.movie = newMovie;
    this.render();
  }

  // Helper method to escape HTML to prevent XSS
  escapeHtml(text) {
    if (typeof text !== 'string') {
      return '';
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Get a simplified display for the main charades screen
  renderSimple() {
    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found`);
      return;
    }

    // Create a simplified display for the main charades game
    const simpleHtml = `
      <h2 class="h1">${this.escapeHtml(this.movie.title)}</h2>
      <p class="lead">(${this.movie.year})</p>
      <p>Director: ${this.escapeHtml(this.movie.director)}</p>
      <small class="text-muted">Movie</small>
    `;

    this.container.innerHTML = simpleHtml;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MovieComponent;
} else {
  window.MovieComponent = MovieComponent;
}