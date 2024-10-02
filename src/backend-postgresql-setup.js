// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'movie_recommendation',
  password: 'your_password',
  port: 5432,
});

app.get('/api/movies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching movies' });
  }
});

app.post('/api/favorites', async (req, res) => {
  const { user_id, movie_id, is_favorite } = req.body;
  try {
    if (is_favorite) {
      await pool.query(
        'INSERT INTO favorites (user_id, movie_id) VALUES ($1, $2) ON CONFLICT (user_id, movie_id) DO NOTHING',
        [user_id, movie_id]
      );
    } else {
      await pool.query(
        'DELETE FROM favorites WHERE user_id = $1 AND movie_id = $2',
        [user_id, movie_id]
      );
    }
    res.status(200).json({ message: 'Favorite status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating favorite status' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
