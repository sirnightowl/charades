/**
 * Unit tests for settings UI functionality
 * Tests the settings panel visibility, controls, and interactions
 */

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

describe('Settings UI Tests', () => {
  let dom;
  let window;
  let document;
  let settingsManager;

  beforeEach(() => {
    // Set up a fake DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test</title>
      </head>
      <body>
        <div id="content">
          <div id="result" class="bg shadow-lg">
            <h2 id="result-title" class="h1">Charades.</h2>
          </div>
        </div>
      </body>
      </html>
    `);
    
    window = dom.window;
    document = window.document;
    
    // Mock localStorage
    const localStorageMock = (function() {
      let store = {};
      return {
        getItem: function(key) {
          return store[key] || null;
        },
        setItem: function(key, value) {
          store[key] = value.toString();
        },
        removeItem: function(key) {
          delete store[key];
        },
        clear: function() {
          store = {};
        }
      };
    })();
    
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });
    
    // Mock navigator.wakeLock
    window.navigator.wakeLock = {
      request: jest.fn(() => Promise.resolve({
        addEventListener: jest.fn(),
        release: jest.fn(() => Promise.resolve())
      }))
    };
    
    // Store references to global objects
    global.window = window;
    global.document = document;
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    // Clean up
    if (settingsManager && typeof settingsManager.releaseWakeLock === 'function') {
      settingsManager.releaseWakeLock();
    }
    
    // Clean up globals
    delete global.window;
    delete global.document;
    delete global.localStorage;
  });

  test('Settings panel should be created and hidden by default', () => {
    // Import the SettingsManager after setting up the mock DOM
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    // Create a new instance of SettingsManager
    settingsManager = new SettingsManager();
    
    // Check that settings panel exists but is hidden
    const settingsPanel = document.getElementById('settings-panel');
    expect(settingsPanel).not.toBeNull();
    expect(settingsPanel.classList.contains('open')).toBe(false);
    
    // Check that settings button exists
    const settingsBtn = document.getElementById('settings-btn');
    expect(settingsBtn).not.toBeNull();
  });

  test('Settings panel should toggle visibility when button is clicked', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    const settingsPanel = document.getElementById('settings-panel');
    const settingsBtn = document.getElementById('settings-btn');
    
    // Initially, panel should be closed
    expect(settingsPanel.classList.contains('open')).toBe(false);
    
    // Simulate click on settings button
    settingsBtn.click();
    
    // Panel should now be open
    expect(settingsPanel.classList.contains('open')).toBe(true);
    
    // Click again to close
    settingsBtn.click();
    
    // Panel should be closed again
    expect(settingsPanel.classList.contains('open')).toBe(false);
  });

  test('Settings panel should close when clicking outside', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    const settingsPanel = document.getElementById('settings-panel');
    const settingsBtn = document.getElementById('settings-btn');
    
    // Open the panel first
    settingsBtn.click();
    expect(settingsPanel.classList.contains('open')).toBe(true);
    
    // Simulate click on body (outside the panel)
    document.body.click();
    
    // Panel should be closed
    expect(settingsPanel.classList.contains('open')).toBe(false);
  });

  test('Close button should close the settings panel', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    const settingsPanel = document.getElementById('settings-panel');
    const settingsBtn = document.getElementById('settings-btn');
    const closeBtn = document.getElementById('close-settings');
    
    // Open the panel first
    settingsBtn.click();
    expect(settingsPanel.classList.contains('open')).toBe(true);
    
    // Click the close button
    closeBtn.click();
    
    // Panel should be closed
    expect(settingsPanel.classList.contains('open')).toBe(false);
  });

  test('Should save and restore settings preference in localStorage', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Set a background color
    const colorToSelect = '#ff0000';
    settingsManager.selectColor(colorToSelect);
    
    // Check that it was saved
    expect(localStorage.getItem('bgColor')).toBe(colorToSelect);
    
    // Check that the stored setting is applied
    settingsManager.applyStoredSettings();
    expect(document.body.style.backgroundColor).toBe(colorToSelect);
  });
});