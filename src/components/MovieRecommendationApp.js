import React, { useState, useEffect } from 'react';

const MovieCard = ({ movie, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite(movie.id, !isFavorite);
  };

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '16px',
      maxWidth: '300px'
    }}>
      <img src={movie.poster || `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(movie.title)}`} alt={movie.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      <h3 style={{ fontSize: '1.2rem', marginTop: '8px' }}>{movie.title}</h3>
      <p>{movie.year} | {movie.genre}</p>
      <p>Rating: {movie.rating.toFixed(1)} ⭐</p>
      <button onClick={handleToggleFavorite} style={{
        background: isFavorite ? '#ff6b6b' : '#4ecdc4',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

const MovieRecommendationApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/movies');
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error('Failed to fetch movies');
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleToggleFavorite = async (movieId, isFavorite) => {
    try {
      // Assuming you have a way to get the user ID. For now, we'll use a dummy value.
      const userId = 1;
      const response = await fetch('http://localhost:3001/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId, movie_id: movieId, is_favorite: isFavorite }),
      });
      if (response.ok) {
        console.log('Favorite status updated successfully');
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Movie Recommendations</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredMovies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onToggleFavorite={handleToggleFavorite} />
        ))}
      </div>
    </div>
  );
};

export default MovieRecommendationApp;