# Charades Project - Updated Documentation

## Project Overview

This is a web-based charades game that has been enhanced with additional features and prepared for conversion to an Android app. The user clicks a category (Film, TV Show, Game, Song, or Book), and a random entry from that category is displayed.

## Recent Improvements

### 1. Enhanced Data Structure
- Expanded all categories with more items (20 items per category)
- Total items increased from 50 to 100

### 2. New Features
- Added keyboard support (spacebar to get new item in current category)
- Implemented item usage tracking to avoid repetition
- Added automatic category reset when all items have been used

### 3. Progressive Web App (PWA) Support
- Added service worker for offline functionality
- Created complete manifest.json for PWA installation
- Added PWA meta tags for mobile experience
- Registered service worker in the head template

### 4. Code Improvements
- Refactored JavaScript to handle new categories
- Improved used items tracking with category-specific keys
- Added error handling for data fetching
- Enhanced code organization and maintainability

## Project Structure

```
C:\Users\marti\Documents\GitHub\charades\
├───.eleventy.js                 # Eleventy configuration
├───package.json                 # Project dependencies and scripts
├───public\                      # Built site output
│   ├───data\                    # Charades data
│   ├───css\                     # Compiled CSS
│   ├───scripts\                 # Client-side JavaScript
│   ├───manifest.json            # PWA manifest
│   ├───sw.js                    # Service worker
│   └───index.html               # Main HTML file
└───src\                         # Source files
    ├───index.njk                # Main page template
    ├───_includes\               # Layout templates
    │   └───components\          # Component templates
    ├───data\                    # Source data
    ├───sass\                    # Sass stylesheets
    └───scripts\                 # Source JavaScript
```

## Preparing for Android App Conversion

### Option 1: WebView Wrapper (Simplest)
1. Create a new Android project in Android Studio
2. Add a WebView component to the main layout
3. Load the charades website in the WebView:
   ```java
   WebView webView = findViewById(R.id.webview);
   webView.getSettings().setJavaScriptEnabled(true);
   webView.loadUrl("https://your-charades-site-url.com");
   ```

### Option 2: PWA to APK (Recommended)
1. Ensure all PWA requirements are met (manifest, service worker, HTTPS)
2. Use Bubblewrap CLI to generate an Android project:
   ```bash
   npx @bubblewrap/cli init --manifest=https://your-charades-site-url.com/manifest.json
   npx @bubblewrap/cli build
   ```
3. Sign the APK for distribution

### Option 3: React Native Conversion (Most Work)
1. Convert the project structure to React Native
2. Recreate the UI components in React Native
3. Implement the logic in JavaScript/TypeScript
4. Build and deploy to Android

## Future Enhancement Ideas

1. **Multiplayer Mode**: Add support for multiple players and scoring
2. **Timer Feature**: Add a countdown timer for each charade
3. **Custom Categories**: Allow users to create their own categories
4. **Difficulty Levels**: Implement easy/medium/hard difficulty settings
5. **Social Sharing**: Add ability to share results on social media
6. **Dark/Light Theme**: Implement theme switching
7. **Statistics Tracking**: Track user performance over time

## Deployment Instructions

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `public` directory, ready for deployment to any static hosting service.

3. For PWA functionality, ensure the site is served over HTTPS.

## Development Commands

- `npm start`: Build Sass and start Eleventy development server
- `npm run build`: Build Sass and generate static site
- `npm run watch:sass`: Watch and compile Sass files
- `npm run build:sass`: Build Sass files
- `npm run watch:eleventy`: Start Eleventy development server
- `npm run build:eleventy`: Generate static site with Eleventy