// Test for service worker registration
// This test verifies that the service worker is properly registered

async function testServiceWorker() {
  try {
    // Check if service worker is supported in the browser
    if (!('serviceWorker' in navigator)) {
      console.error('FAIL: Service Worker API not supported in this browser');
      return false;
    }
    
    // Check if a service worker is registered
    const registrations = await navigator.serviceWorker.getRegistrations();
    const swRegistration = registrations.find(reg => reg.active && reg.active.state === 'activated');
    
    if (!swRegistration) {
      console.error('FAIL: No active service worker found');
      return false;
    }
    
    // Check if the service worker is the one we expect
    const scriptURL = swRegistration.active.scriptURL;
    if (!scriptURL.endsWith('/sw.js')) {
      console.error('FAIL: Service worker script URL is not sw.js');
      return false;
    }
    
    // Check the service worker state
    if (swRegistration.active.state !== 'activated') {
      console.error('FAIL: Service worker is not in activated state');
      return false;
    }
    
    console.log('PASS: Service worker registration validated');
    return true;
  } catch (error) {
    console.error('FAIL: Error during service worker test:', error);
    return false;
  }
}

// Export for use in testing framework
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testServiceWorker };
}