# Charades Data Management

This directory contains scripts and data files for managing your charades game content.

## Automatic Data Refresh

To automatically refresh your charades lists with new movies, TV shows, games, songs, and books:

1. Run the refresh script:
   ```
   npm run refresh-data
   ```

2. This will update the JSON files in this directory with the latest data.

## Implementation Guide

### Setting up API Keys

To fetch real-time data from official sources:

1. Register for free API keys:
   - TMDB (Movies/TV): https://www.themoviedb.org/settings/api
   - RAWG (Games): https://rawg.io/apidocs
   - iTunes (Music): No API key required

2. Add your API keys to environment variables or directly in the refresh script.

### Using the Data in Your Game

Update your script.js to load data from JSON files instead of hardcoded arrays:

```javascript
// Instead of hardcoded arrays, load from JSON:
fetch('/src/data/movies.json')
  .then(response => response.json())
  .then(movies => {
    // Use the movies data in your game
  });
```

## Data Structure

Each JSON file contains an array of items with this structure:
```json
[
  {
    "id": 1,
    "title": "Item Name",
    "year": 2023,
    "beenUsed": false
  }
]
```

## Manual Updates

If you prefer to manually curate your lists, you can:
1. Edit the JSON files directly
2. Run the game in offline mode using your curated lists

## Future Enhancements

Consider implementing:
- Scheduled automatic updates (cron jobs)
- User voting system for favorites
- Category suggestions from players
- Data validation to ensure quality entries
```