// Category navigation component
// Handles navigation between different content categories

class NavComponent {
  constructor(contentService) {
    this.contentService = contentService;
    this.currentCategory = null;
    this.navElements = {};
    this.setupEventListeners();
  }

  // Set up event listeners for navigation
  setupEventListeners() {
    // Set up event listeners for the existing category buttons
    const filmButton = document.getElementById('getfilm');
    const showButton = document.getElementById('getshow');
    const gameButton = document.getElementById('getgame');
    const songButton = document.getElementById('getsong');
    const bookButton = document.getElementById('getbook');

    // Map UI buttons to actual content types
    if (filmButton) {
      filmButton.addEventListener('click', () => this.selectCategory('movies'));
    }
    
    if (showButton) {
      showButton.addEventListener('click', () => this.selectCategory('tvshows'));
    }
    
    if (gameButton) {
      gameButton.addEventListener('click', () => this.selectCategory('games'));
    }
    
    if (songButton) {
      songButton.addEventListener('click', () => this.selectCategory('songs'));
    }
    
    if (bookButton) {
      bookButton.addEventListener('click', () => this.selectCategory('books'));
    }
  }

  // Select a category and update the UI
  selectCategory(category) {
    // Map the UI button categories to our actual data types
    switch(category) {
      case 'movies':
      case 'tvshows':
      case 'songs':
      case 'books':
      case 'games':
        this.currentCategory = category;
        break;
      case 'films':  // Alias for movies
        this.currentCategory = 'movies';
        break;
      case 'shows':  // Alias for tvshows
        this.currentCategory = 'tvshows';
        break;
      default:
        this.currentCategory = 'movies'; // Default to movies
    }
    
    this.updateActiveButton(this.currentCategory);
    this.displayCategoryInfo(this.currentCategory);
  }

  // Update which category button is marked as active
  updateActiveButton(category) {
    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('#actions .btn');
    allButtons.forEach(button => {
      // Remove any active styling (we'll just log for now since we don't have specific CSS for it)
      button.classList.remove('active-category');
    });

    // For this implementation, we're using the existing button IDs
    // but we'll map them to our categories
    let buttonId = '';
    switch (category) {
      case 'movies':
        // For movies, we could use either getfilm or getshow
        buttonId = 'getfilm';
        break;
      case 'books':
        buttonId = 'getbook';
        break;
      case 'games':
        buttonId = 'getgame';
        break;
      default:
        buttonId = 'getfilm'; // default to film
    }

    const activeButton = document.getElementById(buttonId);
    if (activeButton) {
      activeButton.classList.add('active-category');
    }
  }

  // Display information about the selected category
  displayCategoryInfo(category) {
    const resultTitle = document.getElementById('result-title');
    const resultCategory = document.getElementById('result-category');
    const resultAuthor = document.getElementById('result-author');
    const resultYear = document.getElementById('result-year');

    if (!resultTitle || !resultCategory || !resultAuthor || !resultYear) {
      console.error('Required result elements not found');
      return;
    }

    // Set the title based on category
    switch (category) {
      case 'movies':
        resultTitle.textContent = 'Movie';
        resultCategory.textContent = 'Film Category';
        break;
      case 'tvshows':
        resultTitle.textContent = 'TV Show';
        resultCategory.textContent = 'Television Category';
        break;
      case 'songs':
        resultTitle.textContent = 'Song';
        resultCategory.textContent = 'Music Category';
        break;
      case 'books':
        resultTitle.textContent = 'Book';
        resultCategory.textContent = 'Literature Category';
        break;
      case 'games':
        resultTitle.textContent = 'Game';
        resultCategory.textContent = 'Video Game Category';
        break;
      default:
        resultTitle.textContent = 'Content';
        resultCategory.textContent = 'General Category';
    }

    // Clear the author/year fields until content is selected
    resultAuthor.textContent = 'Select an item to draw for charades';
    resultYear.textContent = '';
  }

  // Get the currently selected category
  getCurrentCategory() {
    return this.currentCategory;
  }

  // Render a specific item in the results area
  async renderItem(item) {
    if (!item) {
      console.error('Cannot render null item');
      return;
    }

    const resultTitle = document.getElementById('result-title');
    const resultCategory = document.getElementById('result-category');
    const resultAuthor = document.getElementById('result-author');
    const resultYear = document.getElementById('result-year');

    if (!resultTitle || !resultCategory || !resultAuthor || !resultYear) {
      console.error('Required result elements not found');
      return;
    }

    // Set the content based on the item type
    resultTitle.textContent = item.title;
    resultYear.textContent = item.year ? `(${item.year})` : '';

    // Set category and author based on item type
    if (item.constructor && item.constructor.name === 'Movie') {
      resultCategory.textContent = 'Movie';
      resultAuthor.textContent = item.director ? `Director: ${item.director}` : 'Film';
    } else if (item.constructor && item.constructor.name === 'Book') {
      resultCategory.textContent = 'Book';
      resultAuthor.textContent = item.author ? `Author: ${item.author}` : 'Literature';
    } else if (item.constructor && item.constructor.name === 'Game') {
      resultCategory.textContent = 'Game';
      resultAuthor.textContent = item.developer ? `Developer: ${item.developer}` : 'Video Game';
    } else if (item.type === 'tvshow') {
      resultCategory.textContent = 'TV Show';
      resultAuthor.textContent = item.creator ? `Creator: ${item.creator}` : 'Television';
    } else if (item.type === 'song') {
      resultCategory.textContent = 'Song';
      resultAuthor.textContent = item.artist ? `Artist: ${item.artist}` : 'Music';
    } else {
      resultCategory.textContent = 'Content';
      resultAuthor.textContent = 'Item';
    }
  }

  // Get a random item from the current category
  async getRandomItem() {
    if (!this.currentCategory) {
      console.warn('No category selected, defaulting to movies');
      this.currentCategory = 'movies';
    }

    return this.contentService.getRandomContent(this.currentCategory);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavComponent;
} else {
  window.NavComponent = NavComponent;
}