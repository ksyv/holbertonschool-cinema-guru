import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// On importe une icône spécifique depuis la bibliothèque d'icônes
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './general.css';

// Note : les props sont "title" et "setTitle"
// (et non "value" et "setValue")
export default function SearchBar({ title, setTitle }) {
  
  // Exactement la même logique que pour le composant Input
  const handleInput = (event) => {
    setTitle(event.target.value);
  };

  return (
    // On utilise un wrapper spécifique pour la barre de recherche
    <div className="search-bar-wrapper">
      
      {/* On ajoute une icône de loupe pour le style */}
      <FontAwesomeIcon icon={faSearch} className="search-icon" />
      
      <input
        type="text"
        className="search-input" // Classe spécifique pour le style
        placeholder="Search for a movie..."
        value={title}
        onChange={handleInput}
      />
    </div>
  );
}