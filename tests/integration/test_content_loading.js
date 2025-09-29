// Integration test for content loading from JSON
// This test verifies that content can be loaded from the JSON data files

async function testContentLoading() {
  try {
    // Test loading movies
    const moviesResponse = await fetch('/data/movies.json');
    if (!moviesResponse.ok) {
      console.error('FAIL: Could not load movies.json');
      return false;
    }
    
    const movies = await moviesResponse.json();
    if (!Array.isArray(movies)) {
      console.error('FAIL: movies.json did not return an array');
      return false;
    }
    
    // Test loading books
    const booksResponse = await fetch('/data/books.json');
    if (!booksResponse.ok) {
      console.error('FAIL: Could not load books.json');
      return false;
    }
    
    const books = await booksResponse.json();
    if (!Array.isArray(books)) {
      console.error('FAIL: books.json did not return an array');
      return false;
    }
    
    // Test loading games
    const gamesResponse = await fetch('/data/games.json');
    if (!gamesResponse.ok) {
      console.error('FAIL: Could not load games.json');
      return false;
    }
    
    const games = await gamesResponse.json();
    if (!Array.isArray(games)) {
      console.error('FAIL: games.json did not return an array');
      return false;
    }
    
    console.log('PASS: Content loading from JSON verified');
    return true;
  } catch (error) {
    console.error('FAIL: Error during content loading test:', error);
    return false;
  }
}

// Export for use in testing framework
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testContentLoading };
}