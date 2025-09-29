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