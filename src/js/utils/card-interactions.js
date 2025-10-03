// Card interaction utilities - handles swipe, drag, and flip animations
class CardInteractions {
  constructor() {
    this.card = null;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isFlipped = false;
    this.onSwipeAway = null;
    this.swipeThreshold = 120; // pixels needed to trigger swipe away
  }

  // Initialize card interactions
  init(cardElement, onSwipeAwayCallback) {
    this.card = cardElement;
    this.onSwipeAway = onSwipeAwayCallback;

    // Set up event listeners for drag/swipe
    this.setupDragListeners();

    // Set up click/tap to flip
    this.setupFlipListener();
  }

  // Set up drag and swipe listeners
  setupDragListeners() {
    if (!this.card) return;

    // Mouse events
    this.card.addEventListener('mousedown', (e) => this.handleDragStart(e));
    document.addEventListener('mousemove', (e) => this.handleDragMove(e));
    document.addEventListener('mouseup', (e) => this.handleDragEnd(e));

    // Touch events
    this.card.addEventListener('touchstart', (e) => this.handleDragStart(e), { passive: false });
    document.addEventListener('touchmove', (e) => this.handleDragMove(e), { passive: false });
    document.addEventListener('touchend', (e) => this.handleDragEnd(e));
  }

  // Set up flip listener
  setupFlipListener() {
    if (!this.card) return;

    this.card.addEventListener('click', (e) => {
      // Only flip if we're not dragging
      if (!this.isDragging && this.currentX === 0 && this.currentY === 0) {
        this.flipCard();
      }
    });
  }

  // Handle start of drag
  handleDragStart(e) {
    // Prevent default only for mouse events (not touch, as we need passive:false for touchmove)
    if (e.type === 'mousedown') {
      e.preventDefault();
    }

    const point = e.type.includes('mouse') ? e : e.touches[0];
    this.startX = point.clientX;
    this.startY = point.clientY;
    this.isDragging = true;

    if (this.card) {
      this.card.classList.add('dragging');
    }
  }

  // Handle drag movement
  handleDragMove(e) {
    if (!this.isDragging || !this.card) return;

    const point = e.type.includes('mouse') ? e : e.touches[0];
    this.currentX = point.clientX - this.startX;
    this.currentY = point.clientY - this.startY;

    // Calculate rotation based on horizontal movement
    const rotation = this.currentX * 0.1;

    // Apply transform
    this.card.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${rotation}deg)`;

    // Calculate opacity based on distance
    const distance = Math.sqrt(this.currentX ** 2 + this.currentY ** 2);
    const opacity = Math.max(0.3, 1 - (distance / 300));
    this.card.style.opacity = opacity;
  }

  // Handle end of drag
  handleDragEnd(e) {
    if (!this.isDragging || !this.card) return;

    this.isDragging = false;
    this.card.classList.remove('dragging');

    // Calculate total distance moved
    const distance = Math.sqrt(this.currentX ** 2 + this.currentY ** 2);

    // If moved far enough, swipe away
    if (distance > this.swipeThreshold) {
      this.swipeAway();
    } else {
      // Reset position with smooth animation
      this.resetPosition();
    }
  }

  // Swipe card away
  swipeAway() {
    if (!this.card) return;

    // Calculate direction to throw the card
    const angle = Math.atan2(this.currentY, this.currentX);
    const throwDistance = 1000;
    const throwX = Math.cos(angle) * throwDistance;
    const throwY = Math.sin(angle) * throwDistance;
    const rotation = this.currentX * 0.5;

    // Animate card flying away
    this.card.style.transition = 'transform 0.4s cubic-bezier(0.6, 0.04, 0.98, 0.34), opacity 0.4s ease-out';
    this.card.style.transform = `translate(${throwX}px, ${throwY}px) rotate(${rotation}deg)`;
    this.card.style.opacity = '0';

    // Call callback after animation
    setTimeout(() => {
      if (this.onSwipeAway) {
        this.onSwipeAway();
      }
      this.resetCard();
    }, 400);
  }

  // Programmatically trigger swipe away (for button clicks)
  // Returns a promise that resolves when animation and reset are complete
  triggerSwipeAway() {
    if (!this.card) return Promise.resolve();

    return new Promise((resolve) => {
      // Set a random direction
      const directions = [
        { x: -800, y: -200, rotation: -45 },
        { x: 800, y: -200, rotation: 45 },
        { x: -600, y: 300, rotation: -30 },
        { x: 600, y: 300, rotation: 30 }
      ];
      const direction = directions[Math.floor(Math.random() * directions.length)];

      // Animate card flying away
      this.card.style.transition = 'transform 0.5s cubic-bezier(0.6, 0.04, 0.98, 0.34), opacity 0.5s ease-out';
      this.card.style.transform = `translate(${direction.x}px, ${direction.y}px) rotate(${direction.rotation}deg)`;
      this.card.style.opacity = '0';

      // Reset the card styles after animation completes
      setTimeout(() => {
        this.resetCardStyles();
        resolve();
      }, 500);
    });
  }

  // Reset only the card styles without resetting content
  resetCardStyles() {
    if (!this.card) return;

    this.card.style.transition = '';
    this.card.style.transform = '';
    // Keep opacity at 0 so renderCurrentItem can update content while hidden
    this.card.style.opacity = '0';
    this.currentX = 0;
    this.currentY = 0;
    this.isFlipped = false;

    // Reset card-inner flip state too
    const cardInner = this.card.querySelector('.card-inner');
    if (cardInner) {
      cardInner.style.transform = 'rotateY(0deg)';
    }
  }

  // Reset card position
  resetPosition() {
    if (!this.card) return;

    this.card.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    this.card.style.transform = 'translate(0, 0) rotate(0deg)';
    this.card.style.opacity = '1';

    this.currentX = 0;
    this.currentY = 0;

    // Remove transition after animation completes
    setTimeout(() => {
      if (this.card) {
        this.card.style.transition = '';
      }
    }, 300);
  }

  // Reset card state
  resetCard() {
    if (!this.card) return;

    this.card.style.transition = '';
    this.card.style.transform = '';
    this.card.style.opacity = '';
    this.currentX = 0;
    this.currentY = 0;
    this.isFlipped = false;

    // Reset card-inner flip state too
    const cardInner = this.card.querySelector('.card-inner');
    if (cardInner) {
      cardInner.style.transform = 'rotateY(0deg)';
    }
  }

  // Flip card animation
  flipCard() {
    if (!this.card) return;

    const cardInner = this.card.querySelector('.card-inner');
    if (!cardInner) return;

    this.isFlipped = !this.isFlipped;

    if (this.isFlipped) {
      cardInner.style.transform = 'rotateY(180deg)';
    } else {
      cardInner.style.transform = 'rotateY(0deg)';
    }
  }

  // Show card with entrance animation
  showCard() {
    if (!this.card) return;

    this.card.classList.add('card-enter');
    setTimeout(() => {
      if (this.card) {
        this.card.classList.remove('card-enter');
      }
    }, 400);
  }

  // Clean up event listeners
  destroy() {
    if (!this.card) return;

    this.card.removeEventListener('mousedown', this.handleDragStart);
    this.card.removeEventListener('touchstart', this.handleDragStart);
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('touchmove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('touchend', this.handleDragEnd);
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardInteractions;
} else {
  window.CardInteractions = CardInteractions;
}
