// Game data model utility
// Represents an interactive game in the content catalog

class Game {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.title = data.title || '';
    this.developer = data.developer || '';
    this.year = data.year || 0;
    this.genre = Array.isArray(data.genre) ? data.genre : [];
    this.rating = data.rating || 0;
    this.description = data.description || '';
    this.platform = Array.isArray(data.platform) ? data.platform : [];
    this.cover = data.cover || '';
    this.trailer = data.trailer || '';
    this.publisher = data.publisher || '';
    this.language = data.language || 'English';
    this.released = typeof data.released === 'boolean' ? data.released : true;
    this.esrbRating = data.esrbRating || '';
  }

  // Generate a unique ID if not provided
  generateId() {
    return 'game_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Validate the game data
  validate() {
    const errors = [];

    if (!this.title || typeof this.title !== 'string' || this.title.trim() === '') {
      errors.push('Game title is required');
    }

    if (!this.year || typeof this.year !== 'number' || this.year < 1958 || this.year > new Date().getFullYear()) {
      errors.push('Game year must be between 1958 and current year');
    }

    if (!Array.isArray(this.genre) || this.genre.length === 0) {
      errors.push('Game genre is required and must be an array');
    }

    if (typeof this.rating !== 'number' || this.rating < 0 || this.rating > 10) {
      errors.push('Game rating must be between 0 and 10');
    }

    if (!this.description || typeof this.description !== 'string' || this.description.trim() === '') {
      errors.push('Game description is required');
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
      developer: this.developer,
      year: this.year,
      genre: this.genre,
      rating: this.rating,
      description: this.description,
      platform: this.platform,
      cover: this.cover,
      trailer: this.trailer,
      publisher: this.publisher,
      language: this.language,
      released: this.released,
      esrbRating: this.esrbRating
    };
  }

  // Get a formatted string for display
  getDisplayTitle() {
    return `${this.title} (${this.year})`;
  }

  // Check if game matches a search query
  matchesQuery(query) {
    const lowerQuery = query.toLowerCase();
    return (
      this.title.toLowerCase().includes(lowerQuery) ||
      this.developer?.toLowerCase().includes(lowerQuery) ||
      this.publisher?.toLowerCase().includes(lowerQuery) ||
      this.platform.some(p => p.toLowerCase().includes(lowerQuery)) ||
      this.genre.some(g => g.toLowerCase().includes(lowerQuery)) ||
      this.description.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Game;
} else {
  window.Game = Game;
}