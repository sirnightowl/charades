// Unit tests for Content Service
// Tests the functionality of the ContentService class

function testContentService() {
  console.log('Starting Content Service tests...');
  let passed = 0;
  let failed = 0;

  // Test 1: Creating a content service instance
  try {
    const contentService = new ContentService();
    
    if (contentService && 
        Array.isArray(contentService.movies) && 
        Array.isArray(contentService.books) && 
        Array.isArray(contentService.games) &&
        contentService.isLoading === false) {
      console.log('✓ Test 1 PASSED: ContentService created with correct initial state');
      passed++;
    } else {
      console.log('✗ Test 1 FAILED: ContentService not created correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 1 FAILED: Error creating ContentService:', error);
    failed++;
  }

  // Test 2: Loading empty content (should work without errors)
  try {
    const contentService = new ContentService();
    
    // Mock the fetch function to simulate empty JSON responses
    const originalFetch = window.fetch;
    window.fetch = async (url) => {
      if (url.includes('movies.json')) {
        return {
          ok: true,
          json: async () => []
        };
      } else if (url.includes('books.json')) {
        return {
          ok: true,
          json: async () => []
        };
      } else if (url.includes('games.json')) {
        return {
          ok: true,
          json: async () => []
        };
      }
      return { ok: false };
    };

    // Test loadMovies specifically
    await contentService.loadMovies();
    
    if (Array.isArray(contentService.movies) && contentService.movies.length === 0) {
      console.log('✓ Test 2 PASSED: Can load empty movies data');
      passed++;
    } else {
      console.log('✗ Test 2 FAILED: Could not load empty movies data');
      failed++;
    }

    // Restore original fetch
    window.fetch = originalFetch;
  } catch (error) {
    console.log('✗ Test 2 FAILED: Error loading empty content:', error);
    failed++;
  }

  // Test 3: Loading content with valid data
  try {
    const contentService = new ContentService();
    
    // Mock the fetch function to simulate valid JSON responses
    const originalFetch = window.fetch;
    const validMovies = [
      { id: 'movie-1', title: 'Test Movie', year: 2022, genre: ['Action'], rating: 8.0, description: 'Test' }
    ];
    const validBooks = [
      { id: 'book-1', title: 'Test Book', author: 'Test Author', year: 2021, genre: ['Fiction'], rating: 7.5, description: 'Test' }
    ];
    const validGames = [
      { id: 'game-1', title: 'Test Game', developer: 'Test Dev', year: 2020, genre: ['RPG'], rating: 9.0, description: 'Test' }
    ];
    
    window.fetch = async (url) => {
      if (url.includes('movies.json')) {
        return {
          ok: true,
          json: async () => validMovies
        };
      } else if (url.includes('books.json')) {
        return {
          ok: true,
          json: async () => validBooks
        };
      } else if (url.includes('games.json')) {
        return {
          ok: true,
          json: async () => validGames
        };
      }
      return { ok: false };
    };

    // Load movies, books, and games
    await contentService.loadMovies();
    await contentService.loadBooks();
    await contentService.loadGames();
    
    if (contentService.movies.length === 1 && 
        contentService.books.length === 1 && 
        contentService.games.length === 1 &&
        contentService.movies[0].title === 'Test Movie' &&
        contentService.books[0].title === 'Test Book' &&
        contentService.games[0].title === 'Test Game') {
      console.log('✓ Test 3 PASSED: Can load content with valid data');
      passed++;
    } else {
      console.log('✗ Test 3 FAILED: Could not load content with valid data correctly');
      failed++;
    }

    // Restore original fetch
    window.fetch = originalFetch;
  } catch (error) {
    console.log('✗ Test 3 FAILED: Error loading content with valid data:', error);
    failed++;
  }

  // Test 4: Get content by type
  try {
    const contentService = new ContentService();
    // Add some mock data directly
    contentService.movies = [
      new Movie({ id: 'movie-1', title: 'Test Movie', year: 2022, genre: ['Action'], rating: 8.0, description: 'Test' })
    ];
    contentService.books = [
      new Book({ id: 'book-1', title: 'Test Book', author: 'Test Author', year: 2021, genre: ['Fiction'], rating: 7.5, description: 'Test' })
    ];
    contentService.games = [
      new Game({ id: 'game-1', title: 'Test Game', developer: 'Test Dev', year: 2020, genre: ['RPG'], rating: 9.0, description: 'Test' })
    ];

    const movies = contentService.getContentByType('movies');
    const books = contentService.getContentByType('books');
    const games = contentService.getContentByType('games');

    if (Array.isArray(movies) && movies.length === 1 && movies[0].title === 'Test Movie' &&
        Array.isArray(books) && books.length === 1 && books[0].title === 'Test Book' &&
        Array.isArray(games) && games.length === 1 && games[0].title === 'Test Game') {
      console.log('✓ Test 4 PASSED: Can get content by type correctly');
      passed++;
    } else {
      console.log('✗ Test 4 FAILED: Could not get content by type correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 4 FAILED: Error getting content by type:', error);
    failed++;
  }

  // Test 5: Get all content
  try {
    const contentService = new ContentService();
    // Add some mock data directly
    contentService.movies = [
      new Movie({ id: 'movie-1', title: 'Test Movie', year: 2022, genre: ['Action'], rating: 8.0, description: 'Test' })
    ];
    contentService.books = [
      new Book({ id: 'book-1', title: 'Test Book', author: 'Test Author', year: 2021, genre: ['Fiction'], rating: 7.5, description: 'Test' })
    ];
    contentService.games = [
      new Game({ id: 'game-1', title: 'Test Game', developer: 'Test Dev', year: 2020, genre: ['RPG'], rating: 9.0, description: 'Test' })
    ];

    const allContent = contentService.getAllContent();

    if (allContent.movies && Array.isArray(allContent.movies) && allContent.movies.length === 1 &&
        allContent.books && Array.isArray(allContent.books) && allContent.books.length === 1 &&
        allContent.games && Array.isArray(allContent.games) && allContent.games.length === 1) {
      console.log('✓ Test 5 PASSED: Can get all content correctly');
      passed++;
    } else {
      console.log('✗ Test 5 FAILED: Could not get all content correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 5 FAILED: Error getting all content:', error);
    failed++;
  }

  // Test 6: Search functionality with empty query
  try {
    const contentService = new ContentService();
    // Add some mock data directly
    contentService.movies = [
      new Movie({ id: 'movie-1', title: 'Test Movie', year: 2022, genre: ['Action'], rating: 8.0, description: 'Test' })
    ];
    contentService.books = [
      new Book({ id: 'book-1', title: 'Test Book', author: 'Test Author', year: 2021, genre: ['Fiction'], rating: 7.5, description: 'Test' })
    ];
    contentService.games = [
      new Game({ id: 'game-1', title: 'Test Game', developer: 'Test Dev', year: 2020, genre: ['RPG'], rating: 9.0, description: 'Test' })
    ];

    const emptyResults = contentService.search('');
    const nullResults = contentService.search(null);
    const undefinedResults = contentService.search(undefined);

    if (emptyResults.movies.length === 0 &&
        emptyResults.books.length === 0 &&
        emptyResults.games.length === 0 &&
        nullResults.movies.length === 0 &&
        nullResults.books.length === 0 &&
        nullResults.games.length === 0 &&
        undefinedResults.movies.length === 0 &&
        undefinedResults.books.length === 0 &&
        undefinedResults.games.length === 0) {
      console.log('✓ Test 6 PASSED: Search handles empty/null/undefined queries correctly');
      passed++;
    } else {
      console.log('✗ Test 6 FAILED: Search does not handle empty queries correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 6 FAILED: Error testing search with empty queries:', error);
    failed++;
  }

  // Test 7: Search functionality with valid query
  try {
    const contentService = new ContentService();
    // Add some mock data directly
    contentService.movies = [
      new Movie({ id: 'movie-1', title: 'Matrix', year: 1999, genre: ['Sci-Fi'], rating: 8.7, description: 'A sci-fi action movie' })
    ];
    contentService.books = [
      new Book({ id: 'book-1', title: 'Neuromancer', author: 'William Gibson', year: 1984, genre: ['Sci-Fi'], rating: 8.5, description: 'A cyberpunk novel' })
    ];
    contentService.games = [
      new Game({ id: 'game-1', title: 'Cyberpunk 2077', developer: 'CDPR', year: 2020, genre: ['RPG', 'Sci-Fi'], rating: 7.5, description: 'A cyberpunk RPG' })
    ];

    const results = contentService.search('sci-fi');
    
    if (results.movies.length >= 1 && results.books.length >= 1 && results.games.length >= 1) {
      console.log('✓ Test 7 PASSED: Search finds content by category');
      passed++;
    } else {
      console.log('✗ Test 7 FAILED: Search does not find content by category');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 7 FAILED: Error testing search with valid query:', error);
    failed++;
  }

  // Test 8: Get random content
  try {
    const contentService = new ContentService();
    // Add some mock data directly
    contentService.movies = [
      new Movie({ id: 'movie-1', title: 'Movie 1', year: 2020, genre: ['Action'], rating: 8.0, description: 'Test' }),
      new Movie({ id: 'movie-2', title: 'Movie 2', year: 2021, genre: ['Drama'], rating: 7.0, description: 'Test' })
    ];
    contentService.books = [
      new Book({ id: 'book-1', title: 'Book 1', author: 'Author 1', year: 2020, genre: ['Fiction'], rating: 8.5, description: 'Test' })
    ];
    contentService.games = [
      new Game({ id: 'game-1', title: 'Game 1', developer: 'Dev 1', year: 2020, genre: ['RPG'], rating: 9.0, description: 'Test' }),
      new Game({ id: 'game-2', title: 'Game 2', developer: 'Dev 2', year: 2021, genre: ['Action'], rating: 7.5, description: 'Test' }),
      new Game({ id: 'game-3', title: 'Game 3', developer: 'Dev 3', year: 2022, genre: ['Puzzle'], rating: 8.0, description: 'Test' })
    ];

    const randomMovie = contentService.getRandomContent('movies');
    const randomBook = contentService.getRandomContent('books');
    const randomGame = contentService.getRandomContent('games');

    if (randomMovie && contentService.movies.includes(randomMovie) &&
        randomBook && contentService.books.includes(randomBook) &&
        randomGame && contentService.games.includes(randomGame)) {
      console.log('✓ Test 8 PASSED: Can get random content correctly');
      passed++;
    } else {
      console.log('✗ Test 8 FAILED: Could not get random content correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 8 FAILED: Error getting random content:', error);
    failed++;
  }

  // Test 9: Find content by ID
  try {
    const contentService = new ContentService();
    // Add some mock data directly
    const movie1 = new Movie({ id: 'movie-find-1', title: 'Find Movie', year: 2020, genre: ['Action'], rating: 8.0, description: 'Test to find' });
    const book1 = new Book({ id: 'book-find-1', title: 'Find Book', author: 'Find Author', year: 2020, genre: ['Fiction'], rating: 8.5, description: 'Test to find' });
    const game1 = new Game({ id: 'game-find-1', title: 'Find Game', developer: 'Find Dev', year: 2020, genre: ['RPG'], rating: 9.0, description: 'Test to find' });
    
    contentService.movies = [movie1];
    contentService.books = [book1];
    contentService.games = [game1];

    const foundMovie = contentService.findContentById('movies', 'movie-find-1');
    const foundBook = contentService.findContentById('books', 'book-find-1');
    const foundGame = contentService.findContentById('games', 'game-find-1');
    const notFound = contentService.findContentById('movies', 'non-existent');

    if (foundMovie && foundMovie.id === 'movie-find-1' &&
        foundBook && foundBook.id === 'book-find-1' &&
        foundGame && foundGame.id === 'game-find-1' &&
        notFound === null) {
      console.log('✓ Test 9 PASSED: Can find content by ID correctly');
      passed++;
    } else {
      console.log('✗ Test 9 FAILED: Could not find content by ID correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 9 FAILED: Error finding content by ID:', error);
    failed++;
  }

  // Test 10: Get content stats
  try {
    const contentService = new ContentService();
    // Add some mock data directly
    contentService.movies = [
      new Movie({ id: 'movie-1', title: 'Movie 1', year: 2020, genre: ['Action'], rating: 8.0, description: 'Test' }),
      new Movie({ id: 'movie-2', title: 'Movie 2', year: 2021, genre: ['Drama'], rating: 7.0, description: 'Test' })
    ];
    contentService.books = [
      new Book({ id: 'book-1', title: 'Book 1', author: 'Author 1', year: 2020, genre: ['Fiction'], rating: 8.5, description: 'Test' })
    ];
    contentService.games = [
      new Game({ id: 'game-1', title: 'Game 1', developer: 'Dev 1', year: 2020, genre: ['RPG'], rating: 9.0, description: 'Test' }),
      new Game({ id: 'game-2', title: 'Game 2', developer: 'Dev 2', year: 2021, genre: ['Action'], rating: 7.5, description: 'Test' }),
      new Game({ id: 'game-3', title: 'Game 3', developer: 'Dev 3', year: 2022, genre: ['Puzzle'], rating: 8.0, description: 'Test' })
    ];

    const stats = contentService.getContentStats();

    if (stats.movieCount === 2 && 
        stats.bookCount === 1 && 
        stats.gameCount === 3 && 
        stats.total === 6) {
      console.log('✓ Test 10 PASSED: Get content stats works correctly');
      passed++;
    } else {
      console.log('✗ Test 10 FAILED: Get content stats does not work correctly. Got:', stats);
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 10 FAILED: Error getting content stats:', error);
    failed++;
  }

  console.log(`\\nContent Service tests completed: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

// Run the tests if this script is executed directly
if (typeof window !== 'undefined' && window.document) {
  // Running in browser
  testContentService();
} else if (typeof module !== 'undefined' && module.exports) {
  // Running in Node.js
  module.exports = { testContentService };
}