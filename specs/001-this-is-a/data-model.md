# Data Model for Content Catalog App

## Entities

### Movie
Represents a film in the content catalog
- **id**: string (unique identifier)
- **title**: string (movie title)
- **director**: string (director name)
- **year**: number (release year)
- **genre**: array of strings (movie genres)
- **rating**: number (0-10 rating)
- **description**: string (movie description)
- **cast**: array of strings (main actors)
- **duration**: number (in minutes)
- **poster**: string (URL to poster image)
- **trailer**: string (URL to trailer video)
- **language**: string (primary language)
- **country**: string (country of origin)
- **released**: boolean (whether movie is released)
- **imdbId**: string (IMDB identifier, optional)

### Book
Represents a literary work in the content catalog
- **id**: string (unique identifier)
- **title**: string (book title)
- **author**: string (author name)
- **year**: number (publication year)
- **genre**: array of strings (book genres)
- **rating**: number (0-10 rating)
- **description**: string (book description)
- **pages**: number (number of pages)
- **isbn**: string (ISBN identifier)
- **language**: string (primary language)
- **publisher**: string (publisher name)
- **cover**: string (URL to cover image)
- **format**: string (e.g., "hardcover", "paperback", "ebook")
- **released**: boolean (whether book is released)

### Game
Represents an interactive game in the content catalog
- **id**: string (unique identifier)
- **title**: string (game title)
- **developer**: string (developer studio)
- **year**: number (release year)
- **genre**: array of strings (game genres)
- **rating**: number (0-10 rating)
- **description**: string (game description)
- **platform**: array of strings (supported platforms)
- **cover**: string (URL to cover image)
- **trailer**: string (URL to gameplay video)
- **publisher**: string (publisher name)
- **language**: string (primary language)
- **released**: boolean (whether game is released)
- **esrbRating**: string (age rating, e.g., "E", "T", "M")

## Common Attributes
All content types share these common attributes:
- **id**: string (unique identifier across all content types)
- **title**: string (content title)
- **year**: number (release year)
- **genre**: array of strings (content genres)
- **rating**: number (0-10 rating)
- **description**: string (content description)
- **released**: boolean (whether content is released)
- **cover**: string (URL to cover image)

## Relationships
- No explicit database relationships are required as the data is stored in separate JSON files
- Content may be related by common genres, years, or other attributes that can be programmatically identified

## Validation Rules
- **id**: Must be unique across all content types, non-empty string
- **title**: Required, non-empty string
- **year**: Must be a 4-digit number within reasonable range (1800-current year)
- **genre**: Required, non-empty array with at least one genre string
- **rating**: Number between 0 and 10
- **description**: Required, non-empty string
- **cover**: URL string or empty string if no image available
- **released**: Boolean value

## State Transitions
- **released**: Can transition from false (upcoming) to true (released) when content becomes available

## File Structure
Data will be stored in separate JSON files:
- `movies.json`: Array of Movie objects
- `books.json`: Array of Book objects
- `games.json`: Array of Game objects