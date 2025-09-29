# Quickstart Guide for Content Catalog PWA

## Prerequisites
- A web server that supports HTTPS
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript

## Setup Instructions

### 1. Download the Application Files
```bash
# Clone or download the repository to your local machine
git clone [repository-url]
# Or download the zip file and extract it
```

### 2. Deploy to Web Server
1. Upload the contents of the `public` directory to your web server
2. Ensure your server is configured for HTTPS (required for PWA functionality)
3. Verify that the following files are accessible:
   - `index.html` (main application entry point)
   - `manifest.json` (PWA manifest file)
   - `sw.js` (service worker file)
   - `data/movies.json`, `data/books.json`, `data/games.json`

### 3. Install as App
#### On Android:
1. Open the app URL in Chrome
2. Tap the "Add to Home screen" option in the menu
3. Confirm installation

#### On iOS:
1. Open the app URL in Safari
2. Tap the Share button
3. Select "Add to Home Screen"
4. Confirm installation

## Initial Configuration
1. Verify that your JSON data files are properly formatted
2. Ensure the `manifest.json` file points to the correct icons and app details
3. Confirm the `sw.js` service worker is registered

## Running the Application
1. Navigate to your app's URL in a web browser
2. The application will load the content from JSON files
3. Users can browse, search, and filter content by category
4. When installed as an app, it will work offline with cached content

## Testing the Application
1. **Basic Functionality Test**: Open the app and verify content loads from JSON files
2. **Category Browsing Test**: Navigate between Movies, Books, and Games sections
3. **Search Test**: Use search functionality to find specific content
4. **Offline Test**: Disconnect from the internet and confirm basic functionality still works
5. **Install Test**: Verify the app can be installed on both Android and iOS devices

## Updating Content
1. Edit the respective JSON files (`movies.json`, `books.json`, `games.json`)
2. Upload the updated JSON files to your server
3. Content will be updated when users open the app next time (after service worker cache update)
4. For immediate updates, users may need to refresh the app or clear browser data

## Troubleshooting
- If the app doesn't install properly, check that HTTPS is properly configured
- If content doesn't load, verify that JSON files are valid and accessible
- If offline mode doesn't work, check service worker registration in browser dev tools