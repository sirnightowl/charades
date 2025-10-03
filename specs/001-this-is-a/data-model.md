# Data Model: Charades PWA

**Feature**: 001-this-is-a
**Date**: 2025-10-02

## Entity Definitions

### 1. Content Item (Abstract)

Base entity for all charades content types.

**Common Fields**:
- `title` (string, required): Display name of the content
- `year` (number, optional): Release/publication year
- `type` (string, required): Category identifier (movie, tvshow, game, song, book)

**Validation Rules**:
- Title must not be empty
- Year must be valid 4-digit number if provided
- Type must match one of the defined categories

**Existing Implementation**: Base validation in model classes (Movie, Book, Game)

---

### 2. Movie (extends Content Item)

**Fields**:
- `title` (string, required)
- `year` (number, required)
- `director` (string, optional)

**Validation Rules** (from src/js/models/movie-model.js):
- Title required and non-empty
- Year required
- Director optional

**Example**:
```json
{
  "title": "The Godfather",
  "year": 1972,
  "director": "Francis Ford Coppola"
}
```

---

### 3. TV Show (extends Content Item)

**Fields**:
- `title` (string, required)
- `year` (number, optional): First air year
- `creator` (string, optional)
- `type` (string): "tvshow"

**Validation Rules**:
- Title required and non-empty
- Year optional (some shows have unknown start dates)
- Creator optional

**Example**:
```json
{
  "title": "Breaking Bad",
  "year": 2008,
  "creator": "Vince Gilligan",
  "type": "tvshow"
}
```

---

### 4. Game (extends Content Item)

**Fields**:
- `title` (string, required)
- `year` (number, optional)
- `developer` (string, optional)

**Validation Rules** (from src/js/models/game-model.js):
- Title required and non-empty
- Year optional
- Developer optional

**Example**:
```json
{
  "title": "The Legend of Zelda: Ocarina of Time",
  "year": 1998,
  "developer": "Nintendo"
}
```

---

### 5. Song (extends Content Item)

**Fields**:
- `title` (string, required)
- `year` (number, optional)
- `artist` (string, optional)
- `type` (string): "song"

**Validation Rules**:
- Title required and non-empty
- Year optional
- Artist optional

**Example**:
```json
{
  "title": "Bohemian Rhapsody",
  "year": 1975,
  "artist": "Queen",
  "type": "song"
}
```

---

### 6. Book (extends Content Item)

**Fields**:
- `title` (string, required)
- `year` (number, optional)
- `author` (string, optional)

**Validation Rules** (from src/js/models/book-model.js):
- Title required and non-empty
- Year optional
- Author optional

**Example**:
```json
{
  "title": "To Kill a Mockingbird",
  "year": 1960,
  "author": "Harper Lee"
}
```

---

### 7. Settings Configuration

User preferences stored in LocalStorage.

**Fields**:
- `bgColor` (string): Hex color code for background
- `screenWake` (string): "true" or "false" for wake lock preference

**Storage Keys** (from src/js/settings.js):
- `localStorage.getItem('bgColor')` - Default: '#e9ecef'
- `localStorage.getItem('screenWake')` - Default: 'false'

**Validation Rules**:
- bgColor must be valid hex color (6 characters + #)
- screenWake must be 'true' or 'false' string

**Available Colors**:
```javascript
['#e9ecef', '#ffffff', '#f8f9fa', '#0d6efd', '#198754',
 '#dc3545', '#ffc107', '#6f42c1', '#20c997', '#fd7e14']
```

---

### 8. Usage Tracker

Tracks which content items have been displayed to avoid repetition.

**Implementation** (from src/js/utils/usage-tracker.js):
- Stores used item IDs or titles in memory
- Provides methods to mark items as used
- Provides reset functionality

**State**:
- `usedMovies` (array): List of used movie titles/IDs
- `usedTVShows` (array): List of used TV show titles/IDs
- `usedGames` (array): List of used game titles/IDs
- `usedSongs` (array): List of used song titles/IDs
- `usedBooks` (array): List of used book titles/IDs

**Methods**:
- `markAsUsed(category, itemId)`: Add item to used list
- `isUsed(category, itemId)`: Check if item already used
- `resetCategory(category)`: Clear used items for category
- `resetAll()`: Clear all used items

---

### 9. Category

Enumeration of content types.

**Values**:
- `movies`: Film content
- `tvshows`: Television show content
- `games`: Video game content
- `songs`: Music/song content
- `books`: Literature content

**Mapping** (from src/js/app.js):
- Button ID `getfilm` → category `movies`
- Button ID `getshow` → category `tvshows`
- Button ID `getgame` → category `games`
- Button ID `getsong` → category `songs`
- Button ID `getbook` → category `books`

---

## Data Relationships

```
Category (enum)
    ↓ (contains)
Content Items (1-to-many)
    ├── Movies
    ├── TV Shows
    ├── Games
    ├── Songs
    └── Books

Usage Tracker (singleton)
    ↓ (tracks)
Content Items (by category)

Settings Configuration (singleton)
    ↓ (persisted in)
LocalStorage
```

---

## State Management

### Client-Side State (In-Memory)
- **ContentService**: Holds all loaded content arrays
  - `this.movies` - Array of Movie objects
  - `this.tvshows` - Array of TV Show objects
  - `this.games` - Array of Game objects
  - `this.songs` - Array of Song objects
  - `this.books` - Array of Book objects

- **UsageTracker**: Tracks used items during session
  - Reset on user action or page refresh (depending on implementation)

### Persistent State (LocalStorage)
- **Settings**: User preferences
  - Background color choice
  - Screen wake lock preference

### Immutable State (JSON Files)
- **Content Data**: Read-only arrays in `/docs/data/*.json`
  - Loaded once on app initialization
  - No runtime modifications

---

## Data Flow

```
1. App Initialization
   └→ ContentService.loadAllContent()
      └→ Fetch /data/movies.json, /data/books.json, etc.
         └→ Parse JSON → Create Model instances → Validate
            └→ Store in ContentService arrays

2. User Selects Category
   └→ App.selectCategoryAndShowItem(category)
      └→ ContentService.getRandomContent(category)
         └→ Filter out used items (UsageTracker)
            └→ Select random item
               └→ Mark as used
                  └→ Return item to App
                     └→ App.renderCurrentItem()

3. User Opens Settings
   └→ SettingsManager.toggleSettingsPanel()
      └→ Apply stored preferences from LocalStorage
         └→ User modifies settings
            └→ Save to LocalStorage
               └→ Apply changes to DOM/Wake Lock API

4. User Resets Used Content
   └→ SettingsManager.resetUsedContent()
      └→ UsageTracker.resetAll()
         └→ All items available again
```

---

## Validation Strategy

### Load Time Validation
- JSON files must parse successfully
- Each object must have required `title` field
- Model constructors validate data structure

### Runtime Validation
- Settings values validated before saving to LocalStorage
- Category names validated before content lookup
- Random selection validates available items exist

### Error Handling
- Missing JSON files: Display error message
- Invalid JSON: Console warning, skip invalid items
- Empty categories: Display "no items available" message
- Failed settings save: Continue with defaults

---

## Data Migration

Not applicable - no existing data to migrate. This is bug fix and cleanup work on existing structure.

---

## Performance Considerations

### Data Loading
- All content loaded once at app initialization
- ~100-200 items per category = ~500-1000 total items
- Estimated JSON size: 50-100KB total (small enough for single load)

### Memory Usage
- All content kept in memory (negligible for ~1000 items)
- UsageTracker grows during session (max ~1000 IDs)
- LocalStorage: ~100 bytes for settings

### Optimization Opportunities
- Lazy load categories on first use (not needed for current scale)
- IndexedDB for larger datasets (not needed - JSON files sufficient)
- Service Worker caching (already planned for PWA)

---

## Security Considerations

### Input Validation
- JSON files are static, trusted content (not user input)
- LocalStorage values sanitized before use
- No SQL injection risk (no database)
- No XSS risk (content displayed as text, not HTML)

### Data Privacy
- All data stored locally (no server transmission)
- No user-generated content
- No personal information collected
- Settings stored in browser LocalStorage (user-specific)

---

*Data model complete. Ready for contract definition.*
