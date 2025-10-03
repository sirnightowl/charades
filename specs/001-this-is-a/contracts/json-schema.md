# JSON Data Contracts

**Feature**: 001-this-is-a
**Date**: 2025-10-02

This document defines the JSON schema contracts for all content data files in the Charades PWA application.

---

## File Locations

All JSON files must be located in: `docs/data/`

Required files:
- `movies.json`
- `tvshows.json`
- `games.json`
- `songs.json`
- `books.json`

---

## 1. movies.json

### Schema

**Type**: Array of Movie objects

**Movie Object**:
```typescript
{
  title: string,      // Required, non-empty
  year: number,       // Required, 4-digit year
  director?: string   // Optional
}
```

### Example

```json
[
  {
    "title": "The Shawshank Redemption",
    "year": 1994,
    "director": "Frank Darabont"
  },
  {
    "title": "The Godfather",
    "year": 1972,
    "director": "Francis Ford Coppola"
  },
  {
    "title": "The Dark Knight",
    "year": 2008,
    "director": "Christopher Nolan"
  }
]
```

### Validation Rules

- Array must contain at least 1 item (recommended: 20-50 items)
- Each object must have `title` and `year` properties
- `title` must be non-empty string
- `year` must be number (integer, typically 1888-2025)
- `director` is optional but recommended

### Consumer

Loaded by `ContentService.loadMovies()` (src/js/services/content-service.js:38-60)

---

## 2. tvshows.json

### Schema

**Type**: Array of TV Show objects

**TV Show Object**:
```typescript
{
  title: string,      // Required, non-empty
  year?: number,      // Optional, first air year
  creator?: string,   // Optional
  type: "tvshow"      // Required literal
}
```

### Example

```json
[
  {
    "title": "Breaking Bad",
    "year": 2008,
    "creator": "Vince Gilligan",
    "type": "tvshow"
  },
  {
    "title": "Game of Thrones",
    "year": 2011,
    "creator": "David Benioff",
    "type": "tvshow"
  },
  {
    "title": "The Sopranos",
    "year": 1999,
    "creator": "David Chase",
    "type": "tvshow"
  }
]
```

### Validation Rules

- Array must contain at least 1 item (recommended: 20-50 items)
- Each object must have `title` and `type` properties
- `title` must be non-empty string
- `type` must be exactly "tvshow"
- `year` is optional (some shows have unknown start dates)
- `creator` is optional but recommended

### Consumer

Loaded by `ContentService.loadTvshows()` (src/js/services/content-service.js)

---

## 3. games.json

### Schema

**Type**: Array of Game objects

**Game Object**:
```typescript
{
  title: string,       // Required, non-empty
  year?: number,       // Optional, release year
  developer?: string   // Optional
}
```

### Example

```json
[
  {
    "title": "The Legend of Zelda: Ocarina of Time",
    "year": 1998,
    "developer": "Nintendo"
  },
  {
    "title": "The Last of Us",
    "year": 2013,
    "developer": "Naughty Dog"
  },
  {
    "title": "Red Dead Redemption 2",
    "year": 2018,
    "developer": "Rockstar Games"
  }
]
```

### Validation Rules

- Array must contain at least 1 item (recommended: 20-50 items)
- Each object must have `title` property
- `title` must be non-empty string
- `year` is optional (integer, typically 1970-2025)
- `developer` is optional but recommended

### Consumer

Loaded by `ContentService.loadGames()` (src/js/services/content-service.js:89-107)

---

## 4. songs.json

### Schema

**Type**: Array of Song objects

**Song Object**:
```typescript
{
  title: string,     // Required, non-empty
  year?: number,     // Optional, release year
  artist?: string,   // Optional
  type: "song"       // Required literal
}
```

### Example

```json
[
  {
    "title": "Bohemian Rhapsody",
    "year": 1975,
    "artist": "Queen",
    "type": "song"
  },
  {
    "title": "Imagine",
    "year": 1971,
    "artist": "John Lennon",
    "type": "song"
  },
  {
    "title": "Billie Jean",
    "year": 1983,
    "artist": "Michael Jackson",
    "type": "song"
  }
]
```

### Validation Rules

- Array must contain at least 1 item (recommended: 20-50 items)
- Each object must have `title` and `type` properties
- `title` must be non-empty string
- `type` must be exactly "song"
- `year` is optional (integer, typically 1900-2025)
- `artist` is optional but recommended

### Consumer

Loaded by `ContentService.loadSongs()` (src/js/services/content-service.js)

---

## 5. books.json

### Schema

**Type**: Array of Book objects

**Book Object**:
```typescript
{
  title: string,     // Required, non-empty
  year?: number,     // Optional, publication year
  author?: string    // Optional
}
```

### Example

```json
[
  {
    "title": "To Kill a Mockingbird",
    "year": 1960,
    "author": "Harper Lee"
  },
  {
    "title": "1984",
    "year": 1949,
    "author": "George Orwell"
  },
  {
    "title": "The Great Gatsby",
    "year": 1925,
    "author": "F. Scott Fitzgerald"
  }
]
```

### Validation Rules

- Array must contain at least 1 item (recommended: 20-50 items)
- Each object must have `title` property
- `title` must be non-empty string
- `year` is optional (integer, typically 1000-2025)
- `author` is optional but recommended

### Consumer

Loaded by `ContentService.loadBooks()` (src/js/services/content-service.js:63-82)

---

## General Contract Rules

### File Format
- All files must be valid JSON
- UTF-8 encoding
- Minification optional (human-readable preferred for maintenance)

### Content Guidelines
- **Variety**: Include mix of classic and modern items
- **Recognition**: Choose well-known titles for charades gameplay
- **Accuracy**: Verify years and credits are correct
- **Completeness**: Fill optional fields when possible (better UX)

### Error Handling

**Missing File**:
- ContentService fetch will fail
- App shows error: "Failed to load content"
- User cannot play that category

**Invalid JSON**:
- Parse error in ContentService
- Console warning logged
- App shows error: "Failed to load content"

**Invalid Object**:
- Model validation fails (Movie.validate(), etc.)
- Console warning: "Invalid movie data"
- Item skipped, rest of array loads

**Empty Array**:
- Category loads but has no items
- User sees: "No items available in {category} category"

### Testing

Manual verification checklist:
1. Each JSON file exists in `docs/data/`
2. Each file contains valid JSON syntax
3. Each file is an array (not object)
4. Arrays contain 20+ items each
5. Required fields present on all items
6. Optional fields filled on 80%+ of items
7. Years are realistic (not 0, 9999, etc.)
8. Titles are recognizable, appropriate for charades

---

## Version History

**v1.0** (2025-10-02): Initial contract definition for feature 001-this-is-a

---

*Contracts ready for implementation. Next: Create actual JSON files per these schemas.*
