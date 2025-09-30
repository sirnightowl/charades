// Unit tests for Movie model
// Tests the functionality of the Movie class

function testMovieModel() {
  console.log('Starting Movie model tests...');
  let passed = 0;
  let failed = 0;

  // Test 1: Creating a movie with valid data
  try {
    const movieData = {
      id: 'test-123',
      title: 'Test Movie',
      director: 'Test Director',
      year: 2022,
      genre: ['Action', 'Adventure'],
      rating: 8.5,
      description: 'A test movie',
      cast: ['Actor 1', 'Actor 2'],
      duration: 120,
      poster: 'http://example.com/poster.jpg',
      trailer: 'http://example.com/trailer.mp4',
      language: 'English',
      country: 'USA',
      released: true,
      imdbId: 'tt1234567'
    };

    const movie = new Movie(movieData);
    
    if (movie.title === 'Test Movie' && movie.year === 2022 && movie.director === 'Test Director') {
      console.log('✓ Test 1 PASSED: Movie created with valid data');
      passed++;
    } else {
      console.log('✗ Test 1 FAILED: Movie not created correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 1 FAILED: Error creating movie with valid data:', error);
    failed++;
  }

  // Test 2: Creating a movie with minimal data (should generate defaults)
  try {
    const minimalData = {
      title: 'Minimal Movie',
      year: 2020
    };

    const movie = new Movie(minimalData);
    
    if (movie.title === 'Minimal Movie' && movie.year === 2020 && movie.id && movie.id.startsWith('movie_')) {
      console.log('✓ Test 2 PASSED: Movie created with minimal data and generated defaults');
      passed++;
    } else {
      console.log('✗ Test 2 FAILED: Movie not created correctly with minimal data');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 2 FAILED: Error creating movie with minimal data:', error);
    failed++;
  }

  // Test 3: Validate valid movie
  try {
    const validMovie = new Movie({
      title: 'Valid Movie',
      year: 2022,
      genre: ['Action'],
      rating: 7.5,
      description: 'A valid movie'
    });
    
    const validation = validMovie.validate();
    
    if (validation.isValid) {
      console.log('✓ Test 3 PASSED: Valid movie validates correctly');
      passed++;
    } else {
      console.log('✗ Test 3 FAILED: Valid movie failed validation', validation.errors);
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 3 FAILED: Error validating valid movie:', error);
    failed++;
  }

  // Test 4: Validate invalid movie (missing title)
  try {
    const invalidMovie = new Movie({
      year: 2022,
      genre: ['Action'],
      rating: 7.5,
      description: 'A movie without a title'
    });
    
    const validation = invalidMovie.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('title'))) {
      console.log('✓ Test 4 PASSED: Invalid movie with missing title fails validation');
      passed++;
    } else {
      console.log('✗ Test 4 FAILED: Invalid movie with missing title should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 4 FAILED: Error validating invalid movie:', error);
    failed++;
  }

  // Test 5: Validate invalid movie (year out of range)
  try {
    const invalidMovie = new Movie({
      title: 'Old Movie',
      year: 1000, // Invalid year
      genre: ['Action'],
      rating: 7.5,
      description: 'A movie with invalid year'
    });
    
    const validation = invalidMovie.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('year'))) {
      console.log('✓ Test 5 PASSED: Invalid movie with wrong year fails validation');
      passed++;
    } else {
      console.log('✗ Test 5 FAILED: Invalid movie with wrong year should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 5 FAILED: Error validating invalid movie with year:', error);
    failed++;
  }

  // Test 6: Validate invalid movie (rating out of range)
  try {
    const invalidMovie = new Movie({
      title: 'Bad Rating Movie',
      year: 2022,
      genre: ['Action'],
      rating: 15, // Invalid rating
      description: 'A movie with invalid rating'
    });
    
    const validation = invalidMovie.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('rating'))) {
      console.log('✓ Test 6 PASSED: Invalid movie with wrong rating fails validation');
      passed++;
    } else {
      console.log('✗ Test 6 FAILED: Invalid movie with wrong rating should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 6 FAILED: Error validating invalid movie with rating:', error);
    failed++;
  }

  // Test 7: Check if movie matches query
  try {
    const movie = new Movie({
      title: 'Matrix Reloaded',
      director: 'Wachowski',
      year: 2003,
      genre: ['Sci-Fi', 'Action'],
      rating: 7.2,
      description: 'A sequel to The Matrix',
      cast: ['Keanu Reeves', 'Laurence Fishburne']
    });
    
    // Check title match
    if (movie.matchesQuery('Matrix')) {
      console.log('✓ Test 7a PASSED: Movie matches query in title');
      passed++;
    } else {
      console.log('✗ Test 7a FAILED: Movie should match query in title');
      failed++;
    }
    
    // Check director match
    if (movie.matchesQuery('Wachowski')) {
      console.log('✓ Test 7b PASSED: Movie matches query in director');
      passed++;
    } else {
      console.log('✗ Test 7b FAILED: Movie should match query in director');
      failed++;
    }
    
    // Check cast match
    if (movie.matchesQuery('Keanu')) {
      console.log('✓ Test 7c PASSED: Movie matches query in cast');
      passed++;
    } else {
      console.log('✗ Test 7c FAILED: Movie should match query in cast');
      failed++;
    }
    
    // Check genre match
    if (movie.matchesQuery('Sci-Fi')) {
      console.log('✓ Test 7d PASSED: Movie matches query in genre');
      passed++;
    } else {
      console.log('✗ Test 7d FAILED: Movie should match query in genre');
      failed++;
    }
    
    // Check description match
    if (movie.matchesQuery('sequel')) {
      console.log('✓ Test 7e PASSED: Movie matches query in description');
      passed++;
    } else {
      console.log('✗ Test 7e FAILED: Movie should match query in description');
      failed++;
    }
    
    // Check non-match
    if (!movie.matchesQuery('Nonexistent')) {
      console.log('✓ Test 7f PASSED: Movie does not match non-existent query');
      passed++;
    } else {
      console.log('✗ Test 7f FAILED: Movie should not match non-existent query');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 7 FAILED: Error testing query matching:', error);
    failed++;
  }

  // Test 8: Get display title
  try {
    const movie = new Movie({
      title: 'Inception',
      year: 2010,
      director: 'Christopher Nolan'
    });
    
    const displayTitle = movie.getDisplayTitle();
    const expectedTitle = 'Inception (2010)';
    
    if (displayTitle === expectedTitle) {
      console.log('✓ Test 8 PASSED: Get display title works correctly');
      passed++;
    } else {
      console.log(`✗ Test 8 FAILED: Display title incorrect. Expected: "${expectedTitle}", Got: "${displayTitle}"`);
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 8 FAILED: Error getting display title:', error);
    failed++;
  }

  // Test 9: toJSON method
  try {
    const movieData = {
      title: 'JSON Test',
      year: 2021,
      genre: ['Drama'],
      rating: 8.0,
      description: 'Testing toJSON'
    };
    
    const movie = new Movie(movieData);
    const json = movie.toJSON();
    
    if (json.title === movieData.title && 
        json.year === movieData.year && 
        json.description === movieData.description &&
        Array.isArray(json.genre) && 
        json.genre.length === movieData.genre.length) {
      console.log('✓ Test 9 PASSED: toJSON method works correctly');
      passed++;
    } else {
      console.log('✗ Test 9 FAILED: toJSON method does not work correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 9 FAILED: Error testing toJSON method:', error);
    failed++;
  }

  console.log(`\\nMovie model tests completed: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

// Run the tests if this script is executed directly
if (typeof window !== 'undefined' && window.document) {
  // Running in browser
  testMovieModel();
} else if (typeof module !== 'undefined' && module.exports) {
  // Running in Node.js
  module.exports = { testMovieModel };
}