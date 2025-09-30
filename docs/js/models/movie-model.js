// Movie data model utility
// Represents a film in the content catalog

class Movie {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.title = data.title || '';
    this.director = data.director || '';
    this.year = data.year || 0;
    this.genre = Array.isArray(data.genre) ? data.genre : [];
    this.rating = data.rating || 0;
    this.description = data.description || '';
    this.cast = Array.isArray(data.cast) ? data.cast : [];
    this.duration = data.duration || 0;
    this.poster = data.poster || '';
    this.trailer = data.trailer || '';
    this.language = data.language || 'English';
    this.country = data.country || '';
    this.released = typeof data.released === 'boolean' ? data.released : true;
    this.imdbId = data.imdbId || '';
  }

  // Generate a unique ID if not provided
  generateId() {
    return 'movie_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Validate the movie data
  validate() {
    const errors = [];

    if (!this.title || typeof this.title !== 'string' || this.title.trim() === '') {
      errors.push('Movie title is required');
    }

    if (!this.year || typeof this.year !== 'number' || this.year < 1800 || this.year > new Date().getFullYear()) {
      errors.push('Movie year must be between 1800 and current year');
    }

    if (!Array.isArray(this.genre) || this.genre.length === 0) {
      errors.push('Movie genre is required and must be an array');
    }

    if (typeof this.rating !== 'number' || this.rating < 0 || this.rating > 10) {
      errors.push('Movie rating must be between 0 and 10');
    }

    if (!this.description || typeof this.description !== 'string' || this.description.trim() === '') {
      errors.push('Movie description is required');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Convert to JSON for storage
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      director: this.director,
      year: this.year,
      genre: this.genre,
      rating: this.rating,
      description: this.description,
      cast: this.cast,
      duration: this.duration,
      poster: this.poster,
      trailer: this.trailer,
      language: this.language,
      country: this.country,
      released: this.released,
      imdbId: this.imdbId
    };
  }

  // Get a formatted string for display
  getDisplayTitle() {
    return `${this.title} (${this.year})`;
  }

  // Check if movie matches a search query
  matchesQuery(query) {
    const lowerQuery = query.toLowerCase();
    return (
      this.title.toLowerCase().includes(lowerQuery) ||
      this.director?.toLowerCase().includes(lowerQuery) ||
      this.cast.some(actor => actor.toLowerCase().includes(lowerQuery)) ||
      this.genre.some(g => g.toLowerCase().includes(lowerQuery)) ||
      this.description.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Movie;
} else {
  window.Movie = Movie;
}