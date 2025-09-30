/**
 * Usage Tracker Utility
 * Manages tracking of used content items to avoid repetition until all items have been used
 */

class UsageTracker {
  constructor() {
    this.usedItems = this.loadUsedItems();
  }

  /**
   * Load used items from localStorage
   * @returns {Object} Object containing used items by category
   */
  loadUsedItems() {
    try {
      const stored = localStorage.getItem('usedItems');
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading used items:', error);
      return {};
    }
  }

  /**
   * Save used items to localStorage
   */
  saveUsedItems() {
    try {
      localStorage.setItem('usedItems', JSON.stringify(this.usedItems));
    } catch (error) {
      console.error('Error saving used items:', error);
    }
  }

  /**
   * Check if an item has been used
   * @param {string} category - The content category (movie, book, etc.)
   * @param {string} itemId - The unique ID of the item
   * @returns {boolean} True if the item has been used, false otherwise
   */
  isUsed(category, itemId) {
    const categoryKey = category.toLowerCase();
    if (!this.usedItems[categoryKey]) {
      return false;
    }
    return this.usedItems[categoryKey].includes(itemId);
  }

  /**
   * Mark an item as used
   * @param {string} category - The content category (movie, book, etc.)
   * @param {string} itemId - The unique ID of the item
   */
  markUsed(category, itemId) {
    const categoryKey = category.toLowerCase();
    if (!this.usedItems[categoryKey]) {
      this.usedItems[categoryKey] = [];
    }
    
    if (!this.usedItems[categoryKey].includes(itemId)) {
      this.usedItems[categoryKey].push(itemId);
      this.saveUsedItems();
    }
  }

  /**
   * Reset used items for a specific category
   * @param {string} category - The content category to reset
   */
  resetCategory(category) {
    const categoryKey = category.toLowerCase();
    if (this.usedItems[categoryKey]) {
      delete this.usedItems[categoryKey];
      this.saveUsedItems();
    }
  }

  /**
   * Reset all used items
   */
  resetAll() {
    this.usedItems = {};
    this.saveUsedItems();
  }

  /**
   * Get unused items for a category from content array
   * @param {string} category - The content category
   * @param {Array} contentArray - Array of content items
   * @returns {Array} Array of unused items
   */
  getUnusedItems(category, contentArray) {
    const categoryKey = category.toLowerCase();
    if (!contentArray || !Array.isArray(contentArray)) {
      return [];
    }

    // If no items have been used yet in this category, return all items
    if (!this.usedItems[categoryKey] || this.usedItems[categoryKey].length === 0) {
      return contentArray;
    }

    // Filter out used items
    const unusedItems = contentArray.filter(item => 
      !this.usedItems[categoryKey] || !this.usedItems[categoryKey].includes(item.id)
    );

    // If all items have been used, reset the category and return all items
    if (unusedItems.length === 0 && contentArray.length > 0) {
      this.resetCategory(category);
      return contentArray;
    }

    return unusedItems;
  }

  /**
   * Get usage statistics by category
   * @param {string} category - The content category
   * @param {Array} contentArray - Array of content items
   * @returns {Object} Statistics about used/unused items
   */
  getUsageStats(category, contentArray) {
    const categoryKey = category.toLowerCase();
    const total = contentArray ? contentArray.length : 0;
    const usedCount = this.usedItems[categoryKey] ? this.usedItems[categoryKey].length : 0;
    const unusedCount = total - usedCount;

    return {
      total,
      used: usedCount,
      unused: unusedCount,
      percentageUsed: total > 0 ? Math.round((usedCount / total) * 100) : 0
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UsageTracker;
} else {
  window.UsageTracker = UsageTracker;
}