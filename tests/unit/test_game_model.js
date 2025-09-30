// Unit tests for Game model
// Tests the functionality of the Game class

function testGameModel() {
  console.log('Starting Game model tests...');
  let passed = 0;
  let failed = 0;

  // Test 1: Creating a game with valid data
  try {
    const gameData = {
      id: 'test-game-123',
      title: 'Test Game',
      developer: 'Test Developer',
      year: 2022,
      genre: ['Action', 'Adventure'],
      rating: 8.5,
      description: 'A test game',
      platform: ['PC', 'Xbox', 'PlayStation'],
      cover: 'http://example.com/cover.jpg',
      trailer: 'http://example.com/trailer.mp4',
      publisher: 'Test Publisher',
      language: 'English',
      released: true,
      esrbRating: 'T'
    };

    const game = new Game(gameData);
    
    if (game.title === 'Test Game' && game.year === 2022 && game.developer === 'Test Developer') {
      console.log('✓ Test 1 PASSED: Game created with valid data');
      passed++;
    } else {
      console.log('✗ Test 1 FAILED: Game not created correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 1 FAILED: Error creating game with valid data:', error);
    failed++;
  }

  // Test 2: Creating a game with minimal data (should generate defaults)
  try {
    const minimalData = {
      title: 'Minimal Game',
      year: 2020,
      genre: ['RPG'],
      rating: 7.0,
      description: 'A minimal game'
    };

    const game = new Game(minimalData);
    
    if (game.title === 'Minimal Game' && 
        game.year === 2020 && 
        game.id && 
        game.id.startsWith('game_')) {
      console.log('✓ Test 2 PASSED: Game created with minimal data and generated defaults');
      passed++;
    } else {
      console.log('✗ Test 2 FAILED: Game not created correctly with minimal data');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 2 FAILED: Error creating game with minimal data:', error);
    failed++;
  }

  // Test 3: Validate valid game
  try {
    const validGame = new Game({
      title: 'Valid Game',
      year: 2022,
      genre: ['Strategy'],
      rating: 7.5,
      description: 'A valid game'
    });
    
    const validation = validGame.validate();
    
    if (validation.isValid) {
      console.log('✓ Test 3 PASSED: Valid game validates correctly');
      passed++;
    } else {
      console.log('✗ Test 3 FAILED: Valid game failed validation', validation.errors);
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 3 FAILED: Error validating valid game:', error);
    failed++;
  }

  // Test 4: Validate invalid game (missing title)
  try {
    const invalidGame = new Game({
      year: 2022,
      genre: ['Strategy'],
      rating: 7.5,
      description: 'A game without a title'
    });
    
    const validation = invalidGame.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('title'))) {
      console.log('✓ Test 4 PASSED: Invalid game with missing title fails validation');
      passed++;
    } else {
      console.log('✗ Test 4 FAILED: Invalid game with missing title should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 4 FAILED: Error validating invalid game:', error);
    failed++;
  }

  // Test 5: Validate invalid game (year out of range)
  try {
    const invalidGame = new Game({
      title: 'Old Game',
      year: 1900, // Invalid year (too old)
      genre: ['Strategy'],
      rating: 7.5,
      description: 'A game with invalid year'
    });
    
    const validation = invalidGame.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('year'))) {
      console.log('✓ Test 5 PASSED: Invalid game with wrong year fails validation');
      passed++;
    } else {
      console.log('✗ Test 5 FAILED: Invalid game with wrong year should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 5 FAILED: Error validating invalid game with year:', error);
    failed++;
  }

  // Test 6: Validate invalid game (rating out of range)
  try {
    const invalidGame = new Game({
      title: 'Bad Rating Game',
      year: 2022,
      genre: ['Strategy'],
      rating: 15, // Invalid rating
      description: 'A game with invalid rating'
    });
    
    const validation = invalidGame.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('rating'))) {
      console.log('✓ Test 6 PASSED: Invalid game with wrong rating fails validation');
      passed++;
    } else {
      console.log('✗ Test 6 FAILED: Invalid game with wrong rating should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 6 FAILED: Error validating invalid game with rating:', error);
    failed++;
  }

  // Test 7: Check if game matches query
  try {
    const game = new Game({
      title: 'The Legend of Zelda',
      developer: 'Nintendo',
      year: 1986,
      genre: ['Adventure', 'Action'],
      rating: 8.7,
      description: 'A classic action-adventure game',
      platform: ['Nintendo Switch', 'Wii U'],
      publisher: 'Nintendo'
    });
    
    // Check title match
    if (game.matchesQuery('Zelda')) {
      console.log('✓ Test 7a PASSED: Game matches query in title');
      passed++;
    } else {
      console.log('✗ Test 7a FAILED: Game should match query in title');
      failed++;
    }
    
    // Check developer match
    if (game.matchesQuery('Nintendo')) {
      console.log('✓ Test 7b PASSED: Game matches query in developer');
      passed++;
    } else {
      console.log('✗ Test 7b FAILED: Game should match query in developer');
      failed++;
    }
    
    // Check publisher match
    if (game.matchesQuery('publisher')) {
      console.log('✓ Test 7c PASSED: Game matches query in publisher');
      passed++;
    } else {
      console.log('✗ Test 7c FAILED: Game should match query in publisher');
      failed++;
    }
    
    // Check platform match
    if (game.matchesQuery('Switch')) {
      console.log('✓ Test 7d PASSED: Game matches query in platform');
      passed++;
    } else {
      console.log('✗ Test 7d FAILED: Game should match query in platform');
      failed++;
    }
    
    // Check genre match
    if (game.matchesQuery('Adventure')) {
      console.log('✓ Test 7e PASSED: Game matches query in genre');
      passed++;
    } else {
      console.log('✗ Test 7e FAILED: Game should match query in genre');
      failed++;
    }
    
    // Check description match
    if (game.matchesQuery('classic')) {
      console.log('✓ Test 7f PASSED: Game matches query in description');
      passed++;
    } else {
      console.log('✗ Test 7f FAILED: Game should match query in description');
      failed++;
    }
    
    // Check non-match
    if (!game.matchesQuery('Nonexistent')) {
      console.log('✓ Test 7g PASSED: Game does not match non-existent query');
      passed++;
    } else {
      console.log('✗ Test 7g FAILED: Game should not match non-existent query');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 7 FAILED: Error testing query matching:', error);
    failed++;
  }

  // Test 8: Get display title
  try {
    const game = new Game({
      title: 'Super Mario Bros',
      year: 1985,
      developer: 'Nintendo'
    });
    
    const displayTitle = game.getDisplayTitle();
    const expectedTitle = 'Super Mario Bros (1985)';
    
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
    const gameData = {
      title: 'JSON Test Game',
      developer: 'JSON Test Dev',
      year: 2021,
      genre: ['Puzzle'],
      rating: 8.0,
      description: 'Testing toJSON for game'
    };
    
    const game = new Game(gameData);
    const json = game.toJSON();
    
    if (json.title === gameData.title && 
        json.developer === gameData.developer &&
        json.year === gameData.year && 
        json.description === gameData.description &&
        Array.isArray(json.genre) && 
        json.genre.length === gameData.genre.length) {
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

  console.log(`\\nGame model tests completed: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

// Run the tests if this script is executed directly
if (typeof window !== 'undefined' && window.document) {
  // Running in browser
  testGameModel();
} else if (typeof module !== 'undefined' && module.exports) {
  // Running in Node.js
  module.exports = { testGameModel };
}