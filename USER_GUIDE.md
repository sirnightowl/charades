# Charades App - New UX Features User Guide

## Introduction
This guide explains how to use the new UX features that have been added to the Charades app. These features enhance your experience by providing more customization options, better information access, and improved gameplay functionality.

## New Features Overview

### 1. Settings Panel
- Customize the app's background color
- Enable/disable screen wake lock during gameplay
- Access all settings from one convenient location

### 2. Card Information
- Access detailed information about any card with a single click
- View additional details in a clean, modal interface

### 3. Screen Wake Lock
- Prevent your screen from dimming or turning off during gameplay
- Toggle this feature on/off based on your preference

### 4. Background Color Customization
- Choose from 10 different background colors to personalize your experience
- Your color preference is saved automatically

## Using the Settings Panel

### Accessing Settings
1. Look for the gear icon (⚙️) in the top-right corner of the app
2. Click on the gear icon to open the settings panel
3. The panel will slide in from the right side of the screen

### Changing Background Color
1. In the settings panel, find the "Background Color" section
2. You'll see 10 color options arranged in a palette
3. Click on any color to select it
4. The app background will instantly update to your chosen color
5. Your selection is automatically saved and will persist across sessions

### Toggling Screen Wake Lock
1. In the settings panel, find the "Keep Screen Awake" toggle
2. Toggle the switch to enable (ON) or disable (OFF) the screen wake lock
3. When enabled, your screen will stay awake during gameplay
4. This setting is also automatically saved

### Closing the Settings Panel
1. Click the "×" button in the top-right corner of the settings panel
2. Or click anywhere outside the panel
3. The panel will smoothly slide out of view

## Using Card Information

### Accessing Card Details
1. After selecting any category (Film, TV Show, Video Game, Song, Book), a card will appear
2. Look for the small "i" button in the top-right corner of the card
3. Click the "i" button to view detailed information about the selected item
4. A modal will appear with additional details

### Closing Card Information
1. Click the "×" button in the top-right corner of the information modal
2. Or click anywhere outside the modal
3. Press the ESC key on your keyboard
4. The modal will close and you'll return to the main app view

## Screen Wake Lock Feature

### How It Works
When enabled, the screen wake lock prevents your device's screen from dimming or turning off automatically. This is particularly useful during extended gameplay sessions.

### Enabling Screen Wake Lock
1. Open the settings panel using the gear icon
2. Find the "Keep Screen Awake" toggle
3. Switch it to the ON position
4. The feature is now active

### Important Notes
- Screen wake lock only activates when the feature is enabled AND you're actively viewing a card
- The feature uses the modern Screen Wake Lock API and will gracefully handle unsupported browsers
- You can disable this feature at any time using the same toggle

## Background Color Options

### Available Colors
The app provides 10 carefully selected background colors:
1. Grey (default)
2. White
3. Light Grey
4. Blue
5. Green
6. Red
7. Yellow
8. Purple
9. Teal
10. Orange

### Choosing Your Preferred Color
1. Open the settings panel
2. Browse through the color palette
3. Click on any color to instantly apply it
4. Your preference is automatically saved

## Keyboard Navigation

### Settings Panel
- TAB: Navigate between interactive elements
- ENTER: Activate buttons and toggles
- ESC: Close the settings panel

### Card Information
- TAB: Navigate between interactive elements in the modal
- ENTER: Activate buttons
- ESC: Close the information modal

### General Navigation
- TAB: Move between all interactive elements in the app
- ENTER: Activate buttons
- SPACEBAR: Can also activate buttons in some cases

## Troubleshooting

### Settings Panel Not Opening
1. Ensure you're clicking the gear icon (⚙️) in the top-right corner
2. Check that JavaScript is enabled in your browser
3. Refresh the page and try again

### Background Color Not Changing
1. Make sure you've clicked on a color in the palette
2. Check that your browser supports localStorage
3. Try selecting a different color and then reselecting your preferred one

### Screen Wake Lock Not Working
1. Verify that the toggle is switched to ON
2. Note that this feature requires a secure context (HTTPS or localhost)
3. Some browsers or devices may have additional power saving settings that override this feature

### Card Information Not Appearing
1. Ensure you're clicking the "i" button on the card
2. Check that the button is visible and not obstructed
3. Refresh the page and try again

## Browser Compatibility

### Fully Supported
- Chrome 61+
- Firefox 57+
- Safari 14+
- Edge 79+

### Partial Support
- Older versions of the above browsers may have limited functionality
- Internet Explorer is not supported

### Mobile Devices
- iOS Safari 14+
- Chrome for Android 61+
- Samsung Internet 8.2+

## Privacy and Data

### Local Storage
All settings (background color preference and screen wake lock setting) are stored locally in your browser using localStorage. No data is sent to any server.

### No Tracking
The app does not track or collect any personal information.

### Data Persistence
Your settings will persist across browser sessions but will be specific to the device and browser you're using.

## Accessibility

### Keyboard Navigation
All new features fully support keyboard navigation:
- TAB to move between elements
- ENTER to activate buttons
- ESC to close panels and modals

### Screen Readers
The app is designed to work well with screen readers and includes proper ARIA attributes where needed.

### Focus Indicators
Visual focus indicators are provided for all interactive elements to ensure keyboard users can clearly see which element has focus.

## Getting Help

If you encounter any issues not covered in this guide:

1. Check that you're using a supported browser
2. Try refreshing the page
3. Clear your browser cache and try again
4. Contact the development team for assistance

## Providing Feedback

We welcome your feedback on these new features. If you have suggestions for improvement or encounter any issues, please reach out to the development team.