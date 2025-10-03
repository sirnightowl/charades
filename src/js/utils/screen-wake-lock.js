/**
 * Screen Wake Lock Utility
 * Provides functionality to keep the screen awake during gameplay
 */

class ScreenWakeLock {
  constructor() {
    this.wakeLock = null;
    this.isActive = false;
  }

  async requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        this.isActive = true;
        
        // Add event listener to re-request wake lock when visibility changes
        document.addEventListener('visibilitychange', () => {
          if (this.isActive && document.visibilityState === 'visible') {
            this.requestWakeLock();
          }
        });
        
        console.log('Screen Wake Lock activated');
        return true;
      } catch (err) {
        console.error(`Failed to activate wake lock: ${err.name}, ${err.message}`);
        return false;
      }
    } else {
      console.warn('Screen Wake Lock API is not supported in this browser');
      return false;
    }
  }

  async releaseWakeLock() {
    if (this.wakeLock !== null) {
      try {
        await this.wakeLock.release();
        this.wakeLock = null;
        this.isActive = false;
        console.log('Screen Wake Lock released');
        return true;
      } catch (err) {
        console.error(`Failed to release wake lock: ${err.name}, ${err.message}`);
        return false;
      }
    }
    return false;
  }

  isSupported() {
    return 'wakeLock' in navigator;
  }

  isActive() {
    return this.isActive;
  }
}

// Make ScreenWakeLock available globally
if (typeof window !== 'undefined') {
  window.ScreenWakeLock = ScreenWakeLock;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ScreenWakeLock;
}