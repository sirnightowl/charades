// Search functionality utilities
// Provides search capabilities across content types

class SearchUtils {
  constructor(contentService) {
    this.contentService = contentService;
    this.searchHistory = [];
    this.maxHistorySize = 10;
  }

  // Perform a search across all content types
  search(query) {
    if (!query || typeof query !== 'string' || query.trim() === '') {
      return {
        movies: [],
        tvshows: [],
        songs: [],
        books: [],
        games: [],
        totalResults: 0
      };
    }

    // Use the content service's search method
    const results = this.contentService.search(query);
    
    // Calculate total results
    const totalResults = results.movies.length + results.tvshows.length + results.songs.length + results.books.length + results.games.length;
    
    // Add to search history
    this.addToHistory(query);
    
    return {
      ...results,
      totalResults: totalResults
    };
  }

  // Add search query to history
  addToHistory(query) {
    // Check if query already exists in history
    const existsIndex = this.searchHistory.findIndex(item => item.query === query);
    
    if (existsIndex !== -1) {
      // Move existing query to the front
      const existingItem = this.searchHistory[existsIndex];
      existingItem.timestamp = new Date();
      this.searchHistory.splice(existsIndex, 1);
      this.searchHistory.unshift(existingItem);
    } else {
      // Add new query to history
      this.searchHistory.unshift({
        query: query,
        timestamp: new Date()
      });
    }
    
    // Limit history size
    if (this.searchHistory.length > this.maxHistorySize) {
      this.searchHistory = this.searchHistory.slice(0, this.maxHistorySize);
    }
  }

  // Get search history
  getHistory() {
    return [...this.searchHistory]; // Return a copy
  }

  // Clear search history
  clearHistory() {
    this.searchHistory = [];
  }

  // Filter content by specific criteria
  filterContent(contentType, filters = {}) {
    let content = this.contentService.getContentByType(contentType);
    
    // Apply filters
    if (filters.year) {
      content = content.filter(item => item.year == filters.year);
    }
    
    if (filters.genre) {
      const lowerGenre = filters.genre.toLowerCase();
      content = content.filter(item => 
        item.genre && Array.isArray(item.genre) && 
        item.genre.some(g => g.toLowerCase().includes(lowerGenre))
      );
    }
    
    if (filters.ratingMin) {
      content = content.filter(item => item.rating >= filters.ratingMin);
    }
    
    if (filters.ratingMax) {
      content = content.filter(item => item.rating <= filters.ratingMax);
    }
    
    return content;
  }

  // Search with advanced options
  advancedSearch(options = {}) {
    const {
      query = '',
      contentTypes = ['movies', 'tvshows', 'songs', 'books', 'games'],
      filters = {}
    } = options;
    
    const results = {};
    let totalResults = 0;
    
    for (const type of contentTypes) {
      let content = this.contentService.getContentByType(type);
      
      // Apply text search if query provided
      if (query) {
        // Different content types have different matching methods
        if (['movies', 'books', 'games'].includes(type)) {
          // For movies, books, games that have the matchesQuery method
          content = content.filter(item => item.matchesQuery(query));
        } else {
          // For tvshows and songs that use the generic matching
          content = content.filter(item => 
            this.contentService.itemMatchesQuery(item, query)
          );
        }
      }
      
      // Apply additional filters
      if (filters.year) {
        content = content.filter(item => item.year == filters.year);
      }
      
      if (filters.genre) {
        const lowerGenre = filters.genre.toLowerCase();
        content = content.filter(item => 
          item.genre && Array.isArray(item.genre) && 
          item.genre.some(g => g.toLowerCase().includes(lowerGenre))
        );
      }
      
      if (filters.ratingMin) {
        content = content.filter(item => item.rating >= filters.ratingMin);
      }
      
      if (filters.ratingMax) {
        content = content.filter(item => item.rating <= filters.ratingMax);
      }
      
      results[type] = content;
      totalResults += content.length;
    }
    
    // Add to search history if there was a query
    if (query) {
      this.addToHistory(query);
    }
    
    return {
      ...results,
      totalResults: totalResults
    };
  }

  // Get search suggestions based on history
  getSuggestions(input) {
    if (!input) return [];
    
    const lowerInput = input.toLowerCase();
    return this.searchHistory
      .filter(item => item.query.toLowerCase().includes(lowerInput))
      .map(item => item.query)
      .slice(0, 5); // Return top 5 suggestions
  }

  // Get content by IDs
  getContentByIds(contentType, ids) {
    const allContent = this.contentService.getContentByType(contentType);
    return allContent.filter(item => ids.includes(item.id));
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SearchUtils;
} else {
  window.SearchUtils = SearchUtils;
}