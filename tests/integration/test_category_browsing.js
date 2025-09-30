// Integration test for category browsing
// This test verifies that users can browse different content categories

async function testCategoryBrowsing() {
  try {
    // Check if category buttons exist
    const filmButton = document.getElementById('getfilm');
    const showButton = document.getElementById('getshow');
    const gameButton = document.getElementById('getgame');
    const songButton = document.getElementById('getsong');
    const bookButton = document.getElementById('getbook');
    
    if (!filmButton || !showButton || !gameButton || !songButton || !bookButton) {
      console.error('FAIL: Category buttons not found');
      return false;
    }
    
    // Check if result elements exist for displaying content
    const resultTitle = document.getElementById('result-title');
    const resultCategory = document.getElementById('result-category');
    const resultAuthor = document.getElementById('result-author');
    const resultYear = document.getElementById('result-year');
    
    if (!resultTitle || !resultCategory || !resultAuthor || !resultYear) {
      console.error('FAIL: Result display elements not found');
      return false;
    }
    
    console.log('PASS: Category browsing elements verified');
    return true;
  } catch (error) {
    console.error('FAIL: Error during category browsing test:', error);
    return false;
  }
}

// Export for use in testing framework
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testCategoryBrowsing };
}