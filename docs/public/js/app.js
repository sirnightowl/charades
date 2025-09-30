// Main app controller
// Orchestrates all components and manages the overall application flow

class App {
  constructor() {
    this.contentService = new window.ContentService();
    this.navComponent = new window.NavComponent(this.contentService);
    this.searchUtils = new window.SearchUtils(this.contentService);
    this.currentCategory = null;
    this.currentItem = null;
    
    // Initialize components when DOM is loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.init();
      });
    } else {
      this.init();
    }
  }

  // Initialize the application
  async init() {
    try {
      console.log('Initializing Charades Content Catalog App...');
      
      // Show loading state
      this.showLoadingState();
      
      // Load all content from JSON files
      await this.contentService.loadAllContent();
      console.log('Content loaded successfully');
      
      // Initialize usage tracker after content load
      this.contentService.initUsageTracker();
      
      // Initialize new UX features
      this.initUXFeatures();
      
      // Update the UI with content stats
      this.updateContentStats();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Initialize PWA features
      this.initPWA();
      
      // Hide loading state
      this.hideLoadingState();
      
      console.log('App initialized successfully');
    } catch (error) {
      console.error('Error initializing app:', error);
      this.hideLoadingState();
      this.showError('Failed to load content. Please try again later.');
    }
  }

  // Initialize UX features (settings, card info, screen wake lock)
  initUXFeatures() {
    // Initialize settings manager if available
    if (window.SettingsManager) {
      this.settingsManager = new window.SettingsManager();
      console.log('Settings manager initialized');
    }
    
    // Initialize card info component if available
    if (window.CardInfo) {
      this.cardInfo = new window.CardInfo();
      console.log('Card info component initialized');
    }
    
    // Initialize screen wake lock if available
    if (window.ScreenWakeLock) {
      this.screenWakeLock = new window.ScreenWakeLock();
      console.log('Screen wake lock initialized');
    }
  }

  // Set up event listeners for the application
  setupEventListeners() {
    // Set up the existing buttons to work with our new system
    const filmButton = document.getElementById('getfilm');
    const showButton = document.getElementById('getshow');
    const gameButton = document.getElementById('getgame');
    const songButton = document.getElementById('getsong');
    const bookButton = document.getElementById('getbook');

    // Handle the film button click
    if (filmButton) {
      filmButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.selectCategoryAndShowItem('movies');
        // Request screen wake lock if enabled
        if (this.screenWakeLock && this.settingsManager.screenWakeActive) {
          await this.screenWakeLock.requestWakeLock();
        }
      });
    }

    // Handle the show button click (now properly mapped to tvshows)
    if (showButton) {
      showButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.selectCategoryAndShowItem('tvshows');
        // Request screen wake lock if enabled
        if (this.screenWakeLock && this.settingsManager.screenWakeActive) {
          await this.screenWakeLock.requestWakeLock();
        }
      });
    }

    // Handle the game button click
    if (gameButton) {
      gameButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.selectCategoryAndShowItem('games');
        // Request screen wake lock if enabled
        if (this.screenWakeLock && this.settingsManager.screenWakeActive) {
          await this.screenWakeLock.requestWakeLock();
        }
      });
    }

    // Handle the song button click (now properly mapped to songs)
    if (songButton) {
      songButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.selectCategoryAndShowItem('songs');
        // Request screen wake lock if enabled
        if (this.screenWakeLock && this.settingsManager.screenWakeActive) {
          await this.screenWakeLock.requestWakeLock();
        }
      });
    }

    // Handle the book button click
    if (bookButton) {
      bookButton.addEventListener('click', async (e) => {
        e.preventDefault();
        await this.selectCategoryAndShowItem('books');
        // Request screen wake lock if enabled
        if (this.screenWakeLock && this.settingsManager.screenWakeActive) {
          await this.screenWakeLock.requestWakeLock();
        }
      });
    }

    // Set up search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchContainer = document.getElementById('search-container');

    if (searchInput && searchButton) {
      // Show search when user focuses on input
      searchInput.addEventListener('focus', () => {
        searchContainer.style.display = 'block';
      });

      // Perform search when button is clicked
      searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.performSearch(searchInput.value);
      });

      // Perform search when Enter is pressed
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.performSearch(searchInput.value);
        }
      });
    }
  }

  // Select a category and show a random item from it
  async selectCategoryAndShowItem(category) {
    try {
      // Show loading state
      this.showLoadingState();
      
      // Update the current category
      this.currentCategory = category;
      
      // Get a random item from the selected category
      const item = await this.contentService.getRandomContent(category);
      
      if (!item) {
        this.showError(`No items available in ${category} category`);
        return;
      }
      
      // Update the current item
      this.currentItem = item;
      
      // Render the item in the UI
      this.renderCurrentItem();
      
      console.log(`Selected ${category}:`, item.title);
    } catch (error) {
      console.error(`Error selecting ${category}:`, error);
      this.showError(`Error loading ${category} content`);
    } finally {
      // Make sure loading state is hidden even if there's an error
      this.hideLoadingState();
    }
  }

  // Render the current item in the UI
  renderCurrentItem() {
    if (!this.currentItem) {
      console.warn('No current item to render');
      return;
    }

    const resultTitle = document.getElementById('result-title');
    const resultCategory = document.getElementById('result-category');
    const resultAuthor = document.getElementById('result-author');
    const resultYear = document.getElementById('result-year');
    const resultElement = document.getElementById('result');

    if (!resultTitle || !resultCategory || !resultAuthor || !resultYear || !resultElement) {
      console.error('Required result elements not found');
      return;
    }

    // Set the content based on the item type
    resultTitle.textContent = this.currentItem.title;
    resultYear.textContent = this.currentItem.year ? `(${this.currentItem.year})` : '';

    // Set category and additional info based on item type
    if (this.currentItem.constructor && this.currentItem.constructor.name === 'Movie') {
      resultCategory.textContent = 'Movie';
      resultAuthor.textContent = this.currentItem.director ? 
        `Director: ${this.currentItem.director}` : 'Film';
    } else if (this.currentItem.constructor && this.currentItem.constructor.name === 'Book') {
      resultCategory.textContent = 'Book';
      resultAuthor.textContent = this.currentItem.author ? 
        `Author: ${this.currentItem.author}` : 'Literature';
    } else if (this.currentItem.constructor && this.currentItem.constructor.name === 'Game') {
      resultCategory.textContent = 'Game';
      resultAuthor.textContent = this.currentItem.developer ? 
        `Developer: ${this.currentItem.developer}` : 'Video Game';
    } else if (this.currentItem.type === 'tvshow') {
      resultCategory.textContent = 'TV Show';
      resultAuthor.textContent = this.currentItem.creator ? 
        `Creator: ${this.currentItem.creator}` : 'Television';
    } else if (this.currentItem.type === 'song') {
      resultCategory.textContent = 'Song';
      resultAuthor.textContent = this.currentItem.artist ? 
        `Artist: ${this.currentItem.artist}` : 'Music';
    } else {
      resultCategory.textContent = 'Content';
      resultAuthor.textContent = 'Item';
    }

    // Add info button to the card if cardInfo is available
    if (this.cardInfo) {
      this.cardInfo.addInfoButtonToCard(resultElement, this.currentItem);
    }
  }

  // Update content stats in the UI
  updateContentStats() {
    const stats = this.contentService.getContentStats();
    
    // For now, just log the stats - in a real implementation, we might display these somewhere
    console.log('Content Stats:', stats);
  }

  // Show an error message
  showError(message) {
    console.error(message);
    
    // Update the result area to show the error
    const resultTitle = document.getElementById('result-title');
    const resultAuthor = document.getElementById('result-author');
    
    if (resultTitle && resultAuthor) {
      resultTitle.textContent = 'Error';
      resultAuthor.textContent = message;
    }
  }

  // Perform a search
  performSearch(query) {
    try {
      if (!query || query.trim() === '') {
        this.hideSearchResults();
        return;
      }

      const results = this.searchUtils.search(query);
      console.log('Search results:', results);
      
      // Display search results
      this.displaySearchResults(results, query);
      
      return results;
    } catch (error) {
      console.error('Search error:', error);
      this.showError('Search failed');
      return null;
    }
  }

  // Display search results in the UI
  displaySearchResults(results, query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) {
      console.error('Search results container not found');
      return;
    }

    if (results.totalResults === 0) {
      searchResults.innerHTML = `<p>No results found for "${query}"</p>`;
      searchResults.style.display = 'block';
      return;
    }

    let html = `<h3>Search Results for "${query}"</h3>`;
    
    // Display movie results
    if (results.movies.length > 0) {
      html += `<h4>Movies (${results.movies.length})</h4><ul>`;
      results.movies.slice(0, 5).forEach(movie => {
        html += `<li><strong>${movie.title}</strong> (${movie.year}) - ${movie.director || 'N/A'}</li>`;
      });
      if (results.movies.length > 5) {
        html += `<li>... and ${results.movies.length - 5} more</li>`;
      }
      html += '</ul>';
    }

    // Display book results
    if (results.books.length > 0) {
      html += `<h4>Books (${results.books.length})</h4><ul>`;
      results.books.slice(0, 5).forEach(book => {
        html += `<li><strong>${book.title}</strong> (${book.year}) - ${book.author || 'N/A'}</li>`;
      });
      if (results.books.length > 5) {
        html += `<li>... and ${results.books.length - 5} more</li>`;
      }
      html += '</ul>';
    }

    // Display game results
    if (results.games.length > 0) {
      html += `<h4>Games (${results.games.length})</h4><ul>`;
      results.games.slice(0, 5).forEach(game => {
        html += `<li><strong>${game.title}</strong> (${game.year}) - ${game.developer || 'N/A'}</li>`;
      });
      if (results.games.length > 5) {
        html += `<li>... and ${results.games.length - 5} more</li>`;
      }
      html += '</ul>';
    }

    searchResults.innerHTML = html;
    searchResults.style.display = 'block';
  }

  // Hide search results
  hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (searchResults) {
      searchResults.style.display = 'none';
      searchResults.innerHTML = '';
    }
  }

  // Initialize PWA features
  initPWA() {
    // Register service worker if supported
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Add to home screen prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      console.log('Ready to install PWA');
    });
    
    // Initialize screen wake lock settings if available
    if (this.settingsManager && this.screenWakeLock) {
      // Request wake lock if it was enabled in settings
      if (this.settingsManager.screenWakeActive) {
        this.screenWakeLock.requestWakeLock();
      }
    }
  }

  // Show loading state
  showLoadingState() {
    const resultTitle = document.getElementById('result-title');
    const resultAuthor = document.getElementById('result-author');
    const resultYear = document.getElementById('result-year');
    
    if (resultTitle && resultAuthor && resultYear) {
      resultTitle.textContent = 'Loading...';
      resultAuthor.textContent = 'Please wait while we load the content';
      resultYear.textContent = '';
    }
  }

  // Hide loading state
  hideLoadingState() {
    const resultTitle = document.getElementById('result-title');
    if (resultTitle) {
      resultTitle.textContent = 'Charades.';
    }
  }

  // Show an error message
  showError(message) {
    console.error(message);
    
    // Update the result area to show the error
    const resultTitle = document.getElementById('result-title');
    const resultAuthor = document.getElementById('result-author');
    const resultYear = document.getElementById('result-year');
    
    if (resultTitle && resultAuthor && resultYear) {
      resultTitle.textContent = 'Error';
      resultAuthor.textContent = message;
      resultYear.textContent = '';
    }
  }

  // Get current content stats
  getContentStats() {
    return this.contentService.getContentStats();
  }

  // Get all content
  getAllContent() {
    return this.contentService.getAllContent();
  }

  // Get content by type
  getContentByType(type) {
    return this.contentService.getContentByType(type);
  }

  // Get a random item by type
  getRandomItem(type) {
    return this.contentService.getRandomContent(type);
  }
}

// Initialize the app when the script loads
let app;
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app = new App();
    window.app = app; // Make app accessible globally for usage tracker
  });
} else {
  app = new App();
  window.app = app; // Make app accessible globally for usage tracker
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
} else {
  window.App = App;
}