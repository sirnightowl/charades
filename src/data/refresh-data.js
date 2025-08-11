
const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, 'charades.json');

const imdbApiKey = process.env.IMDB_API_KEY;

const fetchImdbData = (listId) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'imdb-api.com',
      path: `/en/API/IMDbList/${imdbApiKey}/${listId}`,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
};

const refreshData = async () => {
  try {
    const films = await fetchImdbData('ls055592025');
    const shows = await fetchImdbData('ls009668733');
    const games = await fetchImdbData('ls021932963');

    const charadesData = {
      films: films.items.map(item => ({ id: item.id, title: item.title, year: item.year })),
      shows: shows.items.map(item => ({ id: item.id, title: item.title, year: item.year })),
      games: games.items.map(item => ({ id: item.id, title: item.title, year: item.year })),
      songs: [], // Add your song data here
      books: [], // Add your book data here
    };

    fs.writeFileSync(dataPath, JSON.stringify(charadesData, null, 2));
    console.log('Successfully refreshed charades data.');
  } catch (error) {
    console.error('Error refreshing charades data:', error);
  }
};

refreshData();
