# Charades Data Refresh System - Setup Guide

## Overview
This guide explains how to set up and use the automated data refresh system for your charades game. The system can fetch fresh data for all categories (movies, TV shows, video games, songs, and books) from various free APIs.

## Current Implementation
The system currently uses:
- **OMDb API** for movies and TV shows (free tier, 1000 requests/day)
- **RAWG API** for video games (free tier available)
- **Google Books API** for books (no API key required)
- **Sample data** for songs

## Setup Instructions

### 1. Get API Keys

#### OMDb API (Movies/TV Shows)
1. Visit: http://www.omdbapi.com/apikey.aspx
2. Enter your email address
3. Check your email for the API key

#### RAWG API (Video Games)
1. Visit: https://rawg.io/apidocs
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Configure Environment Variables

Add your API keys to the `.env` file in your project root:

```
OMDB_API_KEY=your_omdb_api_key_here
RAWG_API_KEY=your_rawg_api_key_here
```

### 3. Run the Refresh Script

```bash
npm run refresh-data
```

## API Alternatives

If you need to change APIs in the future, here are some alternatives:

### Movies/TV Shows:
- **TMDB**: More comprehensive but has commercial use restrictions
- **IMDb Lists**: Continue using IMDb list IDs (original approach)
- **TVmaze**: Good for TV shows specifically

### Video Games:
- **IGDB**: Alternative to RAWG (requires Twitch account)

### Books:
- **Open Library**: Alternative to Google Books
- **Goodreads API**: Being deprecated but still functional

### Songs:
- **MusicBrainz**: Free but complex
- **Last.fm**: Good for music metadata
- **Spotify**: Requires OAuth (more complex setup)

## File Structure

```
src/
  data/
    refresh-data.js    # Main refresh script
    charades.json      # Output data file
  docs/
    charades-data-refresh-guide.md  # This guide
.env                   # API keys (not committed to git)
```

## Troubleshooting

### "API Key Not Found" Messages
Ensure your `.env` file is properly formatted and located in the project root.

### "Rate Limit Exceeded"
- OMDb free tier is 1000 requests/day
- RAWG free tier is 20k requests/month
- Wait 24 hours or upgrade to paid tiers if needed

### "Error Fetching Data"
1. Check your internet connection
2. Verify API keys are correct
3. Check that APIs are not down
4. Look at error messages for specific details

## Customization

To modify what data is fetched:
1. Edit the query parameters in each fetch function
2. Adjust the number of items fetched (page_size parameter)
3. Modify the sample data functions for fallback content

## Sample Data

When API keys are not provided or APIs fail, the system falls back to sample data. This ensures your charades game always has content, even without internet access.

## Security Notes

- Never commit your `.env` file to version control
- The `.gitignore` file already excludes `.env` files
- API keys should be treated as sensitive information
```