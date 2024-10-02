// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001; // Make sure this doesn't conflict with your React app's port

app.use(cors());
app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'movie_recommendation',
  password: 'your_password',
  port: 5432,
});

// API endpoint to get movies
app.get('/api/movies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching movies' });
  }
});

// API endpoint to add a rating
app.post('/api/ratings', async (req, res) => {
  const { user_id, movie_id, rating } = req.body;
  try {
    await pool.query(
      'INSERT INTO ratings (user_id, movie_id, rating) VALUES ($1, $2, $3)',
      [user_id, movie_id, rating]
    );
    res.status(201).json({ message: 'Rating added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while adding the rating' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});