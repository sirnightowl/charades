// Book display component
// Handles the display of book information in the UI

class BookComponent {
  constructor(book, containerId) {
    this.book = book;
    this.containerId = containerId;
    this.container = typeof containerId === 'string' ? 
      document.getElementById(containerId) : containerId;
  }

  // Render the book information in the container
  render() {
    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found`);
      return;
    }

    // Create the book display HTML
    const bookHtml = this.createBookHtml();

    // Set the HTML content
    this.container.innerHTML = bookHtml;

    // Add event listeners if needed
    this.addEventListeners();
  }

  // Create the HTML structure for a book
  createBookHtml() {
    return `
      <div class="book-card">
        <div class="book-header">
          <h3 class="book-title">${this.escapeHtml(this.book.title)}</h3>
          <span class="book-author">${this.escapeHtml(this.book.author)}</span>
        </div>
        
        ${this.book.cover ? 
          `<div class="book-cover">
            <img src="${this.escapeHtml(this.book.cover)}" 
                 alt="${this.escapeHtml(this.book.title)} cover" 
                 class="cover-image">
          </div>` : ''}
        
        <div class="book-details">
          <p class="book-year"><strong>Year:</strong> ${this.book.year}</p>
          <p class="book-rating"><strong>Rating:</strong> ${this.book.rating}/10</p>
          <p class="book-genre"><strong>Genre:</strong> ${this.escapeHtml(this.book.genre.join(', '))}</p>
          <p class="book-language"><strong>Language:</strong> ${this.escapeHtml(this.book.language)}</p>
          ${this.book.pages ? 
            `<p class="book-pages"><strong>Pages:</strong> ${this.book.pages}</p>` : ''}
          ${this.book.publisher ? 
            `<p class="book-publisher"><strong>Publisher:</strong> ${this.escapeHtml(this.book.publisher)}</p>` : ''}
          ${this.book.format ? 
            `<p class="book-format"><strong>Format:</strong> ${this.escapeHtml(this.book.format)}</p>` : ''}
        </div>
        
        <div class="book-description">
          <h4>Description</h4>
          <p>${this.escapeHtml(this.book.description)}</p>
        </div>
        
        ${this.book.isbn ? 
          `<div class="book-isbn">
            <p><strong>ISBN:</strong> ${this.escapeHtml(this.book.isbn)}</p>
          </div>` : ''}
      </div>
    `;
  }

  // Add event listeners to interactive elements
  addEventListeners() {
    // Add any specific event listeners for books
  }

  // Update the book data and re-render
  updateBook(newBook) {
    this.book = newBook;
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
      <h2 class="h1">${this.escapeHtml(this.book.title)}</h2>
      <p class="lead">by ${this.escapeHtml(this.book.author)} (${this.book.year})</p>
      <small class="text-muted">Book</small>
    `;

    this.container.innerHTML = simpleHtml;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BookComponent;
} else {
  window.BookComponent = BookComponent;
}