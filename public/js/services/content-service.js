// Content service to load JSON data
// Handles loading and managing content from JSON files

class ContentService {
  constructor() {
    this.movies = [];
    this.tvshows = [];
    this.songs = [];
    this.books = [];
    this.games = [];
    this.isLoading = false;
  }

  // Load all content from JSON files
  async loadAllContent() {
    this.isLoading = true;
    try {
      // Load all content in parallel
      await Promise.all([
        this.loadMovies(),
        this.loadTvshows(),
        this.loadSongs(),
        this.loadBooks(),
        this.loadGames()
      ]);
      
      console.log('All content loaded successfully');
      return true;
    } catch (error) {
      console.error('Error loading content:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  // Load movies from movies.json
  async loadMovies() {
    try {
      const response = await fetch('/data/movies.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Validate and convert to Movie objects
      this.movies = data.map(item => {
        const movie = new window.Movie(item);
        const validation = movie.validate();
        if (!validation.isValid) {
          console.warn('Invalid movie data:', item, validation.errors);
        }
        return movie;
      });
      
      return true;
    } catch (error) {
      console.error('Error loading movies:', error);
      throw error;
    }
  }

  // Load books from books.json
  async loadBooks() {
    try {
      const response = await fetch('/data/books.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Validate and convert to Book objects
      this.books = data.map(item => {
        const book = new window.Book(item);
        const validation = book.validate();
        if (!validation.isValid) {
          console.warn('Invalid book data:', item, validation.errors);
        }
        return book;
      });
      
      return true;
    } catch (error) {
      console.error('Error loading books:', error);
      throw error;
    }
  }

  // Load games from games.json
  async loadGames() {
    try {
      const response = await fetch('/data/games.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Validate and convert to Game objects
      this.games = data.map(item => {
        const game = new window.Game(item);
        const validation = game.validate();
        if (!validation.isValid) {
          console.warn('Invalid game data:', item, validation.errors);
        }
        return game;
      });
      
      return true;
    } catch (error) {
      console.error('Error loading games:', error);
      throw error;
    }
  }

  // Load TV shows from tvshows.json
  async loadTvshows() {
    try {
      const response = await fetch('/data/tvshows.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // For TV shows, we'll use the same structure as movies with some additional fields
      this.tvshows = data.map(item => {
        // Create a TV show object similar to a movie but with additional fields
        const tvshow = {
          id: item.id || this.generateId(),
          title: item.title || '',
          year: item.year || 0,
          genre: Array.isArray(item.genre) ? item.genre : [],
          rating: item.rating || 0,
          description: item.description || '',
          cast: Array.isArray(item.cast) ? item.cast : [],
          creator: item.creator || '',
          episodes: item.episodes || 0,
          network: item.network || '',
          language: item.language || 'English',
          country: item.country || '',
          released: typeof item.released === 'boolean' ? item.released : true,
          type: 'tvshow'
        };
        
        return tvshow;
      });
      
      return true;
    } catch (error) {
      console.error('Error loading TV shows:', error);
      throw error;
    }
  }

  // Load songs from songs.json
  async loadSongs() {
    try {
      const response = await fetch('/data/songs.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // For songs, we'll create a simple song object
      this.songs = data.map(item => {
        const song = {
          id: item.id || this.generateId(),
          title: item.title || '',
          artist: item.artist || '',
          year: item.year || 0,
          genre: Array.isArray(item.genre) ? item.genre : [],
          rating: item.rating || 0,
          description: item.description || '',
          album: item.album || '',
          duration: item.duration || '',
          language: item.language || 'English',
          released: typeof item.released === 'boolean' ? item.released : true,
          type: 'song'
        };
        
        return song;
      });
      
      return true;
    } catch (error) {
      console.error('Error loading songs:', error);
      throw error;
    }
  }

  // Helper to generate a unique ID
  generateId() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Get content by type
  getContentByType(type) {
    switch (type.toLowerCase()) {
      case 'movie':
      case 'movies':
        return this.movies;
      case 'tvshow':
      case 'tvshows':
      case 'show':
      case 'shows':
        return this.tvshows;
      case 'song':
      case 'songs':
        return this.songs;
      case 'book':
      case 'books':
        return this.books;
      case 'game':
      case 'games':
        return this.games;
      default:
        throw new Error(`Unknown content type: ${type}`);
    }
  }

  // Get all content
  getAllContent() {
    return {
      movies: this.movies,
      tvshows: this.tvshows,
      songs: this.songs,
      books: this.books,
      games: this.games
    };
  }

  // Search across all content types
  search(query) {
    if (!query || typeof query !== 'string') {
      return { movies: [], tvshows: [], songs: [], books: [], games: [] };
    }
    
    const lowerQuery = query.toLowerCase();
    return {
      movies: this.movies.filter(movie => movie.matchesQuery(lowerQuery)),
      tvshows: this.tvshows.filter(tvshow => this.itemMatchesQuery(tvshow, lowerQuery)),
      songs: this.songs.filter(song => this.itemMatchesQuery(song, lowerQuery)),
      books: this.books.filter(book => book.matchesQuery(lowerQuery)),
      games: this.games.filter(game => game.matchesQuery(lowerQuery))
    };
  }

  // Helper method to check if a generic item matches a query
  itemMatchesQuery(item, query) {
    if (!item || !query) return false;
    
    const lowerQuery = query.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(lowerQuery)) ||
      (item.artist && item.artist.toLowerCase().includes(lowerQuery)) ||
      (item.creator && item.creator.toLowerCase().includes(lowerQuery)) ||
      (item.network && item.network.toLowerCase().includes(lowerQuery)) ||
      (item.album && item.album.toLowerCase().includes(lowerQuery)) ||
      (item.cast && Array.isArray(item.cast) && 
         item.cast.some(castMember => castMember.toLowerCase().includes(lowerQuery))) ||
      (item.genre && Array.isArray(item.genre) && 
         item.genre.some(g => g.toLowerCase().includes(lowerQuery))) ||
      (item.description && item.description.toLowerCase().includes(lowerQuery))
    );
  }

  // Get random item from specified type
  getRandomContent(type) {
    const content = this.getContentByType(type);
    if (!Array.isArray(content) || content.length === 0) {
      return null;
    }
    
    const randomIndex = Math.floor(Math.random() * content.length);
    return content[randomIndex];
  }

  // Find content by ID
  findContentById(type, id) {
    const content = this.getContentByType(type);
    return content.find(item => item.id === id);
  }

  // Get content stats
  getContentStats() {
    return {
      movieCount: this.movies.length,
      tvshowCount: this.tvshows.length,
      songCount: this.songs.length,
      bookCount: this.books.length,
      gameCount: this.games.length,
      total: this.movies.length + this.tvshows.length + this.songs.length + this.books.length + this.games.length
    };
  }

  // Save content to JSON files (for admin/update purposes)
  async saveContentToFiles() {
    try {
      // Stringify the JSON with proper formatting
      const moviesJson = JSON.stringify(this.movies.map(m => m.toJSON()), null, 2);
      const booksJson = JSON.stringify(this.books.map(b => b.toJSON()), null, 2);
      const gamesJson = JSON.stringify(this.games.map(g => g.toJSON()), null, 2);
      
      // Note: Actually saving to files would require a backend API
      // For now, we'll just return the formatted JSON
      return {
        moviesJson,
        booksJson,
        gamesJson
      };
    } catch (error) {
      console.error('Error preparing content for saving:', error);
      throw error;
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ContentService;
} else {
  window.ContentService = ContentService;
}