const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Enable CORS for the frontend running on localhost:3001
app.use(cors({
  origin: 'http://localhost:3001'
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your-sql-username',
  password: 'your-sql-password',
  database: 'music_db'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Routes for artists
app.get('/artists', (req, res) => {
  db.query('SELECT * FROM artists', (err, results) => {
    if (err) {
      console.error('Error fetching artists:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.post('/artists', (req, res) => {
  const artist = req.body;
  const query = 'INSERT INTO artists (name, genre, country) VALUES (?, ?, ?)';
  db.query(query, [artist.name, artist.genre, artist.country], (err, result) => {
    if (err) {
      console.error('Error adding artist:', err);
      res.status(500).send('Server error');
      return;
    }
    artist.id = result.insertId;
    res.status(201).json(artist);
  });
});

// Routes for albums
app.get('/albums', (req, res) => {
  db.query('SELECT * FROM albums', (err, results) => {
    if (err) {
      console.error('Error fetching albums:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.get('/artists/:artistId/albums', (req, res) => {
  const artistId = parseInt(req.params.artistId);
  db.query('SELECT * FROM albums WHERE artist_id = ?', [artistId], (err, results) => {
    if (err) {
      console.error('Error fetching albums for artist:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

app.post('/artists/:artistId/albums', (req, res) => {
  const artistId = parseInt(req.params.artistId);
  const album = req.body;
  const query = 'INSERT INTO albums (artist_id, title, release_year) VALUES (?, ?, ?)';
  db.query(query, [artistId, album.title, album.releaseYear], (err, result) => {
    if (err) {
      console.error('Error adding album:', err);
      res.status(500).send('Server error');
      return;
    }
    album.id = result.insertId;
    res.status(201).json(album);
  });
});

// Search artists by name
app.get('/search/artists', (req, res) => {
  const searchTerm = req.query.name;
  const query = 'SELECT * FROM artists WHERE name LIKE ?';
  db.query(query, [`%${searchTerm}%`], (err, results) => {
    if (err) {
      console.error('Error searching artists:', err);
      res.status(500).send('Server error');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
``