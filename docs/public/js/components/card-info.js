/**
 * Card Info Component
 * Provides functionality to add info buttons to cards and display additional information
 */

class CardInfo {
  constructor() {
    this.infoModal = null;
    this.infoModalContent = null;
    this.init();
  }

  init() {
    this.createInfoModal();
    this.setupEventListeners();
  }

  createInfoModal() {
    // Create info modal element
    this.infoModal = document.createElement('div');
    this.infoModal.className = 'info-modal';
    this.infoModal.innerHTML = `
      <div class="info-modal-content">
        <div class="info-modal-header">
          <h3 class="info-modal-title">Card Information</h3>
          <button class="close-info-modal">&times;</button>
        </div>
        <div class="info-modal-body">
          <p id="info-modal-text">Information about the selected card will appear here.</p>
        </div>
      </div>
    `;
    document.body.appendChild(this.infoModal);

    // Store reference to content for later updates
    this.infoModalContent = this.infoModal.querySelector('.info-modal-content');
  }

  setupEventListeners() {
    // Close modal when close button is clicked
    const closeBtn = this.infoModal.querySelector('.close-info-modal');
    closeBtn.addEventListener('click', () => {
      this.closeInfoModal();
    });

    // Close modal when clicking outside the content
    this.infoModal.addEventListener('click', (e) => {
      if (e.target === this.infoModal) {
        this.closeInfoModal();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isInfoModalOpen()) {
        this.closeInfoModal();
      }
    });
  }

  addInfoButtonToCard(cardElement, cardData) {
    // Check if info button already exists
    if (cardElement.querySelector('.info-btn')) {
      return;
    }

    // Create info button
    const infoBtn = document.createElement('button');
    infoBtn.className = 'info-btn';
    infoBtn.innerHTML = 'i';
    infoBtn.title = 'Show card information';
    
    // Add event listener to show card info
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showCardInfo(cardData);
    });

    // Add button to the card
    cardElement.appendChild(infoBtn);
  }

  showCardInfo(cardData) {
    // Update modal content based on card data
    const infoText = this.generateCardInfo(cardData);
    document.getElementById('info-modal-text').innerHTML = infoText;

    // Show the modal
    this.openInfoModal();
  }

  generateCardInfo(cardData) {
    // Generate appropriate info based on card type
    let info = `<p><strong>${cardData.title}</strong></p>`;
    
    if (cardData.author) {
      info += `<p><strong>Author:</strong> ${cardData.author}</p>`;
    }
    
    if (cardData.year) {
      info += `<p><strong>Year:</strong> ${cardData.year}</p>`;
    }
    
    // Add more specific info based on category
    if (cardData.id) {
      info += `<p><strong>Card ID:</strong> ${cardData.id}</p>`;
    }
    
    if (cardData.beenUsed !== undefined) {
      info += `<p><strong>Status:</strong> ${cardData.beenUsed ? 'Used' : 'Available'}</p>`;
    }
    
    return info;
  }

  openInfoModal() {
    this.infoModal.classList.add('open');
    // Focus the modal for accessibility
    this.infoModal.focus();
  }

  closeInfoModal() {
    this.infoModal.classList.remove('open');
  }

  isInfoModalOpen() {
    return this.infoModal.classList.contains('open');
  }
}

// Make CardInfo available globally
if (typeof window !== 'undefined') {
  window.CardInfo = CardInfo;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CardInfo;
}