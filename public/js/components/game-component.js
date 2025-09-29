// Game display component
// Handles the display of game information in the UI

class GameComponent {
  constructor(game, containerId) {
    this.game = game;
    this.containerId = containerId;
    this.container = typeof containerId === 'string' ? 
      document.getElementById(containerId) : containerId;
  }

  // Render the game information in the container
  render() {
    if (!this.container) {
      console.error(`Container with ID "${this.containerId}" not found`);
      return;
    }

    // Create the game display HTML
    const gameHtml = this.createGameHtml();

    // Set the HTML content
    this.container.innerHTML = gameHtml;

    // Add event listeners if needed
    this.addEventListeners();
  }

  // Create the HTML structure for a game
  createGameHtml() {
    return `
      <div class="game-card">
        <div class="game-header">
          <h3 class="game-title">${this.escapeHtml(this.game.title)}</h3>
          <span class="game-developer">${this.escapeHtml(this.game.developer)}</span>
        </div>
        
        ${this.game.cover ? 
          `<div class="game-cover">
            <img src="${this.escapeHtml(this.game.cover)}" 
                 alt="${this.escapeHtml(this.game.title)} cover" 
                 class="cover-image">
          </div>` : ''}
        
        <div class="game-details">
          <p class="game-year"><strong>Year:</strong> ${this.game.year}</p>
          <p class="game-rating"><strong>Rating:</strong> ${this.game.rating}/10</p>
          <p class="game-genre"><strong>Genre:</strong> ${this.escapeHtml(this.game.genre.join(', '))}</p>
          <p class="game-platform"><strong>Platform(s):</strong> ${this.escapeHtml(this.game.platform.join(', '))}</p>
          <p class="game-language"><strong>Language:</strong> ${this.escapeHtml(this.game.language)}</p>
          ${this.game.esrbRating ? 
            `<p class="game-esrb"><strong>ESRB Rating:</strong> ${this.escapeHtml(this.game.esrbRating)}</p>` : ''}
          ${this.game.publisher ? 
            `<p class="game-publisher"><strong>Publisher:</strong> ${this.escapeHtml(this.game.publisher)}</p>` : ''}
        </div>
        
        <div class="game-description">
          <h4>Description</h4>
          <p>${this.escapeHtml(this.game.description)}</p>
        </div>
        
        ${this.game.trailer ? 
          `<div class="game-trailer">
            <a href="${this.escapeHtml(this.game.trailer)}" target="_blank">Watch Trailer</a>
          </div>` : ''}
      </div>
    `;
  }

  // Add event listeners to interactive elements
  addEventListeners() {
    // Add click event to trailer link if it exists
    const trailerLink = this.container.querySelector('.game-trailer a');
    if (trailerLink) {
      trailerLink.addEventListener('click', (e) => {
        this.onTrailerClick(e, this.game);
      });
    }
  }

  // Handle trailer click
  onTrailerClick(event, game) {
    console.log('Game trailer clicked for:', game.title);
    // Additional handling can be added here
  }

  // Update the game data and re-render
  updateGame(newGame) {
    this.game = newGame;
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
      <h2 class="h1">${this.escapeHtml(this.game.title)}</h2>
      <p class="lead">(${this.game.year})</p>
      <p>Developer: ${this.escapeHtml(this.game.developer)}</p>
      <small class="text-muted">Video Game</small>
    `;

    this.container.innerHTML = simpleHtml;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameComponent;
} else {
  window.GameComponent = GameComponent;
}