/**
 * Unit tests for background color selection functionality
 * Tests the color selection, application, and persistence
 */

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

describe('Background Color Selection Tests', () => {
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

  test('Should have a default background color', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Check that default background color is applied
    expect(document.body.style.backgroundColor).toBe(settingsManager.currentBgColor);
  });

  test('Should allow selecting a new background color', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Select a new color
    const newColor = '#ff0000'; // red
    settingsManager.selectColor(newColor);
    
    // Check that the color was applied to the body
    expect(document.body.style.backgroundColor).toBe(newColor);
    
    // Check that the color was stored in localStorage
    expect(localStorage.getItem('bgColor')).toBe(newColor);
  });

  test('Should mark selected color in UI', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Create color options in the DOM similar to how SettingsManager does it
    document.body.innerHTML = `
      <div class="color-palette" id="color-palette">
        <div class="color-option" style="background-color: #e9ecef" data-color="#e9ecef"></div>
        <div class="color-option" style="background-color: #ffffff" data-color="#ffffff"></div>
        <div class="color-option" style="background-color: #ff0000" data-color="#ff0000"></div>
      </div>
    `;
    
    // Select a new color
    const colorToSelect = '#ff0000';
    settingsManager.selectColor(colorToSelect);
    
    // Check that the selected color has the 'selected' class
    const selectedColorOption = document.querySelector(`.color-option[data-color="${colorToSelect}"]`);
    expect(selectedColorOption.classList.contains('selected')).toBe(true);
    
    // Check that other colors don't have the 'selected' class anymore
    const otherColorOptions = document.querySelectorAll(`.color-option:not([data-color="${colorToSelect}"])`);
    otherColorOptions.forEach(option => {
      expect(option.classList.contains('selected')).toBe(false);
    });
  });

  test('Should persist color preference across sessions', () => {
    // Set a color in localStorage
    localStorage.setItem('bgColor', '#00ff00'); // green
    
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    // Create a new instance which should pick up the stored color
    settingsManager = new SettingsManager();
    
    // Check that the stored color was applied
    expect(settingsManager.currentBgColor).toBe('#00ff00');
    expect(document.body.style.backgroundColor).toBe('#00ff00');
  });

  test('Should handle invalid color gracefully', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Try to select an invalid color
    const invalidColor = 'not-a-color';
    settingsManager.selectColor(invalidColor);
    
    // Check that the invalid color was stored anyway (validation would happen elsewhere)
    expect(localStorage.getItem('bgColor')).toBe(invalidColor);
    
    // Check that it was applied to the body
    expect(document.body.style.backgroundColor).toBe(invalidColor);
  });

  test('Should have multiple color options available', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Check that there are multiple color options in the palette
    expect(settingsManager.colorPalette.length).toBeGreaterThan(0);
    
    // Check that the default color is in the palette
    expect(settingsManager.colorPalette).toContain(settingsManager.currentBgColor);
  });
});