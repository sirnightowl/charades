// Test for PWA manifest validation
// This test verifies that the web app manifest is properly configured

async function testManifest() {
  try {
    // Check if manifest link exists in the HTML
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      console.error('FAIL: Manifest link not found in HTML');
      return false;
    }
    
    // Verify manifest URL
    const manifestUrl = manifestLink.getAttribute('href');
    if (!manifestUrl || manifestUrl !== '/manifest.json') {
      console.error('FAIL: Manifest link has incorrect href');
      return false;
    }
    
    // Try to fetch and validate the manifest content
    const response = await fetch(manifestUrl);
    if (!response.ok) {
      console.error('FAIL: Could not fetch manifest.json');
      return false;
    }
    
    const manifest = await response.json();
    
    // Validate required manifest properties
    const requiredProperties = ['name', 'short_name', 'start_url', 'display'];
    for (const prop of requiredProperties) {
      if (!(prop in manifest)) {
        console.error(`FAIL: Missing required manifest property: ${prop}`);
        return false;
      }
    }
    
    // Check if icons are defined
    if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) {
      console.error('FAIL: Manifest does not define any icons');
      return false;
    }
    
    console.log('PASS: PWA manifest validation passed');
    return true;
  } catch (error) {
    console.error('FAIL: Error during manifest validation:', error);
    return false;
  }
}

// Export for use in testing framework
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testManifest };
}