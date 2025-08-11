require('dotenv').config();

const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, 'charades.json');

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
  console.log("Fetching movies from TMDB...");
  const tmdbApiKey = process.env.TMDB_API_KEY;
  
  if (!tmdbApiKey) {
    console.log("TMDB_API_KEY not found in environment variables, using sample data");
    return getSampleMovies();
  }
  
  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`;
    const data = await fetchData(url);
    return data.results.map((movie, index) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : null
    }));
  } catch (error) {
    console.error('Error fetching movies from TMDB:', error);
    return getSampleMovies();
  }
}

// Fetch TV shows from TMDB
async function fetchTVShows() {
  console.log("Fetching TV shows from TMDB...");
  const tmdbApiKey = process.env.TMDB_API_KEY;
  
  if (!tmdbApiKey) {
    console.log("TMDB_API_KEY not found in environment variables, using sample data");
    return getSampleTVShows();
  }
  
  try {
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=1`;
    const data = await fetchData(url);
    return data.results.map((show, index) => ({
      id: show.id,
      title: show.name,
      year: show.first_air_date ? new Date(show.first_air_date).getFullYear() : null
    }));
  } catch (error) {
    console.error('Error fetching TV shows from TMDB:', error);
    return getSampleTVShows();
  }
}

// Fetch video games from RAWG
async function fetchVideoGames() {
  console.log("Fetching video games from RAWG...");
  const rawgApiKey = process.env.RAWG_API_KEY;
  
  if (!rawgApiKey) {
    console.log("RAWG_API_KEY not found in environment variables, using sample data");
    return getSampleVideoGames();
  }
  
  try {
    const url = `https://api.rawg.io/api/games?key=${rawgApiKey}&ordering=-added&page_size=20`;
    const data = await fetchData(url);
    return data.results.map((game, index) => ({
      id: game.id,
      title: game.name,
      year: game.released ? new Date(game.released).getFullYear() : null
    }));
  } catch (error) {
    console.error('Error fetching video games from RAWG:', error);
    return getSampleVideoGames();
  }
}

// Fetch songs - using a different approach since Spotify requires OAuth
async function fetchSongs() {
  console.log("Fetching songs...");
  // Since Spotify requires OAuth which is complex for a script,
  // we'll use sample data but you can replace with your preferred method
  return getSampleSongs();
}

// Fetch books from Google Books
async function fetchBooks() {
  console.log("Fetching books from Google Books...");
  
  try {
    // Using a search for popular books
    const url = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&maxResults=20';
    const data = await fetchData(url);
    return data.items.map((book, index) => {
      const volumeInfo = book.volumeInfo;
      return {
        id: book.id,
        title: volumeInfo.title,
        year: volumeInfo.publishedDate ? new Date(volumeInfo.publishedDate).getFullYear() : null
      };
    }).filter(book => book.year !== null); // Filter out books without years
  } catch (error) {
    console.error('Error fetching books from Google Books:', error);
    return getSampleBooks();
  }
}

// Sample data functions
function getSampleMovies() {
  return [
    { id: 1, title: "The Shawshank Redemption", year: 1994 },
    { id: 2, title: "The Godfather", year: 1972 },
    { id: 3, title: "The Dark Knight", year: 2008 },
    { id: 4, title: "Pulp Fiction", year: 1994 },
    { id: 5, title: "Forrest Gump", year: 1994 },
    { id: 6, title: "Inception", year: 2010 },
    { id: 7, title: "The Matrix", year: 1999 },
    { id: 8, title: "Goodfellas", year: 1990 },
    { id: 9, title: "Parasite", year: 2019 },
    { id: 10, title: "Interstellar", year: 2014 }
  ];
}

function getSampleTVShows() {
  return [
    { id: 1, title: "Breaking Bad", year: 2008 },
    { id: 2, title: "Game of Thrones", year: 2011 },
    { id: 3, title: "Stranger Things", year: 2016 },
    { id: 4, title: "The Office", year: 2005 },
    { id: 5, title: "Friends", year: 1994 },
    { id: 6, title: "The Crown", year: 2016 },
    { id: 7, title: "The Mandalorian", year: 2019 },
    { id: 8, title: "Succession", year: 2018 }
  ];
}

function getSampleVideoGames() {
  return [
    { id: 1, title: "The Last of Us", year: 2013 },
    { id: 2, title: "Red Dead Redemption 2", year: 2018 },
    { id: 3, title: "The Witcher 3", year: 2015 },
    { id: 4, title: "God of War", year: 2018 },
    { id: 5, title: "Cyberpunk 2077", year: 2020 },
    { id: 6, title: "Hades", year: 2020 },
    { id: 7, title: "Animal Crossing", year: 2020 },
    { id: 8, title: "Among Us", year: 2018 }
  ];
}

function getSampleSongs() {
  return [
    { id: 1, title: "Bohemian Rhapsody", year: 1975 },
    { id: 2, title: "Imagine", year: 1971 },
    { id: 3, title: "Hotel California", year: 1976 },
    { id: 4, title: "Sweet Child O' Mine", year: 1987 },
    { id: 5, title: "Billie Jean", year: 1983 },
    { id: 6, title: "Like a Rolling Stone", year: 1965 },
    { id: 7, title: "Hey Jude", year: 1968 },
    { id: 8, title: "Smells Like Teen Spirit", year: 1991 }
  ];
}

function getSampleBooks() {
  return [
    { id: 1, title: "To Kill a Mockingbird", year: 1960 },
    { id: 2, title: "1984", year: 1949 },
    { id: 3, title: "Harry Potter and the Sorcerer's Stone", year: 1997 },
    { id: 4, title: "The Great Gatsby", year: 1925 },
    { id: 5, title: "Pride and Prejudice", year: 1813 },
    { id: 6, title: "The Catcher in the Rye", year: 1951 },
    { id: 7, title: "Lord of the Rings", year: 1954 },
    { id: 8, title: "The Hunger Games", year: 2008 }
  ];
}

// Main refresh function
const refreshData = async () => {
  try {
    console.log('Refreshing charades data from multiple APIs...');
    
    const films = await fetchMovies();
    const shows = await fetchTVShows();
    const games = await fetchVideoGames();
    const songs = await fetchSongs();
    const books = await fetchBooks();

    const charadesData = {
      films: films.map(item => ({ ...item, beenUsed: false })),
      shows: shows.map(item => ({ ...item, beenUsed: false })),
      games: games.map(item => ({ ...item, beenUsed: false })),
      songs: songs.map(item => ({ ...item, beenUsed: false })),
      books: books.map(item => ({ ...item, beenUsed: false })),
    };

    fs.writeFileSync(dataPath, JSON.stringify(charadesData, null, 2));
    console.log('Successfully refreshed charades data.');
    console.log(`Movies: ${films.length}`);
    console.log(`TV Shows: ${shows.length}`);
    console.log(`Video Games: ${games.length}`);
    console.log(`Songs: ${songs.length}`);
    console.log(`Books: ${books.length}`);
  } catch (error) {
    console.error('Error refreshing charades data:', error);
  }
};

refreshData();
