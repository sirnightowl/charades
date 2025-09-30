/**
 * Unit tests for settings functionality
 * Tests the settings manager class methods and behavior
 */

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

describe('Settings Functionality Tests', () => {
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

  test('SettingsManager should initialize with default values', () => {
    const { SettingsManager } = require('../../public/js/settings');
    
    settingsManager = new SettingsManager();
    
    // Check default values
    expect(settingsManager.currentBgColor).toBe('#e9ecef');
    expect(settingsManager.screenWakeActive).toBe(false);
    expect(Array.isArray(settingsManager.colorPalette)).toBe(true);
    expect(settingsManager.colorPalette.length).toBeGreaterThan(0);
  });

  test('SettingsManager should load stored values from localStorage', () => {
    // Set some values in localStorage
    localStorage.setItem('bgColor', '#ff0000');
    localStorage.setItem('screenWake', 'true');
    
    const { SettingsManager } = require('../../public/js/settings');
    
    settingsManager = new SettingsManager();
    
    // Check that the values were loaded from localStorage
    expect(settingsManager.currentBgColor).toBe('#ff0000');
    expect(settingsManager.screenWakeActive).toBe(true);
  });

  test('toggleSettingsPanel should open and close the panel', () => {
    const { SettingsManager } = require('../../public/js/settings');
    
    settingsManager = new SettingsManager();
    
    const settingsPanel = document.getElementById('settings-panel');
    
    // Initially, the panel should not have the 'open' class
    expect(settingsPanel.classList.contains('open')).toBe(false);
    
    // Toggle open
    settingsManager.toggleSettingsPanel();
    expect(settingsPanel.classList.contains('open')).toBe(true);
    
    // Toggle closed
    settingsManager.toggleSettingsPanel();
    expect(settingsPanel.classList.contains('open')).toBe(false);
  });

  test('isSettingsPanelOpen should return correct status', () => {
    const { SettingsManager } = require('../../public/js/settings');
    
    settingsManager = new SettingsManager();
    
    const settingsPanel = document.getElementById('settings-panel');
    
    // Initially, the panel should be closed
    expect(settingsManager.isSettingsPanelOpen()).toBe(false);
    
    // Add 'open' class manually and test
    settingsPanel.classList.add('open');
    expect(settingsManager.isSettingsPanelOpen()).toBe(true);
    
    // Remove 'open' class and test
    settingsPanel.classList.remove('open');
    expect(settingsManager.isSettingsPanelOpen()).toBe(false);
  });

  test('toggleScreenWake should update state and localStorage', () => {
    const { SettingsManager } = require('../../public/js/settings');
    
    settingsManager = new SettingsManager();
    
    // Toggle to true
    settingsManager.toggleScreenWake(true);
    expect(settingsManager.screenWakeActive).toBe(true);
    expect(localStorage.getItem('screenWake')).toBe('true');
    
    // Toggle to false
    settingsManager.toggleScreenWake(false);
    expect(settingsManager.screenWakeActive).toBe(false);
    expect(localStorage.getItem('screenWake')).toBe('false');
  });

  test('requestWakeLockIfNeeded should request lock when screenWakeActive is true', async () => {
    const { SettingsManager } = require('../../public/js/settings');
    
    settingsManager = new SettingsManager();
    
    // Mock the wakeLock request to return a mock wake lock
    const mockWakeLock = {
      addEventListener: jest.fn(),
      release: jest.fn(() => Promise.resolve())
    };
    
    window.navigator.wakeLock.request = jest.fn(() => Promise.resolve(mockWakeLock));
    
    // Set screenWake to true
    settingsManager.screenWakeActive = true;
    
    // Call requestWakeLockIfNeeded
    await settingsManager.requestWakeLockIfNeeded();
    
    // Verify that request was called
    expect(window.navigator.wakeLock.request).toHaveBeenCalledWith('screen');
  });

  test('requestWakeLockIfNeeded should not request lock when screenWakeActive is false', async () => {
    const { SettingsManager } = require('../../public/js/settings');
    
    settingsManager = new SettingsManager();
    
    // Mock the wakeLock request
    window.navigator.wakeLock.request = jest.fn();
    
    // Set screenWake to false
    settingsManager.screenWakeActive = false;
    
    // Call requestWakeLockIfNeeded
    await settingsManager.requestWakeLockIfNeeded();
    
    // Verify that request was not called
    expect(window.navigator.wakeLock.request).not.toHaveBeenCalled();
  });
});