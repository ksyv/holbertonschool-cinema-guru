import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard/dashboard.css';
import '../components/movies/movies.css';

import MovieCard from '../components/movies/MovieCard';

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return { headers: { 'Authorization': `Bearer ${accessToken}` } };
};

export default function FavoritesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/titles/favorite`,
          getAuthHeaders()
        );
        setMovies(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
        setMovies([]);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favorites-page-container">
      <h1 className="page-title">Movies you like</h1>
      <ul className="movie-card-list">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbId} movie={movie} />
          ))
        ) : (
          <p style={{color: 'white', textAlign: 'center'}}>
            You haven't added any movies to your favorites yet.
          </p>
        )}
      </ul>
    </div>
  );
}