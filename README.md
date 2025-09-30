# Charades Content Catalog

This is a Progressive Web App (PWA) for the Charades game featuring movies, books, games, and more. The application allows users to randomly select items from different content categories to act out during family nights.

## Running the Application

### Development Mode
To run the application in development mode with auto-refresh:

```bash
npm run start
```

This will start a local server at `http://localhost:8080` with live reloading.

### Production Build
To build the application for production:

```bash
npm run build
```

This compiles the assets and generates the static site in the `_site` directory.

After building, you can serve the `_site` directory using any web server.

## Features

- **PWA Support**: Installable on both Android and iOS devices
- **Multiple Categories**: Choose from movies, books, games, songs, and TV shows
- **Offline Capability**: Works offline thanks to service worker caching
- **JSON-based Content**: Easily updateable content through separate JSON files
- **Responsive Design**: Works on devices of all sizes

## Architecture

The application follows a modular architecture:

- **Models**: Movie, Book, and Game classes in `/public/js/models/`
- **Services**: Content service for loading and managing data in `/public/js/services/`
- **Components**: UI components for each content type in `/public/js/components/`
- **Utilities**: Search functionality in `/public/js/utils/`
- **Data**: JSON files stored in `/public/data/`

## Technology Stack

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Framework**: Bootstrap 5 for responsive design
- **PWA**: Service Worker and Web App Manifest for mobile-like experience
- **Build Tool**: Eleventy (11ty) for static site generation

## Project Structure

```
public/
├── index.html              # Main application entry point
├── manifest.json          # PWA manifest file
├── sw.js                  # Service worker file
├── data/                  # Content data files
│   ├── movies.json
│   ├── books.json
│   └── games.json
├── js/
│   ├── models/            # Entity models
│   ├── services/          # Business logic
│   ├── components/        # UI components
│   ├── utils/             # Utility functions
│   └── app.js             # Main application controller
├── css/
│   └── style.css          # Custom styles
└── scripts/
    └── script.js          # Original script for compatibility
```

## Setup and Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run start`
4. The application will be available at `http://localhost:8080`

## Content Management

Content is managed through JSON files in the `public/data/` directory:

- **Movies** (`movies.json`): Contains movie information with title, director, year, etc.
- **Books** (`books.json`): Contains book information with title, author, year, etc.
- **Games** (`games.json`): Contains game information with title, developer, year, etc.

To add new content, simply update the respective JSON files with new entries following the existing schema.

## PWA Installation

The application can be installed on both Android and iOS devices:

- **Android**: Open in Chrome and tap the "Add to Home screen" option
- **iOS**: Open in Safari, tap the Share button, and select "Add to Home Screen"

## Offline Capability

The service worker caches important assets and content, allowing the app to function without an internet connection. The cache is updated automatically when new content is available.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the terms specified in the LICENSE file.

## Acknowledgments

- Original implementation by @SirNightOwl
- Movie, book, and game data for demonstration purposes only

## New UX Features

The app has been significantly enhanced with the following user experience improvements:

### Settings Panel
- Replaced the old info button with a modern settings icon (⚙️) in the top-right corner
- Slide-in panel with smooth animations for accessing all settings
- Clean, intuitive interface organized by feature categories
- Responsive design that works on all device sizes

### Background Color Customization
- Choose from 10 carefully selected background colors to personalize your experience
- Visual color palette with clear selection indicators
- Instant preview of color changes
- Preferences automatically saved and persist across sessions
- Default grey background color maintained as the initial option

### Card Information System
- Added info buttons (i) to each card display for quick access to detailed information
- Clean modal interface that shows comprehensive details about the selected item
- Displays title, year, creator/author/director, and additional metadata when available
- Keyboard accessible with multiple ways to close (ESC key, close button, clicking outside)
- Consistent styling that matches the overall app design

### Screen Wake Lock
- Optional feature to keep your screen awake during gameplay
- Toggle in the settings panel under "Keep Screen Awake"
- Uses the modern Screen Wake Lock API with graceful fallback for unsupported browsers
- Automatically activates when viewing cards and the feature is enabled
- Helps prevent interruptions during extended gameplay sessions

### Accessibility Features
- Full keyboard navigation support for all new UI elements
- Clear visual focus indicators for interactive elements
- Proper ARIA attributes for screen reader compatibility
- High contrast mode support
- Reduced motion support for users with vestibular disorders

### Performance Optimizations
- Efficient DOM manipulation with minimal reflows
- Proper event delegation to minimize memory usage
- Lazy initialization where appropriate
- Lightweight implementation with no external dependencies

### Technical Improvements
- Modular architecture with separate components for each feature
- Persistent settings using localStorage
- Comprehensive error handling and user feedback
- Modern JavaScript (ES6+) implementation
- Fully integrated with existing app architecture
- No conflicts with existing functionality

### User Experience Benefits
1. **Personalization** - Users can now customize the app's appearance to their preference
2. **Better Information Access** - Detailed card information is now easily accessible
3. **Improved Gameplay** - Screen wake lock prevents interruptions during gameplay
4. **Modern UI** - The new settings panel provides a contemporary user experience
5. **Accessibility** - Full keyboard navigation and screen reader support
6. **Performance** - Efficient implementation with minimal resource usage

For detailed instructions on using these new features, please refer to the [USER_GUIDE.md](USER_GUIDE.md) file.