const fs = require('fs');
const https = require('https');

// Function to fetch data from an API
function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Fetch movies from TMDB (The Movie Database)
async function fetchMovies() {
  console.log("Fetching movies...");
  // Note: You would need to register for a free API key at https://www.themoviedb.org/settings/api
  // Then replace 'YOUR_API_KEY' with your actual API key
  const API_KEY = 'YOUR_API_KEY'; // Replace with your TMDB API key
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2020`;
  
  try {
    // Uncomment the lines below to use real API data:
    /*
    const data = await fetchData(url);
    const movies = data.results.map((movie, index) => ({
      id: index + 1,
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      beenUsed: false
    }));
    return movies;
    */
    
    // Sample data for demonstration
    const sampleMovies = [
      {id: 1, title: "The Shawshank Redemption", year: 1994, beenUsed: false},
      {id: 2, title: "The Godfather", year: 1972, beenUsed: false},
      {id: 3, title: "The Dark Knight", year: 2008, beenUsed: false},
      {id: 4, title: "Pulp Fiction", year: 1994, beenUsed: false},
      {id: 5, title: "Forrest Gump", year: 1994, beenUsed: false},
      {id: 6, title: "Inception", year: 2010, beenUsed: false},
      {id: 7, title: "The Matrix", year: 1999, beenUsed: false},
      {id: 8, title: "Goodfellas", year: 1990, beenUsed: false},
      {id: 9, title: "Parasite", year: 2019, beenUsed: false},
      {id: 10, title: "Interstellar", year: 2014, beenUsed: false}
    ];
    return sampleMovies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Fetch TV shows from TMDB
async function fetchTVShows() {
  console.log("Fetching TV shows...");
  const API_KEY = 'YOUR_API_KEY'; // Replace with your TMDB API key
  const url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
  
  try {
    // Uncomment the lines below to use real API data:
    /*
    const data = await fetchData(url);
    const shows = data.results.map((show, index) => ({
      id: index + 1,
      title: show.name,
      year: new Date(show.first_air_date).getFullYear(),
      beenUsed: false
    }));
    return shows;
    */
    
    // Sample data for demonstration
    const sampleTVShows = [
      {id: 1, title: "Breaking Bad", year: 2008, beenUsed: false},
      {id: 2, title: "Game of Thrones", year: 2011, beenUsed: false},
      {id: 3, title: "Stranger Things", year: 2016, beenUsed: false},
      {id: 4, title: "The Office", year: 2005, beenUsed: false},
      {id: 5, title: "Friends", year: 1994, beenUsed: false},
      {id: 6, title: "The Crown", year: 2016, beenUsed: false},
      {id: 7, title: "The Mandalorian", year: 2019, beenUsed: false},
      {id: 8, title: "Succession", year: 2018, beenUsed: false}
    ];
    return sampleTVShows;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    return [];
  }
}

// Fetch video games
async function fetchVideoGames() {
  console.log("Fetching video games...");
  // For video games, you could use:
  // - RAWG API (requires registration): https://rawg.io/apidocs
  // - IGDB API (requires registration): https://api.igdb.com/
  
  try {
    // Sample data for demonstration
    const sampleGames = [
      {id: 1, title: "The Last of Us", year: 2013, beenUsed: false},
      {id: 2, title: "Red Dead Redemption 2", year: 2018, beenUsed: false},
      {id: 3, title: "The Witcher 3", year: 2015, beenUsed: false},
      {id: 4, title: "God of War", year: 2018, beenUsed: false},
      {id: 5, title: "Cyberpunk 2077", year: 2020, beenUsed: false},
      {id: 6, title: "Hades", year: 2020, beenUsed: false},
      {id: 7, title: "Animal Crossing", year: 2020, beenUsed: false},
      {id: 8, title: "Among Us", year: 2018, beenUsed: false}
    ];
    return sampleGames;
  } catch (error) {
    console.error('Error fetching video games:', error);
    return [];
  }
}

// Fetch songs
async function fetchSongs() {
  console.log("Fetching songs...");
  // For music data, you could use:
  // - Spotify API (requires registration): https://developer.spotify.com/documentation/web-api/
  // - MusicBrainz API (free but requires attribution): https://musicbrainz.org/doc/Development/API
  
  try {
    // Sample data for demonstration
    const sampleSongs = [
      {id: 1, title: "Bohemian Rhapsody", year: 1975, beenUsed: false},
      {id: 2, title: "Imagine", year: 1971, beenUsed: false},
      {id: 3, title: "Hotel California", year: 1976, beenUsed: false},
      {id: 4, title: "Sweet Child O' Mine", year: 1987, beenUsed: false},
      {id: 5, title: "Billie Jean", year: 1983, beenUsed: false},
      {id: 6, title: "Like a Rolling Stone", year: 1965, beenUsed: false},
      {id: 7, title: "Hey Jude", year: 1968, beenUsed: false},
      {id: 8, title: "Smells Like Teen Spirit", year: 1991, beenUsed: false}
    ];
    return sampleSongs;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
}

// Fetch books
async function fetchBooks() {
  console.log("Fetching books...");
  // For books data, you could use:
  // - Google Books API: https://developers.google.com/books/docs/overview
  // - Open Library API: https://openlibrary.org/developers/api
  
  try {
    // Sample data for demonstration
    const sampleBooks = [
      {id: 1, title: "To Kill a Mockingbird", year: 1960, beenUsed: false},
      {id: 2, title: "1984", year: 1949, beenUsed: false},
      {id: 3, title: "Harry Potter and the Sorcerer's Stone", year: 1997, beenUsed: false},
      {id: 4, title: "The Great Gatsby", year: 1925, beenUsed: false},
      {id: 5, title: "Pride and Prejudice", year: 1813, beenUsed: false},
      {id: 6, title: "The Catcher in the Rye", year: 1951, beenUsed: false},
      {id: 7, title: "Lord of the Rings", year: 1954, beenUsed: false},
      {id: 8, title: "The Hunger Games", year: 2008, beenUsed: false}
    ];
    return sampleBooks;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}

// Save data to a JSON file
function saveDataToFile(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Data saved to ${filename}`);
}

// Main function to refresh all data
async function refreshAllData() {
  console.log('Refreshing charades data...');
  
  try {
    const movies = await fetchMovies();
    saveDataToFile(movies, 'src/data/movies.json');
    
    const tvShows = await fetchTVShows();
    saveDataToFile(tvShows, 'src/data/tvshows.json');
    
    const videoGames = await fetchVideoGames();
    saveDataToFile(videoGames, 'src/data/games.json');
    
    const songs = await fetchSongs();
    saveDataToFile(songs, 'src/data/songs.json');
    
    const books = await fetchBooks();
    saveDataToFile(books, 'src/data/books.json');
    
    console.log('\nData refresh complete!');
    console.log('\nTo use real-time data from APIs:');
    console.log('1. Register for free API keys from:');
    console.log('   - TMDB (Movies/TV): https://www.themoviedb.org/settings/api');
    console.log('   - RAWG (Games): https://rawg.io/apidocs');
    console.log('   - Spotify/MusicBrainz (Songs): https://developer.spotify.com/documentation/web-api/');
    console.log('   - Google Books/Open Library (Books)');
    console.log('2. Replace "YOUR_API_KEY" in the script with your actual keys');
    console.log('3. Uncomment the API call sections in each fetch function');
    console.log('4. Run this script regularly to keep your lists fresh');
  } catch (error) {
    console.error('Error refreshing data:', error);
  }
}

// Run the refresh function
refreshAllData();