// Unit tests for Book model
// Tests the functionality of the Book class

function testBookModel() {
  console.log('Starting Book model tests...');
  let passed = 0;
  let failed = 0;

  // Test 1: Creating a book with valid data
  try {
    const bookData = {
      id: 'test-book-123',
      title: 'Test Book',
      author: 'Test Author',
      year: 2022,
      genre: ['Fiction', 'Adventure'],
      rating: 8.5,
      description: 'A test book',
      pages: 300,
      isbn: '978-1234567890',
      language: 'English',
      publisher: 'Test Publisher',
      cover: 'http://example.com/cover.jpg',
      format: 'paperback',
      released: true
    };

    const book = new Book(bookData);
    
    if (book.title === 'Test Book' && book.year === 2022 && book.author === 'Test Author') {
      console.log('✓ Test 1 PASSED: Book created with valid data');
      passed++;
    } else {
      console.log('✗ Test 1 FAILED: Book not created correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 1 FAILED: Error creating book with valid data:', error);
    failed++;
  }

  // Test 2: Creating a book with minimal data (should generate defaults)
  try {
    const minimalData = {
      title: 'Minimal Book',
      author: 'Minimal Author',
      year: 2020,
      genre: ['Fiction'],
      rating: 7.0,
      description: 'A minimal book'
    };

    const book = new Book(minimalData);
    
    if (book.title === 'Minimal Book' && 
        book.author === 'Minimal Author' && 
        book.year === 2020 && 
        book.id && 
        book.id.startsWith('book_')) {
      console.log('✓ Test 2 PASSED: Book created with minimal data and generated defaults');
      passed++;
    } else {
      console.log('✗ Test 2 FAILED: Book not created correctly with minimal data');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 2 FAILED: Error creating book with minimal data:', error);
    failed++;
  }

  // Test 3: Validate valid book
  try {
    const validBook = new Book({
      title: 'Valid Book',
      author: 'Valid Author',
      year: 2022,
      genre: ['Fiction'],
      rating: 7.5,
      description: 'A valid book'
    });
    
    const validation = validBook.validate();
    
    if (validation.isValid) {
      console.log('✓ Test 3 PASSED: Valid book validates correctly');
      passed++;
    } else {
      console.log('✗ Test 3 FAILED: Valid book failed validation', validation.errors);
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 3 FAILED: Error validating valid book:', error);
    failed++;
  }

  // Test 4: Validate invalid book (missing title)
  try {
    const invalidBook = new Book({
      author: 'No Title Author',
      year: 2022,
      genre: ['Fiction'],
      rating: 7.5,
      description: 'A book without a title'
    });
    
    const validation = invalidBook.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('title'))) {
      console.log('✓ Test 4 PASSED: Invalid book with missing title fails validation');
      passed++;
    } else {
      console.log('✗ Test 4 FAILED: Invalid book with missing title should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 4 FAILED: Error validating invalid book:', error);
    failed++;
  }

  // Test 5: Validate invalid book (missing author)
  try {
    const invalidBook = new Book({
      title: 'No Author Book',
      year: 2022,
      genre: ['Fiction'],
      rating: 7.5,
      description: 'A book without an author'
    });
    
    const validation = invalidBook.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('author'))) {
      console.log('✓ Test 5 PASSED: Invalid book with missing author fails validation');
      passed++;
    } else {
      console.log('✗ Test 5 FAILED: Invalid book with missing author should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 5 FAILED: Error validating invalid book:', error);
    failed++;
  }

  // Test 6: Validate invalid book (year out of range)
  try {
    const invalidBook = new Book({
      title: 'Old Book',
      author: 'Old Author',
      year: 1000, // Invalid year
      genre: ['Fiction'],
      rating: 7.5,
      description: 'A book with invalid year'
    });
    
    const validation = invalidBook.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('year'))) {
      console.log('✓ Test 6 PASSED: Invalid book with wrong year fails validation');
      passed++;
    } else {
      console.log('✗ Test 6 FAILED: Invalid book with wrong year should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 6 FAILED: Error validating invalid book with year:', error);
    failed++;
  }

  // Test 7: Validate invalid book (rating out of range)
  try {
    const invalidBook = new Book({
      title: 'Bad Rating Book',
      author: 'Bad Rating Author',
      year: 2022,
      genre: ['Fiction'],
      rating: 15, // Invalid rating
      description: 'A book with invalid rating'
    });
    
    const validation = invalidBook.validate();
    
    if (!validation.isValid && validation.errors.some(error => error.includes('rating'))) {
      console.log('✓ Test 7 PASSED: Invalid book with wrong rating fails validation');
      passed++;
    } else {
      console.log('✗ Test 7 FAILED: Invalid book with wrong rating should have failed validation');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 7 FAILED: Error validating invalid book with rating:', error);
    failed++;
  }

  // Test 8: Check if book matches query
  try {
    const book = new Book({
      title: 'Lord of the Rings',
      author: 'J.R.R. Tolkien',
      year: 1954,
      genre: ['Fantasy', 'Adventure'],
      rating: 8.9,
      description: 'An epic fantasy novel',
      pages: 1216,
      publisher: 'Allen & Unwin'
    });
    
    // Check title match
    if (book.matchesQuery('Rings')) {
      console.log('✓ Test 8a PASSED: Book matches query in title');
      passed++;
    } else {
      console.log('✗ Test 8a FAILED: Book should match query in title');
      failed++;
    }
    
    // Check author match
    if (book.matchesQuery('Tolkien')) {
      console.log('✓ Test 8b PASSED: Book matches query in author');
      passed++;
    } else {
      console.log('✗ Test 8b FAILED: Book should match query in author');
      failed++;
    }
    
    // Check publisher match
    if (book.matchesQuery('Allen')) {
      console.log('✓ Test 8c PASSED: Book matches query in publisher');
      passed++;
    } else {
      console.log('✗ Test 8c FAILED: Book should match query in publisher');
      failed++;
    }
    
    // Check genre match
    if (book.matchesQuery('Fantasy')) {
      console.log('✓ Test 8d PASSED: Book matches query in genre');
      passed++;
    } else {
      console.log('✗ Test 8d FAILED: Book should match query in genre');
      failed++;
    }
    
    // Check description match
    if (book.matchesQuery('epic')) {
      console.log('✓ Test 8e PASSED: Book matches query in description');
      passed++;
    } else {
      console.log('✗ Test 8e FAILED: Book should match query in description');
      failed++;
    }
    
    // Check non-match
    if (!book.matchesQuery('Nonexistent')) {
      console.log('✓ Test 8f PASSED: Book does not match non-existent query');
      passed++;
    } else {
      console.log('✗ Test 8f FAILED: Book should not match non-existent query');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 8 FAILED: Error testing query matching:', error);
    failed++;
  }

  // Test 9: Get display title
  try {
    const book = new Book({
      title: '1984',
      author: 'George Orwell',
      year: 1949
    });
    
    const displayTitle = book.getDisplayTitle();
    const expectedTitle = '1984 by George Orwell (1949)';
    
    if (displayTitle === expectedTitle) {
      console.log('✓ Test 9 PASSED: Get display title works correctly');
      passed++;
    } else {
      console.log(`✗ Test 9 FAILED: Display title incorrect. Expected: "${expectedTitle}", Got: "${displayTitle}"`);
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 9 FAILED: Error getting display title:', error);
    failed++;
  }

  // Test 10: toJSON method
  try {
    const bookData = {
      title: 'JSON Test Book',
      author: 'JSON Test Author',
      year: 2021,
      genre: ['Mystery'],
      rating: 8.0,
      description: 'Testing toJSON for book'
    };
    
    const book = new Book(bookData);
    const json = book.toJSON();
    
    if (json.title === bookData.title && 
        json.author === bookData.author &&
        json.year === bookData.year && 
        json.description === bookData.description &&
        Array.isArray(json.genre) && 
        json.genre.length === bookData.genre.length) {
      console.log('✓ Test 10 PASSED: toJSON method works correctly');
      passed++;
    } else {
      console.log('✗ Test 10 FAILED: toJSON method does not work correctly');
      failed++;
    }
  } catch (error) {
    console.log('✗ Test 10 FAILED: Error testing toJSON method:', error);
    failed++;
  }

  console.log(`\\nBook model tests completed: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

// Run the tests if this script is executed directly
if (typeof window !== 'undefined' && window.document) {
  // Running in browser
  testBookModel();
} else if (typeof module !== 'undefined' && module.exports) {
  // Running in Node.js
  module.exports = { testBookModel };
}