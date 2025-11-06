import React, { useState } from 'react';
import './movies.css';

export default function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (!filter) return;

    const newSelected = !selected;
    setSelected(newSelected);

    if (newSelected) {
      setGenres([...genres, genre]);
    } else {
      setGenres(genres.filter((g) => g !== genre));
    }
  };

  return (
    <li
      className={`tag-item ${selected ? 'selected' : ''}`}
      onClick={handleTag}
    >
      {genre}
    </li>
  );
}

