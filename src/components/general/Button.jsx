  import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';

export default function Button({
  label,
  className,
  onClick,
  icon
}) {
  return (
    // On applique une classe de base "btn" et la classe personnalisée
    <button
      className={`btn ${className || ''}`}
      onClick={onClick} // On "bind" (lie) le onClick
    >
      
      {/* Rendu conditionnel de l'icône, si elle existe */}
      {icon && <FontAwesomeIcon icon={icon} className="btn-icon" />}
      
      {/* On affiche le texte du bouton */}
      {/* Mettre le label dans un <span> est une bonne pratique 
          pour le styliser indépendamment de l'icône */}
      <span>{label}</span>
      
    </button>
  );
}