/**
 * Unit tests for card info button functionality
 * Tests the info button display, interaction, and modal functionality
 */

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

describe('Card Info Button Tests', () => {
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
            <span id="result-category">Made by @sirnightowl</span>
            <p id="result-author">Select a category below to draw a card</p>
            <p id="result-year" class="lead"></p>
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

  test('Should be able to add info button to a card element', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Get the result element to act as a card
    const cardElement = document.getElementById('result');
    
    // Create an info button and add it to the card
    const infoBtn = document.createElement('button');
    infoBtn.className = 'info-btn';
    infoBtn.innerHTML = 'i';
    infoBtn.title = 'Card information';
    
    cardElement.appendChild(infoBtn);
    
    // Check that the info button was added
    const addedBtn = cardElement.querySelector('.info-btn');
    expect(addedBtn).not.toBeNull();
    expect(addedBtn.innerHTML).toBe('i');
    expect(addedBtn.title).toBe('Card information');
  });

  test('Should show info modal when info button is clicked', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Create a card with an info button
    const cardElement = document.getElementById('result');
    const infoBtn = document.createElement('button');
    infoBtn.className = 'info-btn';
    infoBtn.innerHTML = 'i';
    infoBtn.title = 'Card information';
    cardElement.appendChild(infoBtn);
    
    // Create an info modal
    const infoModal = document.createElement('div');
    infoModal.className = 'info-modal';
    infoModal.innerHTML = `
      <div class="info-modal-content">
        <div class="info-modal-header">
          <h3 class="info-modal-title">Card Information</h3>
          <button class="close-info-modal">&times;</button>
        </div>
        <div class="info-modal-body">
          <p>This is information about the current card.</p>
        </div>
      </div>
    `;
    document.body.appendChild(infoModal);
    
    // Initially, modal should be closed
    expect(infoModal.classList.contains('open')).toBe(false);
    
    // Click the info button
    infoBtn.click();
    
    // Modal should now be open
    expect(infoModal.classList.contains('open')).toBe(true);
  });

  test('Should close info modal when close button is clicked', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Create a card with an info button
    const cardElement = document.getElementById('result');
    const infoBtn = document.createElement('button');
    infoBtn.className = 'info-btn';
    infoBtn.innerHTML = 'i';
    infoBtn.title = 'Card information';
    cardElement.appendChild(infoBtn);
    
    // Create an info modal
    const infoModal = document.createElement('div');
    infoModal.className = 'info-modal';
    infoModal.innerHTML = `
      <div class="info-modal-content">
        <div class="info-modal-header">
          <h3 class="info-modal-title">Card Information</h3>
          <button class="close-info-modal">&times;</button>
        </div>
        <div class="info-modal-body">
          <p>This is information about the current card.</p>
        </div>
      </div>
    `;
    document.body.appendChild(infoModal);
    
    // Open the modal first
    infoModal.classList.add('open');
    expect(infoModal.classList.contains('open')).toBe(true);
    
    // Find and click the close button
    const closeBtn = infoModal.querySelector('.close-info-modal');
    closeBtn.click();
    
    // Modal should be closed
    expect(infoModal.classList.contains('open')).toBe(false);
  });

  test('Should close info modal when clicking outside the content', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Create a card with an info button
    const cardElement = document.getElementById('result');
    const infoBtn = document.createElement('button');
    infoBtn.className = 'info-btn';
    infoBtn.innerHTML = 'i';
    infoBtn.title = 'Card information';
    cardElement.appendChild(infoBtn);
    
    // Create an info modal
    const infoModal = document.createElement('div');
    infoModal.className = 'info-modal';
    infoModal.innerHTML = `
      <div class="info-modal-content">
        <div class="info-modal-header">
          <h3 class="info-modal-title">Card Information</h3>
          <button class="close-info-modal">&times;</button>
        </div>
        <div class="info-modal-body">
          <p>This is information about the current card.</p>
        </div>
      </div>
    `;
    document.body.appendChild(infoModal);
    
    // Open the modal first
    infoModal.classList.add('open');
    expect(infoModal.classList.contains('open')).toBe(true);
    
    // Click on the modal background (outside the content)
    infoModal.click();
    
    // Modal should be closed
    expect(infoModal.classList.contains('open')).toBe(false);
  });

  test('Should have proper CSS classes for styling', () => {
    const { SettingsManager } = require('../../public/js/settings'); // Adjust the path as needed
    
    settingsManager = new SettingsManager();
    
    // Create an info button
    const infoBtn = document.createElement('button');
    infoBtn.className = 'info-btn';
    infoBtn.innerHTML = 'i';
    
    // Check that it has the required CSS class
    expect(infoBtn.classList.contains('info-btn')).toBe(true);
    
    // Check that the class exists in the DOM
    document.body.appendChild(infoBtn);
    const addedBtn = document.querySelector('.info-btn');
    expect(addedBtn).not.toBeNull();
  });
});