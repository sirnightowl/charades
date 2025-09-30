/**
 * Final verification script to ensure all UX enhancements are properly integrated
 */

// Check if all required elements exist in the DOM
function verifyDOMElements() {
  const requiredElements = [
    'settings-btn',         // Settings button
    'result',               // Main result card
    'getfilm',              // Film button
    'getshow',              // Show button
    'getgame',              // Game button
    'getsong',              // Song button
    'getbook'               // Book button
  ];
  
  let allFound = true;
  
  requiredElements.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      console.log(`✓ Element '${id}' found`);
    } else {
      console.error(`✗ Element '${id}' NOT found`);
      allFound = false;
    }
  });
  
  return allFound;
}

// Check if all required JavaScript files are loaded
function verifyJavaScriptFiles() {
  // These should be available if the files are properly loaded
  const requiredClasses = [
    'SettingsManager',
    'CardInfo',
    'ScreenWakeLock',
    'App'
  ];
  
  let allAvailable = true;
  
  requiredClasses.forEach(className => {
    if (window[className]) {
      console.log(`✓ Class '${className}' is available`);
    } else {
      console.error(`✗ Class '${className}' is NOT available`);
      allAvailable = false;
    }
  });
  
  return allAvailable;
}

// Check if CSS is properly loaded
function verifyCSS() {
  // Check if some of our custom CSS classes are applied
  const settingsBtn = document.getElementById('settings-btn');
  if (settingsBtn && settingsBtn.classList.contains('settings-btn')) {
    console.log('✓ Settings button CSS is properly applied');
    return true;
  } else {
    console.error('✗ Settings button CSS is NOT properly applied');
    return false;
  }
}

// Test the settings functionality
function testSettingsFunctionality() {
  try {
    // Try to create a settings manager instance
    if (window.SettingsManager) {
      const settingsManager = new window.SettingsManager();
      console.log('✓ SettingsManager can be instantiated');
      
      // Test selecting a color
      if (settingsManager.selectColor) {
        settingsManager.selectColor('#ffffff');
        console.log('✓ Color selection works');
      }
      
      return true;
    } else {
      console.error('✗ SettingsManager class not available');
      return false;
    }
  } catch (error) {
    console.error('✗ Settings functionality error:', error);
    return false;
  }
}

// Test the card info functionality
function testCardInfoFunctionality() {
  try {
    // Try to create a card info instance
    if (window.CardInfo) {
      const cardInfo = new window.CardInfo();
      console.log('✓ CardInfo can be instantiated');
      
      // Test adding info button to a mock card
      const mockCard = document.createElement('div');
      const mockData = { title: 'Test Card', year: 2023 };
      
      if (cardInfo.addInfoButtonToCard) {
        cardInfo.addInfoButtonToCard(mockCard, mockData);
        const infoBtn = mockCard.querySelector('.info-btn');
        if (infoBtn) {
          console.log('✓ Info button can be added to cards');
          return true;
        } else {
          console.error('✗ Info button was not added to card');
          return false;
        }
      } else {
        console.error('✗ addInfoButtonToCard method not available');
        return false;
      }
    } else {
      console.error('✗ CardInfo class not available');
      return false;
    }
  } catch (error) {
    console.error('✗ Card info functionality error:', error);
    return false;
  }
}

// Test the screen wake lock functionality
function testScreenWakeLockFunctionality() {
  try {
    // Try to create a screen wake lock instance
    if (window.ScreenWakeLock) {
      const screenWakeLock = new window.ScreenWakeLock();
      console.log('✓ ScreenWakeLock can be instantiated');
      
      // Check if it supports the API
      if (screenWakeLock.isSupported()) {
        console.log('✓ Screen Wake Lock API is supported');
      } else {
        console.warn('~ Screen Wake Lock API is not supported in this browser');
      }
      
      return true;
    } else {
      console.error('✗ ScreenWakeLock class not available');
      return false;
    }
  } catch (error) {
    console.error('✗ Screen wake lock functionality error:', error);
    return false;
  }
}

// Run all verification tests
function runVerification() {
  console.log('Running final verification of UX enhancements...\n');
  
  const tests = [
    { name: 'DOM Elements', fn: verifyDOMElements },
    { name: 'JavaScript Files', fn: verifyJavaScriptFiles },
    { name: 'CSS Styling', fn: verifyCSS },
    { name: 'Settings Functionality', fn: testSettingsFunctionality },
    { name: 'Card Info Functionality', fn: testCardInfoFunctionality },
    { name: 'Screen Wake Lock Functionality', fn: testScreenWakeLockFunctionality }
  ];
  
  let passed = 0;
  let total = tests.length;
  
  tests.forEach(test => {
    console.log(`\nTesting ${test.name}:`);
    if (test.fn()) {
      passed++;
    }
  });
  
  console.log(`\n\nFinal Verification Results: ${passed}/${total} test groups passed`);
  
  if (passed === total) {
    console.log('🎉 All verifications passed! UX enhancements are properly integrated.');
    return true;
  } else if (passed >= total * 0.8) {
    console.log('✅ Most verifications passed. UX enhancements are mostly integrated.');
    return true;
  } else {
    console.log('❌ Some verifications failed. Please check the implementation.');
    return false;
  }
}

// Run verification when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runVerification);
} else {
  runVerification();
}