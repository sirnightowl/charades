# Charades PWA

A Progressive Web App (PWA) for the Charades game featuring movies, TV shows, books, games, and songs. Perfect for family game nights!

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

This runs both Sass and Eleventy in watch mode. The app will be available at `http://localhost:8080`.

### Production Build

```bash
npm run build
```

This compiles Sass and runs Eleventy to generate the `docs/` directory.

## How to Play

1. Open the app in your browser
2. Select a category (Film, TV Show, Video Game, Song, or Book)
3. A random item will be displayed
4. Act it out for your team!

## Features

- **5 Content Categories**: Movies, TV Shows, Games, Songs, and Books
- **PWA Support**: Installable on Android and iOS devices
- **Offline Capability**: Works offline after first load
- **Settings Panel**: Customize background color and screen wake lock
- **Usage Tracking**: Prevents showing the same item twice until reset
- **Responsive Design**: Works on all device sizes

## PWA Installation

### Android
1. Open the app in Chrome
2. Tap the menu (⋮) and select "Add to Home screen"
3. The app will appear as an icon on your home screen

### iOS
1. Open the app in Safari
2. Tap the Share button (□ with arrow)
3. Select "Add to Home Screen"
4. The app will appear as an icon on your home screen

## Settings

Click the gear icon (⚙️) in the top-right corner to access settings:

- **Background Color**: Choose from 10 color options
- **Keep Screen Awake**: Prevent screen from turning off during gameplay
- **Reset Used Content**: Clear usage tracking to see previously shown items again

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **UI Framework**: Bootstrap 5.3.0
- **Styling**: Sass 1.58.0
- **Build Tool**: Eleventy 1.0.2
- **Content Storage**: Local JSON files

## Project Structure

```
charades/
├── docs/                   # Built output (deployed, git-ignored)
│   ├── index.html         # Main app entry
│   ├── css/               # Compiled CSS
│   ├── js/                # Copied JavaScript
│   └── data/              # JSON content files
│       ├── movies.json    # 35 movies
│       ├── tvshows.json   # 35 TV shows
│       ├── games.json     # 35 games
│       ├── songs.json     # 35 songs
│       └── books.json     # 35 books
├── src/                   # Source files
│   ├── _includes/         # Eleventy templates
│   │   ├── template.njk   # Base template
│   │   └── components/    # Template components
│   ├── index.njk          # Main page template
│   ├── sass/              # SCSS source
│   │   ├── style.scss     # Main styles
│   │   └── settings.scss  # Settings styles
│   └── js/                # JavaScript source
│       ├── app.js         # Main controller
│       ├── settings.js    # Settings panel
│       ├── models/        # Data models
│       ├── services/      # Content service
│       ├── components/    # UI components
│       └── utils/         # Utilities
├── .eleventy.js           # Eleventy configuration
├── .gitignore             # Git ignore rules
└── package.json           # Dependencies
```

## Content Management

Content is stored in JSON files in `docs/data/`. Each file contains an array of items:

**Movies** (`movies.json`):
```json
[
  {
    "title": "The Shawshank Redemption",
    "year": 1994,
    "director": "Frank Darabont"
  }
]
```

**TV Shows** (`tvshows.json`):
```json
[
  {
    "title": "Breaking Bad",
    "year": 2008,
    "creator": "Vince Gilligan",
    "type": "tvshow"
  }
]
```

**Games** (`games.json`):
```json
[
  {
    "title": "The Legend of Zelda: Ocarina of Time",
    "year": 1998,
    "developer": "Nintendo"
  }
]
```

**Songs** (`songs.json`):
```json
[
  {
    "title": "Bohemian Rhapsody",
    "year": 1975,
    "artist": "Queen",
    "type": "song"
  }
]
```

**Books** (`books.json`):
```json
[
  {
    "title": "To Kill a Mockingbird",
    "year": 1960,
    "author": "Harper Lee"
  }
]
```

To add content, edit the respective JSON file and rebuild the app.

## Development

### File Structure
- **src/sass/**: SCSS files (style.scss, settings.scss)
- **src/js/**: JavaScript source files
- **docs/**: Build output (don't edit directly)

### Building
- `npm run build:sass`: Compile Sass to CSS
- `npm run build:eleventy`: Run Eleventy build
- `npm run build`: Run both builds

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (iOS 15+)
- Chrome Mobile (Android 8+)

## License

ISC

## Credits

Created by @SirNightOwl
