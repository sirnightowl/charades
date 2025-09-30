/**
 * Unit tests for screen wake lock logic
 * Tests the screen wake lock utility functionality
 */

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

describe('Screen Wake Lock Logic Tests', () => {
  let dom;
  let window;
  let screenWakeLock;

  beforeEach(() => {
    // Set up a fake DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test</title>
      </head>
      <body>
      </body>
      </html>
    `);
    
    window = dom.window;
    
    // Mock navigator.wakeLock
    window.navigator.wakeLock = {
      request: jest.fn(() => Promise.resolve({
        addEventListener: jest.fn(),
        release: jest.fn(() => Promise.resolve())
      }))
    };
    
    // Store references to global objects
    global.window = window;
    global.document = dom.window.document;
  });

  afterEach(() => {
    // Clean up
    if (screenWakeLock && typeof screenWakeLock.releaseWakeLock === 'function') {
      screenWakeLock.releaseWakeLock();
    }
    
    // Clean up globals
    delete global.window;
    delete global.document;
  });

  test('ScreenWakeLock should initialize with correct default state', () => {
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    expect(screenWakeLock.wakeLock).toBeNull();
    expect(screenWakeLock.isActive).toBe(false);
  });

  test('isSupported should return true when wakeLock is available', () => {
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    expect(screenWakeLock.isSupported()).toBe(true);
  });

  test('isSupported should return false when wakeLock is not available', () => {
    // Temporarily remove wakeLock API
    delete window.navigator.wakeLock;
    
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    expect(screenWakeLock.isSupported()).toBe(false);
  });

  test('requestWakeLock should activate the wake lock when API is supported', async () => {
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    // Mock the wakeLock request to return a mock wake lock
    const mockWakeLock = {
      addEventListener: jest.fn(),
      release: jest.fn(() => Promise.resolve())
    };
    
    window.navigator.wakeLock.request = jest.fn(() => Promise.resolve(mockWakeLock));
    
    const result = await screenWakeLock.requestWakeLock();
    
    expect(result).toBe(true);
    expect(screenWakeLock.wakeLock).toBe(mockWakeLock);
    expect(screenWakeLock.isActive).toBe(true);
    expect(window.navigator.wakeLock.request).toHaveBeenCalledWith('screen');
  });

  test('requestWakeLock should fail gracefully when API is not supported', async () => {
    // Temporarily remove wakeLock API
    delete window.navigator.wakeLock;
    
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    const result = await screenWakeLock.requestWakeLock();
    
    expect(result).toBe(false);
    expect(screenWakeLock.isActive).toBe(false);
  });

  test('requestWakeLock should handle errors when requesting', async () => {
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    // Mock the wakeLock request to throw an error
    window.navigator.wakeLock.request = jest.fn(() => {
      throw new Error('Wake lock request failed');
    });
    
    const result = await screenWakeLock.requestWakeLock();
    
    expect(result).toBe(false);
    expect(screenWakeLock.isActive).toBe(false);
  });

  test('releaseWakeLock should release an active wake lock', async () => {
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    // Create a mock wake lock and set it as active
    const mockWakeLock = {
      addEventListener: jest.fn(),
      release: jest.fn(() => Promise.resolve())
    };
    
    screenWakeLock.wakeLock = mockWakeLock;
    screenWakeLock.isActive = true;
    
    const result = await screenWakeLock.releaseWakeLock();
    
    expect(result).toBe(true);
    expect(screenWakeLock.wakeLock).toBeNull();
    expect(screenWakeLock.isActive).toBe(false);
    expect(mockWakeLock.release).toHaveBeenCalled();
  });

  test('releaseWakeLock should return false when no wake lock is active', async () => {
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    // Ensure no wake lock is set
    screenWakeLock.wakeLock = null;
    
    const result = await screenWakeLock.releaseWakeLock();
    
    expect(result).toBe(false);
  });

  test('releaseWakeLock should handle errors when releasing', async () => {
    const { ScreenWakeLock } = require('../../public/js/utils/screen-wake-lock');
    
    screenWakeLock = new ScreenWakeLock();
    
    // Create a mock wake lock that throws an error on release
    const mockWakeLock = {
      addEventListener: jest.fn(),
      release: jest.fn(() => {
        throw new Error('Wake lock release failed');
      })
    };
    
    screenWakeLock.wakeLock = mockWakeLock;
    screenWakeLock.isActive = true;
    
    const result = await screenWakeLock.releaseWakeLock();
    
    expect(result).toBe(false);
    // The wake lock should still be cleared even if release failed
    expect(screenWakeLock.wakeLock).toBeNull();
    expect(screenWakeLock.isActive).toBe(false);
  });
});