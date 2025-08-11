
# Gemini Project Documentation

## Project Overview

This is a simple web-based charades game. The user clicks a category (Film, TV Show, Game, Song, or Book), and a random entry from that category is displayed. The project uses Eleventy as a static site generator, Sass for styling, and vanilla JavaScript for client-side scripting.

## Project Structure

```
C:\Users\marti\Documents\GitHub\charades\
├───.eleventy.js
├───.gitattributes
├───.gitignore
├───android-chrome-192x192.png
├───android-chrome-256x256.png
├───app icon.png
├───apple-touch-icon.png
├───browserconfig.xml
├───fav.png
├───favicon-16x16.png
├───favicon-32x32.png
├───favicon.ico
├───index.html
├───mstile-150x150.png
├───package-lock.json
├───package.json
├───safari-pinned-tab.svg
├───site.webmanifest
├───.continue\
├───.git\...
├───public\
│   ├───android-chrome-192x192.png
│   ├───android-chrome-256x256.png
│   ├───app icon.png
│   ├───apple-touch-icon.png
│   ├───browserconfig.xml
│   ├───fav.png
│   ├───favicon-16x16.png
│   ├───favicon-32x32.png
│   ├───favicon.ico
│   ├───index.html
│   ├───manifest.json
│   ├───mstile-150x150.png
│   ├───safari-pinned-tab.svg
│   ├───_eleventy_redirect\
│   │   └───index.html
│   ├───css\
│   │   ├───style.css
│   │   └───style.css.map
│   └───scripts\
│       └───script.js
└───src\
    ├───index.njk
    ├───_includes\
    │   ├───template.njk
    │   ├───_pattern_macros\
    │   │   └───general_card.njk
    │   └───components\
    │       ├───head.njk
    │       └───header.njk
    ├───data\
    │   ├───charades.json
    │   ├───README.md
    │   └───refresh-data.js
    ├───sass\
    │   └───style.scss
    └───scripts\
        ├───script.js
        └───usage-example.js
```

## Changes Made

### Data Handling

*   **Removed hardcoded data:** The charades data has been moved from `src/scripts/script.js` to `src/data/charades.json`.
*   **Centralized data:** The `charades.json` file is now the single source of truth for all charades data.
*   **Added `refresh-data.js`:** A new script has been added to fetch the latest data from the IMDB API and update the `charades.json` file.

### JavaScript

*   **Removed jQuery:** The project no longer uses jQuery. The client-side scripting has been refactored to use modern vanilla JavaScript.
*   **Refactored click handlers:** The click handler functions for each category have been replaced with a single, generic function.
*   **Improved data loading:** The charades data is now loaded asynchronously using the `fetch` API.

### Styling

*   **Used Sass mixin:** A Sass mixin has been created to simplify the hover/focus styles for the category buttons.

### Accessibility

*   **Added `aria-label` attributes:** `aria-label` attributes have been added to the category buttons to improve accessibility for screen reader users.

## How to Use the `refresh-data` Script

1.  Create a `.env` file in the root of the project.
2.  Add your IMDB API key to the `.env` file:

    ```
    IMDB_API_KEY=your_api_key
    ```

3.  Run the script:

    ```
    npm run refresh-data
    ```
