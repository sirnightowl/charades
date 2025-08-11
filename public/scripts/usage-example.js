// Example of how to modify your script.js to use dynamic data

// Instead of hardcoded arrays like:
// var films = [
//   {id: 1, title: "The Shawshank Redemption", year: 1994, beenUsed: false},
//   ...
// ];

// Load data dynamically from JSON files:
let films = [];
let tvshows = [];
let games = [];
let songs = [];
let books = [];

// Function to load all data
async function loadData() {
  try {
    const filmsResponse = await fetch('/src/data/movies.json');
    films = await filmsResponse.json();
    
    const showsResponse = await fetch('/src/data/tvshows.json');
    tvshows = await showsResponse.json();
    
    const gamesResponse = await fetch('/src/data/games.json');
    games = await gamesResponse.json();
    
    const songsResponse = await fetch('/src/data/songs.json');
    songs = await songsResponse.json();
    
    const booksResponse = await fetch('/src/data/books.json');
    books = await booksResponse.json();
    
    console.log('Data loaded successfully!');
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Call loadData when the page loads
$(document).ready(function() {
  loadData().then(() => {
    // Initialize your game with the loaded data
    // Your existing game initialization code here
  });
});

// Add a function to refresh data manually
document.getElementById('refreshButton').addEventListener('click', function() {
  loadData().then(() => {
    // Reset game state with new data
    // Your game reset code here
  });
});