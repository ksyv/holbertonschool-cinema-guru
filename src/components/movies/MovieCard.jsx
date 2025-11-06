import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';

const API_URL = 'http://localhost:8000/api';

export default function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  const { title, synopsis, genres, poster, imdbId } = movie;

  useEffect(() => {
    const checkStatus = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) return;

      const config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      };

      try {
        const [favRes, watchRes] = await Promise.all([
          axios.get(`${API_URL}/titles/favorite`, config),
          axios.get(`${API_URL}/titles/watchlater`, config)
        ]);

        const favIds = new Set(favRes.data.map(m => m.imdbId));
        const watchIds = new Set(watchRes.data.map(m => m.imdbId));

        setIsFavorite(favIds.has(imdbId));
        setIsWatchLater(watchIds.has(imdbId));

      } catch (error) {
        console.error('Failed to fetch user lists', error);
      }
    };

    checkStatus();
  }, [imdbId]);

  const handleClick = async (type) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    };

    const isAdded = type === 'favorite' ? isFavorite : isWatchLater;
    const setState = type === 'favorite' ? setIsFavorite : setIsWatchLater;
    const url = `${API_URL}/titles/${type}/${imdbId}`;

    try {
      if (isAdded) {
        await axios.delete(url, config);
        setState(false);
      } else {
        await axios.post(url, {}, config);
        setState(true);
      }
    } catch (error) {
      console.error(`Failed to update ${type} list`, error);
    }
  };
  
  const posterImg = poster && poster !== "N/A" 
    ? poster 
    : `https://placehold.co/300x300/222222/FFFFFF?text=${title}`;

  return (
    <li className="movie-card">
      <div className="movie-card-poster-wrapper">
        <img 
          src={posterImg} 
          alt={title} 
          className="movie-card-poster" 
          onError={(e) => { e.target.onerror = null; e.target.src=`https://placehold.co/300x300/222222/FFFFFF?text=${title}`}}
        />
        <div className="movie-card-overlay"></div>
        <div className="movie-card-actions">
          <button 
            className={`movie-card-icon-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => handleClick('favorite')}
            aria-label="Toggle Favorite"
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
          <button 
            className={`movie-card-icon-btn ${isWatchLater ? 'active' : ''}`}
            onClick={() => handleClick('watchlater')}
            aria-label="Toggle Watch Later"
          >
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        </div>
      </div>
      
      <div className="movie-card-content">
        <h3 className="movie-card-title">{title}</h3>
        <p className="movie-card-synopsis">{synopsis}</p>
      </div>

      <ul className="movie-card-genres">
        {genres && genres.length > 0 ? (
          genres.map((genre) => <Tag key={genre} genre={genre} filter={false} />)
        ) : (
          <Tag genre="N/A" filter={false} />
        )}
      </ul>
    </li>
  );
}
