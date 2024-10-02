CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INTEGER,
  genre VARCHAR(100),
  poster_url VARCHAR(255),
  rating DECIMAL(3, 1)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  movie_id INTEGER REFERENCES movies(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 10),
  UNIQUE (user_id, movie_id)
);

-- Insert some sample data
INSERT INTO movies (title, year, genre, poster_url, rating)
VALUES 
  ('Inception', 2010, 'Sci-Fi', 'https://example.com/inception.jpg', 8.8),
  ('The Shawshank Redemption', 1994, 'Drama', 'https://example.com/shawshank.jpg', 9.3);

INSERT INTO users (username, email)
VALUES 
  ('john_doe', 'john@example.com'),
  ('jane_smith', 'jane@example.com');
