// Settings functionality for Charades app
class SettingsManager {
  constructor() {
    this.settingsPanel = null;
    this.settingsBtn = null;
    this.currentBgColor = localStorage.getItem('bgColor') || '#e9ecef'; // Default to grey
    this.screenWakeActive = localStorage.getItem('screenWake') === 'true';
    this.colorPalette = [
      '#e9ecef', // grey (default)
      '#ffffff', // white
      '#f8f9fa', // light grey
      '#0d6efd', // blue
      '#198754', // green
      '#dc3545', // red
      '#ffc107', // yellow
      '#6f42c1', // purple
      '#20c997', // teal
      '#fd7e14'  // orange
    ];
    
    this.init();
  }

  init() {
    this.createSettingsUI();
    this.applyStoredSettings();
    this.setupEventListeners();
    this.requestWakeLockIfNeeded();
  }

  createSettingsUI() {
    // Get existing settings button from HTML if it exists
    this.settingsBtn = document.getElementById('settings-btn');
    if (!this.settingsBtn) {
      // Create settings button if it doesn't exist
      this.settingsBtn = document.createElement('div');
      this.settingsBtn.className = 'settings-btn';
      this.settingsBtn.id = 'settings-btn';
      this.settingsBtn.innerHTML = `
        <svg class="settings-icon" viewBox="0 0 24 24">
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
        </svg>
      `;
      document.body.appendChild(this.settingsBtn);
    }

    // Get existing settings panel from HTML if it exists
    this.settingsPanel = document.getElementById('settings-panel');
    if (!this.settingsPanel) {
      // Create settings panel if it doesn't exist
      this.settingsPanel = document.createElement('div');
      this.settingsPanel.className = 'settings-panel';
      this.settingsPanel.id = 'settings-panel';
      this.settingsPanel.innerHTML = `
        <div class="settings-header">
          <h3 class="settings-title">Settings</h3>
          <button class="close-settings" id="close-settings">&times;</button>
        </div>
        
        <div class="setting-item">
          <label class="setting-label">Background Color</label>
          <div class="color-palette" id="color-palette">
            ${this.colorPalette.map(color => 
              `<div class="color-option" 
                   style="background-color: ${color}" 
                   data-color="${color}"
                   title="${color}"></div>`
            ).join('')}
          </div>
        </div>
        
        <div class="setting-item">
          <label class="setting-label">Keep Screen Awake</label>
          <div class="screen-wake-toggle">
            <span>During gameplay</span>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="screen-wake-toggle" ${this.screenWakeActive ? 'checked' : ''}>
            </div>
          </div>
        </div>
        
        <div class="setting-item">
          <label class="setting-label">Content Tracking</label>
          <button id="reset-used-content" class="btn btn-outline-secondary btn-sm">
            Reset Used Content
          </button>
          <small class="form-text text-muted d-block mt-1">
            Clear the list of used items and allow them to be selected again
          </small>
        </div>
      `;
      document.body.appendChild(this.settingsPanel);
    }
  }

  setupEventListeners() {
    // Settings button click
    document.getElementById('settings-btn').addEventListener('click', () => {
      this.toggleSettingsPanel();
    });

    // Close settings panel
    document.getElementById('close-settings').addEventListener('click', () => {
      this.closeSettingsPanel();
    });

    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        const color = e.target.getAttribute('data-color');
        this.selectColor(color);
      });
    });

    // Screen wake toggle
    document.getElementById('screen-wake-toggle').addEventListener('change', (e) => {
      this.toggleScreenWake(e.target.checked);
    });

    // Reset used content button
    document.getElementById('reset-used-content').addEventListener('click', () => {
      this.resetUsedContent();
    });

    // Close settings panel when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isSettingsPanelOpen() && 
          !this.settingsPanel.contains(e.target) && 
          e.target !== this.settingsBtn) {
        this.closeSettingsPanel();
      }
    });
  }

  // Reset all used content
  resetUsedContent() {
    if (window.app && window.app.contentService && window.app.contentService.usageTracker) {
      window.app.contentService.usageTracker.resetAll();
      alert('Used content has been reset. All items can now be selected again.');
    } else {
      console.warn('Usage tracker not available');
    }
  }

  toggleSettingsPanel() {
    this.settingsPanel.classList.toggle('open');
  }

  closeSettingsPanel() {
    this.settingsPanel.classList.remove('open');
  }

  isSettingsPanelOpen() {
    return this.settingsPanel.classList.contains('open');
  }

  selectColor(color) {
    // Update background color
    document.body.style.backgroundColor = color;
    
    // Update color selection UI
    document.querySelectorAll('.color-option').forEach(option => {
      option.classList.remove('selected');
      if (option.getAttribute('data-color') === color) {
        option.classList.add('selected');
      }
    });
    
    // Store preference
    this.currentBgColor = color;
    localStorage.setItem('bgColor', color);
  }

  toggleScreenWake(activate) {
    this.screenWakeActive = activate;
    localStorage.setItem('screenWake', activate.toString());
    
    if (activate) {
      this.requestWakeLock();
    } else {
      this.releaseWakeLock();
    }
  }

  applyStoredSettings() {
    // Apply stored background color
    document.body.style.backgroundColor = this.currentBgColor;
    
    // Mark selected color
    const selectedColor = document.querySelector(`.color-option[data-color="${this.currentBgColor}"]`);
    if (selectedColor) {
      selectedColor.classList.add('selected');
    }
    
    // Update toggle state
    const toggle = document.getElementById('screen-wake-toggle');
    if (toggle) {
      toggle.checked = this.screenWakeActive;
    }
  }

  // Screen Wake Lock functionality
  wakeLock = null;

  async requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.wakeLock.addEventListener('release', () => {
          console.log('Screen Wake Lock released');
        });
        console.log('Screen Wake Lock active');
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    } else {
      console.warn('Screen Wake Lock not supported in this browser');
    }
  }

  async releaseWakeLock() {
    if (this.wakeLock !== null) {
      try {
        await this.wakeLock.release();
        this.wakeLock = null;
        console.log('Screen Wake Lock released');
      } catch (err) {
        console.error(`${err.name}, ${err.message}`);
      }
    }
  }

  async requestWakeLockIfNeeded() {
    if (this.screenWakeActive) {
      await this.requestWakeLock();
    }
  }
}

// Initialize settings when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.settingsManager = new SettingsManager();
});

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SettingsManager;
}