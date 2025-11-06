import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Tes importations CSS sont correctes
import './dashboard/dashboard.css';
import '../components/movies/movies.css';

import MovieCard from '../components/movies/MovieCard';
import Filter from '../components/movies/Filter';
import Button from '../components/general/Button';

const API_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error("No access token found");
    return { headers: {} };
  }
  return { headers: { 'Authorization': `Bearer ${accessToken}` } };
};

// ** LA CORRECTION EST ICI **
// Fonction pour "mapper" les données de l'API au format attendu par MovieCard
const mapApiDataToMovieCard = (apiMovie) => {
  return {
    ...apiMovie, // Garde toutes les autres propriétés (title, synopsis, imdbId...)
    // Crée la prop "poster" à partir de la première URL du tableau "imageurls"
    poster: apiMovie.imageurls && apiMovie.imageurls.length > 0 
      ? apiMovie.imageurls[0] 
      : null // S'il n'y a pas d'image, on envoie null
  };
};

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("latest");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);

  const loadMovies = async () => {
    const params = new URLSearchParams({
      page: 1,
      minYear,
      maxYear,
      sort,
      title,
      genres: genres.join(','),
    });

    try {
      const response = await axios.get(
        `${API_URL}/titles/advancedsearch?${params.toString()}`,
        getAuthHeaders()
      );
      
      const apiMovies = Array.isArray(response.data.titles) ? response.data.titles : [];
      // ** CORRECTION: On transforme les données AVANT de les stocker **
      setMovies(apiMovies.map(mapApiDataToMovieCard));
    
    } catch (error) {
      console.error("Failed to load movies", error);
      setMovies([]);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    const params = new URLSearchParams({
      page: nextPage,
      minYear,
      maxYear,
      sort,
      title,
      genres: genres.join(','),
    });

    try {
      const response = await axios.get(
        `${API_URL}/titles/advancedsearch?${params.toString()}`,
        getAuthHeaders()
      );
      
      const oldMovies = Array.isArray(movies) ? movies : [];
      const newApiMovies = Array.isArray(response.data.titles) ? response.data.titles : [];
      
      // ** CORRECTION: On transforme les NOUVELLES données avant de les ajouter **
      setMovies([...oldMovies, ...newApiMovies.map(mapApiDataToMovieCard)]);
      
      setPage(nextPage);
    } catch (error) {
      console.error("Failed to load more movies", error);
    }
  };

  useEffect(() => {
    setPage(1); // Réinitialise la page
    loadMovies(); // Charge les films (qui seront transformés)
  }, [minYear, maxYear, genres, sort, title]);

  
  return (
    <div className="homepage-container">
      <Filter
        minYear={minYear} setMinYear={setMinYear}
        maxYear={maxYear} setMaxYear={setMaxYear}
        sort={sort} setSort={setSort}
        genres={genres} setGenres={setGenres}
        title={title} setTitle={setTitle}
      />

      {/* Le 'movie' objet a maintenant la propriété 'poster' attendue */}
      <ul className="movie-card-list">
        {Array.isArray(movies) && movies.map((movie) => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
      
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Button 
          label="Load More.."
          onClick={handleLoadMore}
          className="load-more-btn"
        />
      </div>
    </div>
  );
}