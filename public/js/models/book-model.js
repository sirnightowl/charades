// Book data model utility
// Represents a literary work in the content catalog

class Book {
  constructor(data) {
    this.id = data.id || this.generateId();
    this.title = data.title || '';
    this.author = data.author || '';
    this.year = data.year || 0;
    this.genre = Array.isArray(data.genre) ? data.genre : [];
    this.rating = data.rating || 0;
    this.description = data.description || '';
    this.pages = data.pages || 0;
    this.isbn = data.isbn || '';
    this.language = data.language || 'English';
    this.publisher = data.publisher || '';
    this.cover = data.cover || '';
    this.format = data.format || 'paperback';
    this.released = typeof data.released === 'boolean' ? data.released : true;
  }

  // Generate a unique ID if not provided
  generateId() {
    return 'book_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Validate the book data
  validate() {
    const errors = [];

    if (!this.title || typeof this.title !== 'string' || this.title.trim() === '') {
      errors.push('Book title is required');
    }

    if (!this.author || typeof this.author !== 'string' || this.author.trim() === '') {
      errors.push('Book author is required');
    }

    if (!this.year || typeof this.year !== 'number' || this.year < 1800 || this.year > new Date().getFullYear()) {
      errors.push('Book year must be between 1800 and current year');
    }

    if (!Array.isArray(this.genre) || this.genre.length === 0) {
      errors.push('Book genre is required and must be an array');
    }

    if (typeof this.rating !== 'number' || this.rating < 0 || this.rating > 10) {
      errors.push('Book rating must be between 0 and 10');
    }

    if (!this.description || typeof this.description !== 'string' || this.description.trim() === '') {
      errors.push('Book description is required');
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
      author: this.author,
      year: this.year,
      genre: this.genre,
      rating: this.rating,
      description: this.description,
      pages: this.pages,
      isbn: this.isbn,
      language: this.language,
      publisher: this.publisher,
      cover: this.cover,
      format: this.format,
      released: this.released
    };
  }

  // Get a formatted string for display
  getDisplayTitle() {
    return `${this.title} by ${this.author} (${this.year})`;
  }

  // Check if book matches a search query
  matchesQuery(query) {
    const lowerQuery = query.toLowerCase();
    return (
      this.title.toLowerCase().includes(lowerQuery) ||
      this.author.toLowerCase().includes(lowerQuery) ||
      this.publisher?.toLowerCase().includes(lowerQuery) ||
      this.genre.some(g => g.toLowerCase().includes(lowerQuery)) ||
      this.description.toLowerCase().includes(lowerQuery)
    );
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Book;
} else {
  window.Book = Book;
}